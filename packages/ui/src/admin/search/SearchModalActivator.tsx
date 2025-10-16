import { LayerService } from "@/common_lib/services/LayerService";
import { detectOS } from "@/utils/os";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import SearchModal, { SearchModalId } from "./SearchModal";

export const SearchModalActivator = observer(() => {
  useEffect(() => {
    // Detect the OS
    const os = detectOS();

    const isMac = os === "mac";
    const isWindows = os === "windows";

    const handleKeyPress = (event: KeyboardEvent) => {
      if (
        (isMac && event.metaKey && event.key === "/") ||
        (isWindows && event.ctrlKey && event.key === "/")
      ) {
        LayerService.add(SearchModalId, SearchModal);
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);
  return null;
});
