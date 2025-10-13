import { CategoryModel } from "@/models/models/category/model/CategoryModel";

import { TableState } from "@/models/store/state/TableState";
import { Store } from "@/models/store/Store";
import { Label } from "@/ui/shadcn/ui/label";
import { Switch } from "@/ui/shadcn/ui/switch";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { FilterBlock } from "./FilterBlock";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/ui/shadcn/ui/accordion";
import { ScrollArea } from "@/ui/shadcn/ui/scroll-area";

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
  props: SideFiltersProps<T>,
) {
  const [openValues, setOpenValues] = useState<string[]>([]);
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

  const isChecked = (type: string, id: string | number) =>
    filters[type]?.includes(id.toString()) ?? false;

  return (
    <div className="flex w-[360px] flex-none flex-col overflow-y-auto border-r border-border-neutral-primary bg-bg-neutral-primary p-4">
      <div className="mb-4 flex items-center">
        <span className="sticky text-lg font-semibold text-text-neutral-secondary">
          Filters
        </span>

        <i className="u u-x-circle ml-auto cursor-pointer" />
      </div>

      <div className="h-[calc(100svh-215px)] overflow-y-auto pl-1">
        <div className="flex items-center space-x-2">
          <Switch
            onCheckedChange={(checked) => {
              if (checked) {
                tableState.applyTableFilters({
                  ...tableState.appliedFilters,
                  "_c:has_pictures": "1",
                });
              } else {
                const newFilters = { ...tableState.appliedFilters };
                delete newFilters["_c:has_pictures"];
                tableState.applyTableFilters(newFilters);
              }
            }}
            id="has_pictures"
            checked={isChecked("_c:has_pictures", "1")}
          />
          <Label htmlFor="has_pictures">Has Pictures</Label>
        </div>
        <Accordion
          type="single"
          collapsible
          //value={openValues}
          //onValueChange={(values) => {
          //  console.log("Accordion values", values);
          //  setOpenValues(values as string[]);
          //}}
        >
          <AccordionItem value="categories">
            <AccordionTrigger>Categories</AccordionTrigger>

            <ScrollArea className="h-72 w-full">
              <FilterBlock
                label="Categories"
                tableState={tableState}
                filterRecords={categories}
                labelField={"name"}
                valueField={"id"}
                filterKey="categories.id"
              />
            </ScrollArea>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
});
