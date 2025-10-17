import { TableState } from "@/models/store/state/TableState";
import { Input } from "@/ui/shadcn/ui/input";
import { ScrollArea } from "@/ui/shadcn/ui/scroll-area";
import { cn } from "@/utils/cn";
import { observer } from "mobx-react-lite";
import { useCallback, useMemo, useState } from "react";
import { useVirtualization } from "../virtual/useVirtual";
import { FilterCheckbox } from "./FilterCheckbox";

interface FilterBlockProps<T extends object, V> {
  label: string;
  tableState: TableState<T>;
  filterRecords: V[];
  labelField: keyof V & string;
  iconField?: keyof V & string;
  colorField?: keyof V & string;
  valueField: keyof V & string;
  filterKey: string;
  searchFilterField?: keyof V & string;
  className?: string;
}

export const FilterBlock = observer(function FilterBlock<T extends object, V>(
  rawProps: FilterBlockProps<T, V>,
) {
  const [searchTerm, setSearchTerm] = useState("");
  const { label, tableState, labelField, filterKey, className } = rawProps;

  let filterRecords = rawProps.filterRecords;

  if (rawProps.searchFilterField && searchTerm) {
    filterRecords = filterRecords.filter((record) =>
      (record[rawProps.searchFilterField!] as unknown as string)
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    );
  }

  const {
    scrollRef,
    onScroll,
    topPad,
    topSpacerStyle,
    bottomPad,
    bottomSpacerStyle,
    visibleIndexes,
  } = useVirtualization({
    rows: filterRecords.length,
    rowHeight: 20,
    overscan: 10,
    scrollDebounceMs: 5,
  });

  const isChecked = useCallback(
    (record: V) => {
      const value = record[rawProps.valueField] as any;
      const checkedValues =
        (tableState.tableFilters[filterKey] as string[]) || [];
      return checkedValues.includes(value);
    },
    [tableState.tableFilters, filterKey],
  );

  const handleChange = (checked: boolean, record: V) => {
    const value = record[rawProps.valueField] as any;

    if (checked) {
      tableState.addFilter(filterKey, value.toString());
    } else {
      tableState.removeFilter(filterKey, value.toString());
    }
  };

  const sortedFilterRecords = useMemo(
    () =>
      [...filterRecords].sort((a, b) => {
        const aHasChecked = isChecked(a);
        const bHasChecked = isChecked(b);

        if (aHasChecked && !bHasChecked) return -1;
        if (!aHasChecked && bHasChecked) return 1;
        return 0;
      }),
    [filterRecords, isChecked],
  );

  return (
    <div className={cn("flex flex-col gap-y-2 overflow-hidden", className)}>
      <div className="flex w-full flex-row pr-3">
        <Input
          className="w-full focus-visible:ring-0"
          placeholder={`Search ${label}`}
          onChange={(e) => {
            setSearchTerm(e.target.value);
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
          {visibleIndexes.map((index) => {
            const record = sortedFilterRecords[index] as V;
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
          {bottomPad > 0 && <div style={bottomSpacerStyle} />}
        </div>
      </ScrollArea>
    </div>
  );
});
