import { SessionService } from "@/common_lib/services/SessionService";
import { detectOS } from "@/utils/os";
import { buildQueryString, getQueryParams } from "@/utils/strings";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

const BookmarkModalActivator = observer(() => {
  useEffect(() => {
    // Detect the OS once
    const os = detectOS();
    const isMac = os === "mac";
    const isWindows = os === "windows";

    const handleKeyPress = (event: KeyboardEvent) => {
      if (
        (isMac && event.metaKey && event.key === "b") ||
        (isWindows && event.ctrlKey && event.key === "b")
      ) {
        // Get the current route from window.location at the time of keypress
        const currentPath = window.location.pathname + window.location.search;
        saveBookmark(currentPath);
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []); // Empty dependency array - listener only attached once

  const saveBookmark = async (path: string) => {
    // Save the report
    const query = getQueryParams(window.location.search);
    const name = window.prompt(
      "Enter a name for the bookmark",
      window.document.title,
    );
    if (!name) {
      return;
    }

    delete query["page"];
    delete query["f"];
    delete query["limit"];
    delete query["reporting_period"];

    const pathWithoutQuery = path.split("?")[0]?.split("#")[0];
    const bookmark = {
      name: name,
      type: "page",
      url: `${pathWithoutQuery}?${buildQueryString(query)}`,
    };

    const admin = await SessionService.fetchAdmin();
    if (!admin) return null;
    runInAction(async () => {
      const bookmarks = admin.bookmarks;
      if (!bookmarks.pages) {
        bookmarks.pages = [];
      }
      bookmarks.pages = [...bookmarks.pages, bookmark];

      admin.bookmarks = bookmarks;
      await admin.save();
    });
  };

  return null;
});

export default BookmarkModalActivator;
