import { CategoryModel } from "@/models/models/category/model/CategoryModel";

import { TableState } from "@/models/store/state/TableState";
import { Store } from "@/models/store/Store";
import { Button } from "@/ui/common/components/buttons/Button";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { FilterBlock } from "./FilterBlock";

interface SideFiltersProps<T extends object> {
  tableState: TableState<T>;
}

// normalize all filter values into arrays
function normalizeFilters(raw: Record<string, any>): Record<string, string[]> {
  const result: Record<string, string[]> = {};
  for (const [key, value] of Object.entries(raw)) {
    if (value == null) continue;
    result[key] = Array.isArray(value) ? value.map(String) : [String(value)];
  }
  return result;
}

export const SideFilters = observer(function SideFilters<T extends object>(
  props: SideFiltersProps<T>
) {
  const [open, setOpen] = useState<boolean>(true);
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const { tableState } = props;
  const initialFilters = tableState.appliedFilters;

  useEffect(() => {
    Store.category.query({ disabled: "0" }).then((resp) => {
      if (resp.success && resp.data) {
        setCategories(resp.data);
      }
    });
  }, []);

  useEffect(() => {
    setFilters(normalizeFilters(tableState.appliedFilters));
  }, [tableState.appliedFilters]);

  const toggleFilter = (
    type: string,
    id: string | number,
    checked: boolean
  ) => {
    setFilters((prev) => {
      const copy = { ...prev };
      const current = copy[type] || [];

      if (checked) {
        copy[type] = [...current, id.toString()].filter(
          (v, i, arr) => arr.indexOf(v) === i
        );
      } else {
        copy[type] = current.filter((v) => v !== id.toString());
        if (copy[type].length === 0) delete copy[type]; // clean empty arrays
      }

      return copy;
    });
  };

  const applyCurrentFilters = () => {
    tableState.applyTableFilters(filters);
  };

  const isChecked = (type: string, id: string | number) =>
    filters[type]?.includes(id.toString()) ?? false;

  return (
    <div className="flex w-[360px] flex-none flex-col overflow-y-auto border-r border-border-neutral-primary bg-bg-neutral-primary p-4">
      <div className="mb-4 flex items-center">
        <span className="sticky text-lg font-semibold text-text-neutral-secondary">
          Filters
        </span>

        <i
          className="u u-x-circle ml-auto cursor-pointer"
          onClick={() => setOpen(false)}
        />
      </div>

      <div className="overflow-y-auto pl-1 h-[calc(100svh-215px)]">
        <FilterBlock
          label="Categories"
          tableState={tableState}
          filterRecords={categories}
          labelField={"name"}
          valueField={"id"}
          filterKey="category_id"
        />
      </div>

      <div className="mt-auto flex w-full flex-row border-t border-border-neutral-primary py-4 pr-4">
        <Button
          variant="tertiary"
          size="sm"
          className="ml-auto"
          onClick={() => {
            tableState.applyTableFilters(initialFilters);
          }}
        >
          Reset
        </Button>
        <Button size="sm" className="ml-2 w-40" onClick={applyCurrentFilters}>
          Apply
        </Button>
      </div>
    </div>
  );
});
