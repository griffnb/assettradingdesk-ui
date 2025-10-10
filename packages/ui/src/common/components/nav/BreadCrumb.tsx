import { Store } from "@/models/store/Store";
import { StoreModel } from "@/models/store/StoreModel";
import { StoreKeys } from "@/models/types/store_keys";
import { titleCase } from "@/utils/strings";
import clsx from "clsx";
import { observer } from "mobx-react-lite";

import { useEffect, useState } from "react";
import { Breadcrumb, ParentInfo } from "../types/bread-crumb";

type HasParent = {
  getParent: () => ParentInfo | null;
  getBreadCrumb(parent?: unknown): { title: string; url: string } | undefined;
};

export const isHasParent = (value: unknown): value is HasParent => {
  return (
    !!value &&
    typeof value === "object" &&
    typeof (value as any).getParent === "function" &&
    typeof (value as any).getBreadCrumb === "function"
  );
};

interface BreadCrumbProps<T extends StoreModel> {
  parentId?: string;
  parentModelName?: StoreKeys;
  parentTitleField?: keyof T;

  dualParentId?: string;
  dualParentTitleField?: string;
  title?: string;
  record?: T;
}
export const BreadCrumb = observer(
  <T extends StoreModel>(props: BreadCrumbProps<T>) => {
    const [breadCrumbs, setBreadCrumbs] = useState<Breadcrumb[]>([]);
    const [title, setTitle] = useState<string | null>(null);
    const [hash, setHash] = useState<string | null>(null);

    useEffect(() => {
      const handleHashChange = () => {
        const hash = window.location.hash.slice(1);
        setHash(titleCase(hash));
      };
      handleHashChange();
      window.addEventListener("hashchange", handleHashChange);
      return () => {
        window.removeEventListener("hashchange", handleHashChange);
      };
    }, []);

    useEffect(() => {
      const newBreadCrumbs: Breadcrumb[] = [];
      if (props.record) {
        recursive(props.record, newBreadCrumbs);
      } else {
        if (
          props.parentId &&
          !Array.isArray(props.parentId) &&
          props.parentModelName
        ) {
          Store[props.parentModelName].get(props.parentId).then((resp) => {
            if (resp.success && resp.data) {
              if (props.parentTitleField) {
                setTitle(
                  (resp.data as unknown as T)[
                    props.parentTitleField as keyof T
                  ] as string
                );
              }
              recursive(resp.data, newBreadCrumbs);
            }
          });
        }
      }
      if (props.title) {
        setTitle(props.title);
      }
    }, [
      props.record,
      props.parentId,
      props.parentModelName,
      props.title,
      props.parentTitleField,
    ]);

    const recursive = async (
      model: StoreModel,
      newBreadCrumbs: Breadcrumb[]
    ) => {
      if (!isHasParent(model)) {
        return;
      }
      const modelWithParent = model as HasParent;
      if (!modelWithParent) {
        return;
      }
      const parentInfo = modelWithParent.getParent();
      let parent: StoreModel | null = null;
      if (parentInfo) {
        const resp = await Store[parentInfo.model].get(parentInfo.id);
        if (resp.success && resp.data) {
          parent = resp.data;
        }
      }
      const breadCrumb = modelWithParent.getBreadCrumb(parent);
      if (breadCrumb && breadCrumb.title) {
        newBreadCrumbs.push(breadCrumb);
      }
      if (parent) {
        recursive(parent, newBreadCrumbs);
      } else {
        setBreadCrumbs(newBreadCrumbs.reverse());
      }
    };

    return (
      <nav className="flex py-2" aria-label="Breadcrumb">
        <ol
          role="list"
          className="flex w-full max-w-screen-xl space-x-4 px-4 text-text-neutral-quaternary sm:px-6 lg:px-8"
        >
          <li className="flex">
            <div className="flex items-center">
              <a href="/" className="">
                <i className="fa fa-house"></i>
                <span className="sr-only">Home</span>
              </a>
            </div>
          </li>
          {breadCrumbs.map((breadCrumb, index) => (
            <li className="flex last:text-black hover:opacity-80" key={index}>
              <div className="flex items-center">
                <i className="fa fa-chevron-right"></i>
                <a
                  href={breadCrumb.url}
                  className={clsx(
                    `ml-4 truncate whitespace-nowrap text-sm font-semibold`,
                    { "max-w-20": breadCrumbs.length - 1 > index }
                  )}
                >
                  {breadCrumb.title}
                </a>
              </div>
            </li>
          ))}
          {title && (
            <li
              className="flex cursor-pointer last:cursor-default last:text-black hover:opacity-80"
              onClick={async () => {
                if (!hash) return;
              }}
            >
              <div className="flex items-center">
                <i className="fa fa-chevron-right"></i>
                <span className="ml-4 truncate whitespace-nowrap text-sm font-semibold">
                  {title}
                </span>
              </div>
            </li>
          )}
          {hash && (
            <li className="flex last:text-black">
              <div className="flex items-center">
                <i className="fa fa-chevron-right"></i>
                <span className="ml-4 max-w-24 truncate whitespace-nowrap text-sm font-semibold">
                  {hash}
                </span>
              </div>
            </li>
          )}
        </ol>
      </nav>
    );
  }
);
