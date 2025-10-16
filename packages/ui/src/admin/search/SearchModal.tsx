import { Store } from "@/models/store/Store";
import { StoreKeys } from "@/models/types/store_keys";
import { detectOS } from "@/utils/os";

import { LayerService } from "@/common_lib/services/LayerService";
import { Button } from "@/ui/common/components/buttons/Button";
import { ModalWrap } from "@/ui/common/components/modal/ModalWrap";
import { isUUID } from "@/utils/strings";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { SearchInput } from "./SearchInput";
import { SearchItem } from "./SearchItem";
import { SearchRecents } from "./SearchRecents";

export const SearchModalId = "SearchModal";

const modelList: StoreKeys[] = ["account"];

const allModels: StoreKeys[] = ["account"];

const SearchModal = observer(() => {
  const [models, setModels] = useState<Map<StoreKeys, string>>(
    new Map<StoreKeys, string>(),
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [os, setOS] = useState<string>("");

  useEffect(() => {
    const os = detectOS();
    setOS(os);
  }, []);

  useEffect(() => {
    if (searchQuery.length < 3) {
      return;
    }
    const controller = new AbortController();
    setLoading(true);

    let storeModels = Array.from(models.keys());
    // If it's a UUID, we might want to handle the search differently
    if (isUUID(searchQuery)) {
      if (models.size == 0) {
        storeModels = allModels;
      }
    } else {
      if (models.size == 0) {
        storeModels = modelList;
      }
    }

    Promise.all(
      storeModels.map((val) => {
        if (isUUID(searchQuery)) {
          return Store[val].query(
            {
              id: searchQuery,
              limit: "1",
            },
            { signal: controller.signal },
          );
        }

        return Store[val].query(
          {
            q: searchQuery,
            limit: "5",
          },
          { signal: controller.signal },
        );
      }),
    )
      .then((responses) => {
        setSearchResults(
          responses
            .map((resp) => resp.data)
            .flat()
            .filter((item) => item),
        );
        setLoading(false);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error("Error fetching models:", error);
          setLoading(false);
        } else {
          console.log("aborted safely");
        }
      });

    return () => controller.abort();
  }, [models, searchQuery]);

  const toggleModel = (modelName: StoreKeys) => {
    const newModels = new Map(models);
    if (newModels.has(modelName)) {
      newModels.delete(modelName);
    } else {
      newModels.set(modelName, modelName);
    }
    setModels(newModels);
  };

  return (
    <ModalWrap id={SearchModalId}>
      <div className="flex w-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="z-modal m-3 rounded-xl bg-white transition-all sm:mx-auto">
          <div className="pointer-events-auto flex flex-col self-stretch">
            <div className="relative">
              <SearchInput
                className="border-none"
                searchQuery={searchQuery}
                applySearchQuery={setSearchQuery}
                prependIcon={
                  <i className="u u-search-lg text-icon-neutral-quaternary" />
                }
              />

              <div className="[&amp;::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&amp;::-webkit-scrollbar-track]:bg-neutral-700 dark:[&amp;::-webkit-scrollbar-thumb]:bg-neutral-500 overflow-x-auto rounded-t-xl border-gray-200 px-4 py-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar]:h-2">
                <div className="flex flex-nowrap gap-x-2">
                  <Button
                    className={`px-6 shadow-none ${models.size == 0 ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"} inline-flex items-center gap-x-2 text-nowrap rounded-md py-2 text-sm capitalize focus:outline-none disabled:pointer-events-none disabled:opacity-50`}
                    data-hs-combo-box-group-title="all"
                    onClick={() => setModels(new Map())}
                  >
                    All
                  </Button>
                  {modelList.map((modelName, index) => (
                    <Button
                      key={`all-${index}`}
                      className={`shadow-none ${models.has(modelName) ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"} inline-flex items-center gap-x-2 text-nowrap rounded-md px-4 py-2 text-sm capitalize disabled:pointer-events-none disabled:opacity-50`}
                      onClick={() => toggleModel(modelName)}
                    >
                      {modelName.replace(/_/g, " ")}
                    </Button>
                  ))}
                </div>
              </div>

              {/*<!-- SearchBox Modal Body -->*/}

              <div
                className="h-80 overflow-hidden overflow-y-auto p-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar]:w-2"
                data-hs-combo-box-output-items-wrapper=""
              >
                {searchQuery == "" ? (
                  <SearchRecents
                    close={() => LayerService.remove(SearchModalId)}
                  />
                ) : (
                  <>
                    <div className="m-3 mb-1 block border-l pl-2 text-left text-sm font-semibold text-text-neutral-primary">
                      Search Results
                    </div>
                    {loading ? (
                      <i className="fas fa-spinner animate-spin"></i>
                    ) : (
                      searchResults.map((result, index) => (
                        <SearchItem
                          key={`search-result-${index}`}
                          record={result}
                          close={() => {
                            LayerService.remove(SearchModalId);
                          }}
                        />
                      ))
                    )}
                  </>
                )}
              </div>
              {/*<!-- End SearchBox Modal Body -->*/}
            </div>
          </div>
          <div className="flex flex-row rounded-b-xl border-t p-2">
            {/* <div className="mr-2 rounded border px-2 py-1 text-xs text-text-neutral-quaternary">
              ESC
            </div>
            <div className="mr-6 flex items-center justify-center text-center text-xs text-text-neutral-quaternary">
              close
            </div> */}
            <div className="rounded border px-2 py-1 text-xs text-text-neutral-quaternary">
              Bookmarking : {os === "mac" ? "⌘B" : "Ctrl+B"}
            </div>
          </div>
        </div>

        {/*<!-- End SearchBox -->*/}
      </div>
    </ModalWrap>
  );
});

export default SearchModal;
