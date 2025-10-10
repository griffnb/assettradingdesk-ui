import { TableState } from "@/models/store/state/TableState";
import { CollapsablePanel } from "@/ui/common/components/panels/CollapsablePanel";
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
  rawProps: FilterBlockProps<T, V>
) {
  const { label, tableState, filterRecords, labelField, filterKey } = rawProps;

  const handleChange = (checked: boolean, record: V) => {
    const current = (tableState.tableFilters[filterKey] as string[]) || [];
    let newFilters: string[] = [];
    const value = record[rawProps.valueField] as any;

    if (checked) {
      // add
      if (!current.includes(value.toString())) {
        newFilters = [...current, value.toString()];
      }
    } else {
      // remove
      if (current.includes(value.toString())) {
        newFilters = current.filter((v) => v !== value.toString());
      }
    }

    const newTableFilters = {
      ...tableState.tableFilters,
      [filterKey]: newFilters.length > 0 ? newFilters : [],
    };

    tableState.applyTableFilters(newTableFilters);
  };

  return (
    <CollapsablePanel label={label} defaultShow={true}>
      <div className="flex flex-col gap-y-2">
        {filterRecords.map((record) => (
          <FilterCheckbox<V>
            key={record["id" as keyof V] as string | number}
            record={record}
            labelField={labelField}
            checked={(
              (tableState.tableFilters[filterKey] as string[]) || []
            ).includes(
              (record[rawProps.valueField] as unknown as string) || ""
            )}
            handleChange={(checked) => handleChange(checked, record)} // pass null when unchecked
          />
        ))}
      </div>
    </CollapsablePanel>
  );
});
