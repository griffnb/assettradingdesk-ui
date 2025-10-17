import { TableState } from "@/models/store/state/TableState";
import { Input } from "@/ui/shadcn/ui/input";
import { ScrollArea } from "@/ui/shadcn/ui/scroll-area";
import { cn } from "@/utils/cn";
import { observer } from "mobx-react-lite";
import { useCallback, useMemo, useState } from "react";
import { FilterCheckbox } from "./FilterCheckbox";

interface GroupedFilterBlockProps<T extends object, V> {
  label: string;
  tableState: TableState<T>;
  filterRecords: { label: string; records: V[] }[];
  labelField: keyof V & string;
  iconField?: keyof V & string;
  colorField?: keyof V & string;
  valueField: keyof V & string;
  filterKey: string;
  searchFilterField?: keyof V & string;
  className?: string;
}

export const GroupedFilterBlock = observer(function GroupedFilterBlock<
  T extends object,
  V,
>(rawProps: GroupedFilterBlockProps<T, V>) {
  const [searchTerm, setSearchTerm] = useState("");

  const { label, tableState, labelField, filterKey, className } = rawProps;

  const handleChange = (checked: boolean, record: V) => {
    const value = record[rawProps.valueField] as any;

    if (checked) {
      tableState.addFilter(filterKey, value.toString());
    } else {
      tableState.removeFilter(filterKey, value.toString());
    }
  };

  const filterRecords = rawProps.filterRecords;

  const hasCheckedRecord = useCallback(
    (group: { label: string; records: V[] }) => {
      const checkedValues =
        (tableState.tableFilters[filterKey] as string[]) || [];
      return group.records.some((record) =>
        checkedValues.includes(
          (record[rawProps.valueField] as unknown as string) || "",
        ),
      );
    },
    [tableState.tableFilters, filterKey],
  );

  const isChecked = useCallback(
    (record: V) => {
      const value = record[rawProps.valueField] as any;
      const checkedValues =
        (tableState.tableFilters[filterKey] as string[]) || [];
      return checkedValues.includes(value);
    },
    [tableState.tableFilters, filterKey],
  );

  const sortedFilterRecords = useMemo(
    () =>
      [...filterRecords].sort((a, b) => {
        const aHasChecked = hasCheckedRecord(a);
        const bHasChecked = hasCheckedRecord(b);

        if (aHasChecked && !bHasChecked) return -1;
        if (!aHasChecked && bHasChecked) return 1;
        return 0;
      }),
    [filterRecords, hasCheckedRecord],
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
      <ScrollArea className="flex h-72 w-full flex-col gap-2">
        <div className="flex flex-col gap-2 self-stretch">
          {sortedFilterRecords.map((group) => (
            <div key={group.label} className="flex flex-col gap-2">
              <div className="font-medium">{group.label}</div>
              <div className="flex flex-col gap-2 pl-4">
                {group.records
                  .filter((record) =>
                    !searchTerm
                      ? true
                      : (record[rawProps.labelField] as unknown as string)
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) &&
                        !isChecked(record),
                  )
                  .map((record) => (
                    <FilterCheckbox<V>
                      key={record["id" as keyof V] as string | number}
                      record={record}
                      labelField={labelField}
                      checked={isChecked(record)}
                      handleChange={(checked) => handleChange(checked, record)} // pass null when unchecked
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
});
