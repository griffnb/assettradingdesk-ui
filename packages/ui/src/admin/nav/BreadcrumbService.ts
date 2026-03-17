import { titleCase } from "@/common_lib/utils/strings";
import { Store } from "@/models/store/Store";
import type { StoreModel } from "@/models/store/StoreModel";
import type { StoreKeys } from "@/models/types/store_keys";
import { makeAutoObservable, runInAction } from "mobx";

export interface BreadcrumbSegment {
  label: string;
  href?: string;
}

type HasParent = {
  getParent: () => { model: StoreKeys; id: string } | null;
  getBreadCrumb(parent?: unknown): { title: string; url: string } | undefined;
};

function isHasParent(value: unknown): value is HasParent {
  return (
    !!value &&
    typeof value === "object" &&
    typeof (value as HasParent).getParent === "function" &&
    typeof (value as HasParent).getBreadCrumb === "function"
  );
}

class BreadcrumbServiceClass {
  private static instance: BreadcrumbServiceClass;

  segments: BreadcrumbSegment[] = [{ label: "Home", href: "/" }];
  hash: string | null = null;

  private constructor() {
    makeAutoObservable(this, {});
    this.startHashListener();
  }

  /** Replace all segments at once */
  setSegments(segments: BreadcrumbSegment[]) {
    this.segments = segments;
  }

  /** Append a segment to the end */
  push(segment: BreadcrumbSegment) {
    this.segments = [...this.segments, segment];
  }

  /** Reset back to just Home */
  reset() {
    this.segments = [{ label: "Home", href: "/" }];
    this.hash = null;
  }

  /**
   * Build breadcrumbs by walking a model's parent chain.
   * Mirrors the recursive logic from the old BreadCrumb component.
   */
  async buildFromRecord(record: StoreModel, title?: string) {
    const crumbs: BreadcrumbSegment[] = [{ label: "Home", href: "/" }];

    if (isHasParent(record)) {
      const parentCrumbs = await this.walkParents(record);
      crumbs.push(...parentCrumbs);
    }

    if (title) {
      crumbs.push({ label: title });
    }

    runInAction(() => {
      this.segments = crumbs;
    });
  }

  private async walkParents(model: HasParent): Promise<BreadcrumbSegment[]> {
    const collected: BreadcrumbSegment[] = [];
    let current: HasParent | null = model;

    while (current) {
      const parentInfo = current.getParent();
      let parent: StoreModel | null = null;

      if (parentInfo) {
        const store = Store[parentInfo.model];
        const resp = await store.get(parentInfo.id) as { success: boolean; data: StoreModel | null };
        if (resp.success && resp.data) {
          parent = resp.data;
        }
      }

      const crumb = current.getBreadCrumb(parent);
      if (crumb?.title) {
        collected.push({ label: crumb.title, href: crumb.url });
      }

      current = parent && isHasParent(parent) ? parent : null;
    }

    // Parents are walked deepest-first, so reverse for top-down order
    return collected.reverse();
  }

  private startHashListener() {
    if (typeof window === "undefined") return;

    const handleHash = () => {
      const fragment = window.location.hash.slice(1);
      runInAction(() => {
        this.hash = fragment ? titleCase(fragment) : null;
      });
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
  }

  public static getInstance(): BreadcrumbServiceClass {
    if (!BreadcrumbServiceClass.instance) {
      BreadcrumbServiceClass.instance = new BreadcrumbServiceClass();
    }
    return BreadcrumbServiceClass.instance;
  }
}

export const BreadcrumbService = BreadcrumbServiceClass.getInstance();
