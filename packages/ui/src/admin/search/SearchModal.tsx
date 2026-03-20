import { detectOS } from "@/common_lib/utils/os";
import { Store } from "@/models/store/Store";
import { StoreKeys } from "@/models/types/store_keys";

import { LayerService } from "@/common_lib/services/LayerService";
import { cn } from "@/common_lib/utils/cn";
import { isUUID } from "@/common_lib/utils/strings";
import { Button } from "@/ui/common/components/buttons/Button";
import { ModalWrap } from "@/ui/common/components/modal/ModalWrap";
import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import { SearchBookmarks } from "./SearchBookmarks";
import { SearchInput } from "./SearchInput";
import { SearchItem } from "./SearchItem";
import { SearchRecents } from "./SearchRecents";
import { LinkableRecord } from "./types";

export const SearchModalId = "SearchModal";

const modelList: StoreKeys[] = ["account"];

const allModels: StoreKeys[] = ["account"];

export const SearchModal = observer(function SearchModal() {
  const os = typeof navigator !== "undefined" ? detectOS() : "";
  const [selectedModels, setSelectedModels] = useState<Set<StoreKeys>>(
    new Set(),
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<LinkableRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const controllerRef = useRef<AbortController | null>(null);
  const searchIdRef = useRef(0);

  useEffect(() => {
    if (searchQuery.length < 3) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    // Cancel any in-flight request
    controllerRef.current?.abort();

    const controller = new AbortController();
    controllerRef.current = controller;
    const currentSearchId = ++searchIdRef.current;

    setLoading(true);

    let storeModels = Array.from(selectedModels);
    if (storeModels.length === 0) {
      storeModels = isUUID(searchQuery) ? allModels : modelList;
    }

    Promise.all(
      storeModels.map((val) => {
        if (isUUID(searchQuery)) {
          if (val.startsWith("v1")) {
            const valPart = val.split("v1_").pop();
            const idField = `${valPart}_id`;
            return Store[val].query(
              { [idField]: searchQuery, limit: "1" },
              { signal: controller.signal },
            );
          }
          return Store[val].query(
            { id: searchQuery, limit: "1" },
            { signal: controller.signal },
          );
        }

        return Store[val].query(
          { q: searchQuery, limit: "5" },
          { signal: controller.signal },
        );
      }),
    )
      .then((responses) => {
        // Guard against stale responses
        if (currentSearchId !== searchIdRef.current) return;

        setSearchResults(
          responses
            .map((resp) => resp.data)
            .flat()
            .filter((item) => !!item) as LinkableRecord[],
        );
        setLoading(false);
        setHasSearched(true);
      })
      .catch((error) => {
        if (error.name === "AbortError") return;
        console.error("Error fetching models:", error);
        if (currentSearchId === searchIdRef.current) {
          setLoading(false);
          setHasSearched(true);
        }
      });

    return () => controller.abort();
  }, [selectedModels, searchQuery]);

  // Cleanup on unmount
  useEffect(() => {
    return () => controllerRef.current?.abort();
  }, []);

  const toggleModel = (modelName: StoreKeys) => {
    setSelectedModels((prev) => {
      const next = new Set(prev);
      if (next.has(modelName)) {
        next.delete(modelName);
      } else {
        next.add(modelName);
      }
      return next;
    });
  };

  const closeModal = () => LayerService.remove(SearchModalId);

  return (
    <ModalWrap id={SearchModalId}>
      <div className="flex w-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="z-modal m-3 flex w-[70vw] flex-row rounded-xl bg-white transition-all sm:mx-auto">
          {/* Left panel — search */}
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="relative flex flex-1 flex-col">
              <SearchInput
                className="border-none"
                searchQuery={searchQuery}
                applySearchQuery={setSearchQuery}
                prependIcon={
                  <i className="u u-search-lg text-icon-neutral-quaternary" />
                }
              />

              <div className="overflow-x-auto border-gray-200 px-4 py-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar]:h-2">
                <div className="flex flex-nowrap gap-x-2">
                  <Button
                    className={cn(
                      "inline-flex items-center gap-x-2 text-nowrap rounded-md px-6 py-2 text-sm capitalize shadow-none focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                      selectedModels.size === 0
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-600 hover:bg-gray-50",
                    )}
                    onClick={() => setSelectedModels(new Set())}
                  >
                    All
                  </Button>
                  {modelList.map((modelName) => (
                    <Button
                      key={modelName}
                      className={cn(
                        "inline-flex items-center gap-x-2 text-nowrap rounded-md px-4 py-2 text-sm capitalize shadow-none disabled:pointer-events-none disabled:opacity-50",
                        selectedModels.has(modelName)
                          ? "bg-blue-600 text-white"
                          : "bg-white text-gray-600 hover:bg-gray-50",
                      )}
                      onClick={() => toggleModel(modelName)}
                    >
                      {modelName.replace(/_/g, " ")}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="min-h-80 flex-1 overflow-hidden overflow-y-auto p-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar]:w-2">
                {searchQuery === "" ? (
                  <SearchRecents close={closeModal} />
                ) : (
                  <>
                    <div className="m-3 mb-1 block border-l pl-2 text-left text-sm font-semibold text-text-neutral-primary">
                      Search Results
                    </div>
                    {loading ? (
                      <div className="flex items-center justify-center py-8">
                        <i className="fas fa-spinner animate-spin text-lg text-icon-neutral-quaternary" />
                      </div>
                    ) : searchResults.length === 0 && hasSearched ? (
                      <div className="flex items-center justify-center py-8 text-sm text-text-neutral-quaternary">
                        No results found
                      </div>
                    ) : (
                      searchResults.map((result) => (
                        <SearchItem
                          key={result.id}
                          record={result}
                          close={closeModal}
                        />
                      ))
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="flex flex-row rounded-bl-xl border-t p-2">
              <div className="rounded border px-2 py-1 text-xs text-text-neutral-quaternary">
                Bookmarking : {os === "mac" ? "⌘B" : "Ctrl+B"}
              </div>
            </div>
          </div>

          {/* Right panel — bookmarks */}
          <div className="flex w-64 shrink-0 flex-col border-l border-border-neutral-secondary">
            <div className="flex h-full flex-col overflow-y-auto">
              <SearchBookmarks close={closeModal} />
            </div>
          </div>
        </div>
      </div>
    </ModalWrap>
  );
});
