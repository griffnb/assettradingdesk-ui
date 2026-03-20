import { CacheService } from "@/common_lib/services/CacheService";
import { SessionService } from "@/common_lib/services/SessionService";
import { titleCase } from "@/utils/strings";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import { useEffect, useState } from "react";
import { buildRecordLink, getRecordLabel } from "./helpers";
import { LinkableRecord } from "./types";

interface SearchRecentsProps {
  close: () => void;
}

export const SearchRecents = observer((props: SearchRecentsProps) => {
  const [recents, setRecents] = useState<LinkableRecord[]>([]);

  useEffect(() => {
    const existingItems = CacheService.get<LinkableRecord[]>("_search_recents");
    if (existingItems) {
      setRecents(existingItems.filter((item) => item && item._model_name));
    }
  }, []);

  const addBookmark = async (item: LinkableRecord, name: string) => {
    const admin = await SessionService.fetchAdmin();
    if (!admin?.bookmarks) return;

    const updatedPages = [
      ...admin.bookmarks.pages,
      {
        name:
          name || `${titleCase(item._model_name)} / ${getRecordLabel(item)}`,
        type: "page",
        url: buildRecordLink(item),
      },
    ];
    admin.bookmarks = { ...admin.bookmarks, pages: updatedPages };
    admin.save();
  };

  const removeRecent = (index: number) => {
    runInAction(() => {
      const updatedRecents = recents.filter((_, idx) => idx !== index);
      setRecents(updatedRecents);
      CacheService.set("_search_recents", updatedRecents);
    });
  };

  if (recents.length === 0) {
    return (
      <div className="flex items-center justify-center py-8 text-sm text-text-neutral-quaternary">
        No recent searches
      </div>
    );
  }

  return (
    <>
      <div className="m-3 mb-1 block border-l pl-2 text-left text-sm font-semibold text-text-neutral-primary">
        Recent
      </div>
      {recents.map((item, index) => (
        <div
          className="mt-1 flex flex-row items-center hover:bg-bg-neutral-secondary-hover"
          key={`recent-${item.id || index}`}
        >
          <Link
            className="flex w-full flex-1 cursor-pointer items-center gap-x-3 rounded-lg px-3 py-2"
            href={buildRecordLink(item)}
            onClick={props.close}
          >
            <span className="text-sm text-text-neutral-tertiary">
              {titleCase(item._model_name)} / {getRecordLabel(item)}
            </span>
          </Link>
          <i
            className="fa-regular fa-bookmark mr-2 cursor-pointer text-base text-icon-neutral-quaternary hover:text-icon-brand-secondary"
            onClick={() => {
              // TODO: replace with app modal input
              const name = window.prompt(
                "Enter a name for this bookmark",
                `${titleCase(item._model_name)} / ${getRecordLabel(item)}`,
              );
              if (name) {
                addBookmark(item, name);
                removeRecent(index);
              }
            }}
          />
          <i
            className="u u-trash-02 mr-3 cursor-pointer text-base text-icon-neutral-quaternary hover:text-red-500"
            onClick={() => {
              // TODO: replace with app confirm dialog
              if (
                window.confirm("Are you sure you want to remove this recent?")
              ) {
                removeRecent(index);
              }
            }}
          />
        </div>
      ))}
    </>
  );
});
