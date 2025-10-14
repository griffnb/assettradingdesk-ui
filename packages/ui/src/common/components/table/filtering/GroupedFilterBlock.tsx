import { TableState } from "@/models/store/state/TableState";
import { Input } from "@/ui/shadcn/ui/input";
import { ScrollArea } from "@/ui/shadcn/ui/scroll-area";
import { cn } from "@/utils/cn";
import { observer } from "mobx-react-lite";
import { useState } from "react";
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

  let filterRecords = rawProps.filterRecords;
  /*
  if (rawProps.searchFilterField && searchTerm) {
    filterRecords = filterRecords.filter((record) =>
      (record[rawProps.searchFilterField!] as unknown as string)
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    );
  }
    */

  return (
    <div className={cn("flex flex-col gap-y-2 overflow-hidden", className)}>
      <div className="">
        <Input
          className="focus-visible:ring-0"
          placeholder={`Search ${label}`}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
      </div>
      <ScrollArea className="flex h-72 w-full flex-col gap-2">
        <div className="flex flex-col gap-2 self-stretch">
          {filterRecords.map((group) => (
            <div key={group.label} className="flex flex-col gap-2">
              <div className="font-medium">{group.label}</div>
              <div className="flex flex-col gap-2 pl-4">
                {group.records
                  .filter((record) =>
                    !searchTerm
                      ? true
                      : (record[rawProps.labelField] as unknown as string)
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()),
                  )
                  .map((record) => (
                    <FilterCheckbox<V>
                      key={record["id" as keyof V] as string | number}
                      record={record}
                      labelField={labelField}
                      checked={(
                        (tableState.tableFilters[filterKey] as string[]) || []
                      ).includes(
                        (record[rawProps.valueField] as unknown as string) ||
                          "",
                      )}
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
