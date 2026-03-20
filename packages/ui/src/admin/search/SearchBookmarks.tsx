import { SessionService } from "@/common_lib/services/SessionService";
import { Bookmark } from "@/models/models/admin/model/AdminBaseModel";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link } from "react-router";

interface SearchBookmarksProps {
  close: () => void;
}

export const SearchBookmarks = observer((props: SearchBookmarksProps) => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    SessionService.fetchAdmin().then((admin) => {
      if (!admin?.bookmarks?.pages) return;
      setBookmarks(admin.bookmarks.pages);
    });
  }, []);

  const removeBookmark = async (index: number) => {
    const admin = await SessionService.fetchAdmin();
    if (!admin?.bookmarks) return;

    const updatedPages = [
      ...admin.bookmarks.pages.slice(0, index),
      ...admin.bookmarks.pages.slice(index + 1),
    ];
    admin.bookmarks = { ...admin.bookmarks, pages: updatedPages };
    admin.save();
    setBookmarks(updatedPages);
  };

  return (
    <div className="flex flex-col">
      <div className="m-3 mb-1 block border-l pl-2 text-left text-sm font-semibold text-text-neutral-primary">
        Bookmarks
      </div>
      {bookmarks.length === 0 ? (
        <div className="flex items-center justify-center py-8 text-sm text-text-neutral-quaternary">
          No bookmarks yet
        </div>
      ) : (
        <div className="overflow-y-auto [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar]:w-2">
          {bookmarks.map((item, index) => (
            <div
              className="flex flex-row items-center px-1 hover:bg-bg-neutral-secondary-hover"
              key={`bookmark-${index}`}
            >
              <Link
                className="flex w-full flex-1 cursor-pointer items-center gap-x-3 rounded-lg px-3 py-2"
                to={item.url}
                onClick={props.close}
              >
                <i className="fa fa-bookmark text-xs text-icon-brand-secondary" />
                <span className="truncate text-sm text-text-neutral-tertiary">
                  {item.name}
                </span>
              </Link>
              <button
                type="button"
                className="mr-2 flex shrink-0 items-center justify-center rounded p-1 text-icon-neutral-quaternary hover:text-red-500"
                onClick={() => {
                  // TODO: replace with app confirm dialog
                  if (
                    window.confirm(
                      "Are you sure you want to remove this bookmark?",
                    )
                  ) {
                    removeBookmark(index);
                  }
                }}
              >
                <i className="u u-trash-02 text-sm" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});
