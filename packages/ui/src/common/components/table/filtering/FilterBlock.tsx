import { TableState } from "@/models/store/state/TableState";
import { observer } from "mobx-react-lite";
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
}

export const FilterBlock = observer(function FilterBlock<T extends object, V>(
  rawProps: FilterBlockProps<T, V>,
) {
  const { label, tableState, filterRecords, labelField, filterKey } = rawProps;

  const handleChange = (checked: boolean, record: V) => {
    const value = record[rawProps.valueField] as any;

    if (checked) {
      tableState.addFilter(filterKey, value.toString());
    } else {
      tableState.removeFilter(filterKey, value.toString());
    }
  };

  return (
    <div className="flex flex-col gap-y-2">
      {filterRecords.map((record) => (
        <FilterCheckbox<V>
          key={record["id" as keyof V] as string | number}
          record={record}
          labelField={labelField}
          checked={(
            (tableState.tableFilters[filterKey] as string[]) || []
          ).includes((record[rawProps.valueField] as unknown as string) || "")}
          handleChange={(checked) => handleChange(checked, record)} // pass null when unchecked
        />
      ))}
    </div>
  );
});
