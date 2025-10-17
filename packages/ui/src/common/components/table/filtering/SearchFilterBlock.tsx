import { URLParams } from "@/common_lib/types/helpers";
import { TableState } from "@/models/store/state/TableState";
import { Store } from "@/models/store/Store";
import { StoreKeys } from "@/models/types/store_keys";
import { Input } from "@/ui/shadcn/ui/input";
import { ScrollArea } from "@/ui/shadcn/ui/scroll-area";
import { cn } from "@/utils/cn";
import { debounce } from "@/utils/debounce";
import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useState } from "react";
import { useVirtualization } from "../virtual/useVirtual";
import { FilterCheckbox } from "./FilterCheckbox";

interface SearchFilterBlockProps<T extends object, V> {
  label: string;
  tableState: TableState<T>;
  modelName: StoreKeys;
  labelField: keyof V & string;
  valueField: keyof V & string;
  modelFilters?: URLParams;
  searchParam?: string;
  iconField?: keyof V & string;
  colorField?: keyof V & string;

  filterKey: string;

  className?: string;
}

export const SearchFilterBlock = observer(function SearchFilterBlock<
  T extends object,
  V,
>(rawProps: SearchFilterBlockProps<T, V>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQueryValue, setDebouncedQueryValue] = useState<string | null>(
    null,
  );
  const [results, setResults] = useState<V[] | null>(null);
  const [checkedResults, setCheckedResults] = useState<V[]>([]);
  const {
    label,
    tableState,
    labelField,
    valueField,
    filterKey,
    modelName,
    modelFilters,
    searchParam = "q",
    className,
  } = rawProps;

  useEffect(() => {
    const ids = (tableState.tableFilters[filterKey] as string[]) || [];

    if (ids.length === 0) {
      setCheckedResults([]);
      return;
    }

    Store[modelName].query({ id: ids }).then((resp) => {
      if (resp.success && resp.data) {
        setCheckedResults(resp.data as V[]);
      }
    });
  }, [tableState.tableFilters, filterKey, modelName]);

  // need this use effect cause if you debounce the parent function, it wont retain the filter/sort values
  useEffect(() => {
    if (debouncedQueryValue === null) return;

    Store[modelName]
      .query({ ...modelFilters, [searchParam]: debouncedQueryValue })
      .then((resp) => {
        if (resp.success && resp.data) {
          setResults(resp.data as V[]);
        }
      });
  }, [debouncedQueryValue]);
  // Debounce the callback. The search will be triggered after 500ms of inactivity.
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      setDebouncedQueryValue(query);
    }, 500),
    [],
  );

  const checkedIds = new Set(
    checkedResults.map((record) => record["id" as keyof V] as string),
  );

  const finalResults = [
    ...checkedResults,
    ...(results?.filter(
      (item) => !checkedIds.has(item["id" as keyof V] as string),
    ) || []),
  ];

  const {
    scrollRef,
    onScroll,
    topPad,
    topSpacerStyle,
    bottomPad,
    bottomSpacerStyle,
    visibleIndexes,
  } = useVirtualization({
    rows: finalResults.length,
    rowHeight: 20,
    overscan: 10,
    scrollDebounceMs: 5,
  });

  const handleChange = (checked: boolean, record: V) => {
    const value = record[valueField] as any;

    if (checked) {
      tableState.addFilter(filterKey, value.toString());
    } else {
      tableState.removeFilter(filterKey, value.toString());
    }
  };

  const isChecked = useCallback(
    (record: V) => {
      const value = record[rawProps.valueField] as any;
      const checkedValues =
        (tableState.tableFilters[filterKey] as string[]) || [];
      return checkedValues.includes(value);
    },
    [tableState.tableFilters, filterKey],
  );

  return (
    <div className={cn("flex flex-col gap-y-2 overflow-hidden", className)}>
      <div className="flex w-full flex-row pr-3">
        <Input
          className="w-full focus-visible:ring-0"
          placeholder={`Search ${label}`}
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            debouncedSearch(e.target.value);
          }}
        />
      </div>
      <ScrollArea
        className="flex h-72 w-full flex-col gap-2"
        viewportRef={scrollRef}
        viewportOnScroll={onScroll}
      >
        <div className="flex flex-col gap-2 self-stretch">
          {topPad > 0 && <div style={topSpacerStyle} />}

          <>
            {visibleIndexes.map((index) => {
              const record = finalResults[index] as V;
              return (
                <FilterCheckbox<V>
                  key={record["id" as keyof V] as string | number}
                  record={record}
                  labelField={labelField}
                  checked={isChecked(record)}
                  handleChange={(checked) => handleChange(checked, record)} // pass null when unchecked
                />
              );
            })}

            {results && results.length === 0 && searchQuery !== "" && (
              <div className="flex items-center justify-center py-4 text-sm text-gray-500">
                No results found
              </div>
            )}
          </>

          {bottomPad > 0 && <div style={bottomSpacerStyle} />}
        </div>
      </ScrollArea>
    </div>
  );
});
