import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { Store } from "@/models/store/Store";
import { Button } from "@/ui/shadcn/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/ui/shadcn/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/ui/shadcn/ui/popover";
import { debounce } from "@/utils/debounce";
import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useState } from "react";
import { formatPrice } from "./utils";

export interface AssetSearchInputProps {
  onSelect: (asset: AssetModel) => void;
  selectedAsset: AssetModel | null;
}

export const AssetSearchInput = observer(function AssetSearchInput(
  props: AssetSearchInputProps,
) {
  const { onSelect, selectedAsset } = props;

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<AssetModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setResults([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        // TODO: Verify asset query supports search parameter
        const response = await Store.asset.query({
          search: searchQuery,
          limit: "20",
          disabled: "0",
        });

        if (response.success && response.data) {
          setResults(response.data);
        } else {
          setResults([]);
        }
      } catch (error) {
        console.error("Asset search failed:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 500),
    [],
  );

  // Trigger search when query changes
  useEffect(() => {
    if (query) {
      setLoading(true);
      debouncedSearch(query);
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [query, debouncedSearch]);

  // Handle asset selection
  const handleSelect = (asset: AssetModel) => {
    onSelect(asset);
    setIsOpen(false);
    setQuery("");
    setResults([]);
  };

  // Handle clearing selection
  const handleChange = () => {
    setIsOpen(true);
    setQuery("");
    setResults([]);
  };

  // If an asset is already selected, show selected state
  if (selectedAsset) {
    return (
      <div className="flex w-full flex-col gap-2">
        <label className="text-sm font-medium text-neutral-700">
          Selected Asset
        </label>
        <div className="flex items-center gap-3 rounded-lg border border-neutral-200 bg-white p-3">
          <img
            src={selectedAsset.thumbnail}
            alt={selectedAsset.label}
            className="size-16 rounded object-cover"
          />
          <div className="flex flex-1 flex-col gap-1">
            <div className="font-medium text-neutral-900">
              {selectedAsset.manufacturer_name} {selectedAsset.model_name}
            </div>
            <div className="text-sm text-neutral-600">
              {selectedAsset.year ?? "N/A"} • {formatPrice(selectedAsset.price)}
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleChange}
            className="shrink-0"
          >
            Change
          </Button>
        </div>
      </div>
    );
  }

  // Show search input
  return (
    <div className="flex w-full flex-col gap-2">
      <label className="text-sm font-medium text-neutral-700">
        Select Asset
      </label>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={isOpen}
            className="w-full justify-start text-left font-normal"
          >
            <span className="text-neutral-500">Search for an asset...</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-0" align="start">
          <Command shouldFilter={false}>
            <CommandInput
              placeholder="Search assets..."
              value={query}
              onValueChange={setQuery}
            />
            <CommandList>
              {loading && (
                <div className="flex items-center justify-center py-6">
                  <i className="fa fa-spinner fa-spin text-neutral-400" />
                </div>
              )}
              {!loading && query && results.length === 0 && (
                <CommandEmpty>No assets found.</CommandEmpty>
              )}
              {!loading && results.length > 0 && (
                <CommandGroup>
                  {results.map((asset) => (
                    <CommandItem
                      key={asset.id}
                      value={asset.id || ""}
                      onSelect={() => handleSelect(asset)}
                      className="cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={asset.thumbnail}
                          alt={asset.label}
                          className="size-12 rounded object-cover"
                        />
                        <div className="flex flex-col gap-0.5">
                          <div className="font-medium text-neutral-900">
                            {asset.manufacturer_name} {asset.model_name}
                          </div>
                          <div className="text-sm text-neutral-600">
                            {asset.year ?? "N/A"} • {formatPrice(asset.price)}
                          </div>
                        </div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
});
