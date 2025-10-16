import {
  IJSONAPIType,
  ServerService,
} from "@/common_lib/services/ServerService";
import { CategoryModel } from "@/models/models/category/model/CategoryModel";
import { ManufacturerModel } from "@/models/models/manufacturer/model/ManufacturerModel";
import { ModelModel } from "@/models/models/model/model/ModelModel";
import { Store } from "@/models/store/Store";
import { Button } from "@/ui/shadcn/ui/button";
import { Input } from "@/ui/shadcn/ui/input";
import { debounce } from "@/utils/debounce";
import { Search } from "lucide-react";
import { observer } from "mobx-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router";

/**
 * A Sample Component
 *
 * @example
 * [&_*[data-slot='my-slot']]:mx-auto
 *
 * @slot {"my-slot"} data-slot="my-slot"
 */

export interface SearchFlyoutProps {}

interface Response {
  models: ModelModel[];
  manufacturers: ManufacturerModel[];
  categories: CategoryModel[];
}

export const SearchFlyout = observer(function SearchFlyout() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQueryValue, setDebouncedQueryValue] = useState<string | null>(
    null,
  );
  const [results, setResults] = useState<Response | null>(null);
  const [show, setShow] = useState(false);
  const flyoutRef = useRef<HTMLDivElement>(null);

  // need this use effect cause if you debounce the parent function, it wont retain the filter/sort values
  useEffect(() => {
    if (debouncedQueryValue === null) return;

    ServerService.callGet("model", "search", { q: debouncedQueryValue }).then(
      (res: IJSONAPIType<Response>) => {
        if (res.success && res.data) {
          const results: Response = {
            models: Store.model.loadMany(res.data.models || []),
            manufacturers: Store.manufacturer.loadMany(
              res.data.manufacturers || [],
            ),
            categories: Store.category.loadMany(res.data.categories || []),
          };
          setResults(results);
        }
        setShow(true);
      },
    );
  }, [debouncedQueryValue]);
  // Debounce the callback. The search will be triggered after 500ms of inactivity.
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      setDebouncedQueryValue(query);
    }, 500),
    [],
  );

  // Handle click outside to close flyout
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        flyoutRef.current &&
        !flyoutRef.current.contains(event.target as Node)
      ) {
        setShow(false);
      }
    }

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show]);

  return (
    <div className="relative mx-6 flex w-full max-w-sm flex-row items-center overflow-visible">
      <div className="flex w-full max-w-sm items-center rounded-lg border bg-white">
        <Search className="ml-3 size-5 text-gray-400" />
        <Input
          type="text"
          value={searchQuery}
          placeholder="Search equipment, manufacturers, models..."
          className="flex-1 border-0 bg-transparent text-lg placeholder:text-gray-700 focus-visible:ring-0"
          onChange={(e) => {
            setSearchQuery(e.target.value);
            debouncedSearch(e.target.value);
          }}
          onFocus={() => setShow(true)}
        />
      </div>
      {results && show && (
        <div
          className="absolute left-5 top-10 z-nav-bar-over w-full min-w-fit overflow-visible bg-white"
          ref={flyoutRef}
        >
          <div className="flex flex-col gap-2 rounded-lg border border-b-2 p-4 shadow-lg">
            <div className="flex flex-row gap-10">
              {results.models && results.models.length > 0 && (
                <div className="flex flex-1 flex-col">
                  <div className="flex items-center justify-start gap-2 self-stretch rounded-md py-1.5 text-sm font-semibold leading-none text-foreground">
                    <div className="justify-start">Models</div>
                  </div>
                  <div className={`flex flex-1 flex-col gap-2`}>
                    {results.models.map((model) => (
                      <Link
                        to={`/assets?models=${model.id}`}
                        key={model.id}
                        className="whitespace-nowrap text-nowrap text-sm font-normal leading-tight"
                        onClick={() => setShow(false)}
                      >
                        {model.label}
                      </Link>
                    ))}
                  </div>
                  <div className="flex w-full flex-col items-start">
                    <Button
                      variant="link"
                      className="ml-0 pl-2 text-sm font-medium text-primary"
                      asChild
                    >
                      <Link onClick={() => setShow(false)} to="/assets">
                        See All Models
                      </Link>
                    </Button>
                  </div>
                </div>
              )}
              {results.categories && results.categories.length > 0 && (
                <div className="flex flex-1 flex-col">
                  <div className="flex items-center justify-start gap-2 self-stretch rounded-md py-1.5 text-sm font-semibold leading-none text-foreground">
                    <div className="justify-start">Categories</div>
                  </div>
                  <div className={`flex flex-1 flex-col gap-2`}>
                    {results.categories.map((category) => (
                      <Link
                        to={`/assets?categories=${category.id}`}
                        key={category.id}
                        className="whitespace-nowrap text-nowrap text-sm font-normal leading-tight"
                        onClick={() => setShow(false)}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                  <div className="flex w-full flex-col items-start">
                    <Button
                      variant="link"
                      className="ml-0 pl-2 text-sm font-medium text-primary"
                      asChild
                    >
                      <Link onClick={() => setShow(false)} to="/assets">
                        See All Categories
                      </Link>
                    </Button>
                  </div>
                </div>
              )}

              {results.manufacturers && results.manufacturers.length > 0 && (
                <div className="flex flex-1 flex-col">
                  <div className="flex items-center justify-start gap-2 self-stretch rounded-md py-1.5 text-sm font-semibold leading-none text-foreground">
                    <div className="justify-start">Manufacturers</div>
                  </div>
                  <div className={`flex flex-1 flex-col gap-2`}>
                    {results.manufacturers.map((manufacturer) => (
                      <Link
                        to={`/assets?manufacturers=${manufacturer.id}`}
                        key={manufacturer.id}
                        className="whitespace-nowrap text-nowrap text-sm font-normal leading-tight"
                        onClick={() => setShow(false)}
                      >
                        {manufacturer.name}
                      </Link>
                    ))}
                  </div>
                  <div className="flex w-full flex-col items-start">
                    <Button
                      variant="link"
                      className="ml-0 pl-2 text-sm font-medium text-primary"
                      asChild
                    >
                      <Link onClick={() => setShow(false)} to="/assets">
                        See All Manufacturers
                      </Link>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
