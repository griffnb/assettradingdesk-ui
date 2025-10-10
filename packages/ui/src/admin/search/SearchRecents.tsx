import { CacheService } from "@/common_lib/services/CacheService";
import { SessionService } from "@/common_lib/services/SessionService";
import { Bookmark } from "@/models/models/admin/model/AdminBaseModel";
import { titleCase } from "@/utils/strings";
import { runInAction } from "mobx";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { buildRecordLink, getRecordLabel } from "./helpers";
import { LinkableRecord } from "./types";

interface SearchRecentsProps {
  close: () => void;
}
export const SearchRecents = observer((props: SearchRecentsProps) => {
  const [recents, setRecents] = useState<LinkableRecord[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  useEffect(() => {
    const existingItems = CacheService.get<LinkableRecord[]>("_search_recents");
    if (existingItems) {
      setRecents(existingItems.filter((item) => item && item._model_name));
    }
  }, []);

  useEffect(() => {
    SessionService.fetchAdmin().then((admin) => {
      if (!admin || !admin.bookmarks || !admin.bookmarks.pages) {
        return;
      }
      setBookmarks(admin.bookmarks.pages);
    });
  }, []);

  const removeBookmark = (index: number) => {
    SessionService.fetchAdmin().then((admin) => {
      if (!admin || !admin.bookmarks) {
        return;
      }
      const bookmarks = admin.bookmarks;
      bookmarks.pages = [
        ...bookmarks.pages.slice(0, index),
        ...bookmarks.pages.slice(index + 1),
      ];

      admin.bookmarks = bookmarks;
      admin.save();
      setBookmarks(bookmarks.pages);
    });
  };

  if (recents.length === 0 && bookmarks.length === 0) {
    return null;
  }

  const addBookmark = (item: LinkableRecord, name: string) => {
    SessionService.fetchAdmin().then((admin) => {
      if (!admin || !admin.bookmarks) {
        return;
      }
      const bookmarks = admin.bookmarks;
      bookmarks.pages = [
        ...bookmarks.pages,
        {
          name:
            name || `${titleCase(item._model_name)} / ${getRecordLabel(item)}`,
          type: "page",
          url: buildRecordLink(item),
        },
      ];

      admin.bookmarks = bookmarks;
      admin.save();
      setBookmarks(bookmarks.pages);
    });
  };

  const removeRecent = (index: number) => {
    runInAction(() => {
      const updatedRecents = recents.filter((_, i) => i !== index);
      setRecents(updatedRecents);
      CacheService.set("_search_recents", updatedRecents);
    });
  };

  return (
    <>
      <div className="m-3 mb-1 block border-l pl-2 text-left text-sm font-semibold text-text-neutral-primary">
        Recent
      </div>
      {recents.length > 0 &&
        recents.map((item, index) => {
          return (
            <div
              className="mt-2 flex flex-row items-center hover:bg-bg-neutral-secondary-hover"
              key={`recent-${index}`}
            >
              <a
                className="flex w-full flex-1 cursor-pointer items-center gap-x-3 rounded-lg px-3 py-2"
                href={buildRecordLink(item)}
                onClick={props.close}
              >
                <span className="text-sm text-text-neutral-tertiary">
                  {titleCase(item._model_name)} / {getRecordLabel(item)}
                </span>
              </a>
              <i
                className="fa-regular fa-bookmark ml-auto mr-8 cursor-pointer rounded-xl text-lg text-icon-neutral-quaternary hover:text-icon-neutral-quinary"
                onClick={() => {
                  const name = window.prompt(
                    "Enter a name for this bookmark",
                    `${titleCase(item._model_name)} / ${getRecordLabel(item)}`
                  );
                  if (name) {
                    runInAction(() => {
                      addBookmark(item, name);
                      removeRecent(index);
                    });
                  }
                }}
              />
              <i
                className="u u-trash-02 ml-auto mr-7 cursor-pointer rounded-xl text-xl text-icon-neutral-quaternary hover:text-icon-neutral-quinary"
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to remove this recent?"
                    )
                  ) {
                    removeRecent(index);
                  }
                }}
              />
            </div>
          );
        })}
      {bookmarks.length > 0 && (
        <>
          <div className="m-3 mb-1 mt-6 block border-l pl-2 text-left text-sm font-semibold text-text-neutral-primary">
            Bookmarks
          </div>
          <div className="max-h-[200px] overflow-auto">
            {bookmarks.map((item, index) => (
              <div
                className="mt-2 flex flex-row items-center hover:bg-bg-neutral-secondary-hover"
                key={`bookmark-${index}`}
              >
                <a
                  className="flex w-full flex-1 cursor-pointer items-center gap-x-3 rounded-lg px-3 py-2"
                  href={item.url}
                  onClick={props.close}
                >
                  <span className="text-sm text-text-neutral-tertiary">
                    {item.name}
                  </span>
                </a>
                <i
                  className="fa fa-bookmark ml-auto mr-8 cursor-pointer rounded-xl text-lg text-icon-brand-secondary hover:text-icon-brand-primary"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to remove this bookmark?"
                      )
                    ) {
                      runInAction(() => {
                        removeBookmark(index);
                      });
                    }
                  }}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
});
