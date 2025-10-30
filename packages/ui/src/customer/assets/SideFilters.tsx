import { CategoryModel } from "@/models/models/category/model/CategoryModel";

import { TableState } from "@/models/store/state/TableState";
import { Store } from "@/models/store/Store";
import { FilterBlock } from "@/ui/common/components/table/filtering/FilterBlock";
import { Label } from "@/ui/shadcn/ui/label";
import { Switch } from "@/ui/shadcn/ui/switch";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

import { ManufacturerModel } from "@/models/models/manufacturer/model/ManufacturerModel";
import { ModelModel } from "@/models/models/model/model/ModelModel";
import { StoreModel } from "@/models/store/StoreModel";
import { GroupedFilterBlock } from "@/ui/common/components/table/filtering/GroupedFilterBlock";
import { SearchFilterBlock } from "@/ui/common/components/table/filtering/SearchFilterBlock";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/ui/shadcn/ui/accordion";
import { Badge } from "@/ui/shadcn/ui/badge";
import { Button } from "@/ui/shadcn/ui/button";
import { ScrollArea } from "@/ui/shadcn/ui/scroll-area";
import { AccordionContent } from "@radix-ui/react-accordion";

interface SideFiltersProps<T extends object> {
  tableState: TableState<T>;
}

export const SideFilters = observer(function SideFilters<T extends object>(
  props: SideFiltersProps<T>,
) {
  const [openValues, setOpenValues] = useState<string[]>([]);
  const [categories, setCategories] = useState<
    { label: string; records: CategoryModel[] }[]
  >([]);
  const [manufacturers, setManufacturers] = useState<ManufacturerModel[]>([]);

  const { tableState } = props;

  useEffect(() => {
    Store.category
      .query(
        { disabled: "0", "cte:gt:asset_count": "0" },
        { customTTL: 1000 * 60 * 10 },
      )
      .then((resp) => {
        if (resp.success && resp.data) {
          const grouped = groupRecords(resp.data, "parent_name");
          setCategories(grouped);
        }
      });
    Store.manufacturer
      .query(
        { disabled: "0", "cte:gt:asset_count": "0" },
        { customTTL: 1000 * 60 * 10 },
      )
      .then((resp) => {
        if (resp.success && resp.data) {
          setManufacturers(resp.data);
        }
      });
  }, []);

  const isChecked = (type: string, id: string | number) =>
    tableState.appliedFilters[type]?.includes(id.toString()) ?? false;

  return (
    <div className="flex w-full flex-none flex-col overflow-y-auto border-r border-border-neutral-primary bg-bg-neutral-primary py-4 md:w-[360px]">
      <div className="mb-4 flex items-center px-4">
        <span className="sticky text-lg font-semibold text-text-neutral-secondary">
          Filters{" "}
        </span>

        <Button
          variant="outline"
          size="sm"
          className="ml-auto"
          onClick={() =>
            tableState.applyTableFilters({
              status: "100",
              limit: "100",
              pictures: "1",
            })
          }
        >
          Clear Filters
          <i className="u u-x-circle ml-auto cursor-pointer" />
        </Button>
      </div>
      <div className="px-4 pb-4 text-lg md:hidden">
        Showing{" "}
        {tableState.loading ? (
          <i className="fa fa-spinner fa-spin" />
        ) : (
          `(${tableState.totalCount} Results)`
        )}
      </div>

      <ScrollArea className="h-[calc(100svh-5px-var(--customer-top-nav-h))] px-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center space-x-2">
            <Switch
              onCheckedChange={(checked) => {
                if (checked) {
                  tableState.applyTableFilters({
                    ...tableState.appliedFilters,
                    pictures: "1",
                  });
                } else {
                  const newFilters = { ...tableState.appliedFilters };
                  delete newFilters["pictures"];
                  tableState.applyTableFilters(newFilters);
                }
              }}
              id="has_pictures"
              checked={isChecked("pictures", "1")}
            />
            <Label htmlFor="has_pictures">Has Pictures</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              onCheckedChange={(checked) => {
                if (checked) {
                  tableState.applyTableFilters({
                    ...tableState.appliedFilters,
                    price: "1",
                  });
                } else {
                  const newFilters = { ...tableState.appliedFilters };
                  delete newFilters["price"];
                  tableState.applyTableFilters(newFilters);
                }
              }}
              id="has_price"
              checked={isChecked("price", "1")}
            />
            <Label htmlFor="has_price">Has Pricing</Label>
          </div>
        </div>
        <Accordion
          type="multiple"
          value={openValues}
          onValueChange={(values) => {
            setOpenValues(values as string[]);
          }}
        >
          <AccordionItem value="categories">
            <AccordionTrigger>
              <div className="flex w-full flex-row items-center justify-between">
                <span>Categories</span>
                {tableState.getFilter("categories").length > 0 && (
                  <Badge className="bg-primary text-primary-foreground">
                    {tableState.getFilter("categories").length}
                  </Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent className="max-w-[330px] border-b pb-2">
              <GroupedFilterBlock
                label="Categories"
                tableState={tableState}
                filterRecords={categories}
                labelField={"label"}
                valueField={"id"}
                filterKey="categories"
                searchFilterField="name"
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="makes">
            <AccordionTrigger>
              <div className="flex w-full flex-row items-center justify-between">
                <span>Manufacturers</span>
                {tableState.getFilter("manufacturers").length > 0 && (
                  <Badge className="bg-primary text-primary-foreground">
                    {tableState.getFilter("manufacturers").length}
                  </Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent className="max-w-[330px] border-b pb-2">
              <FilterBlock
                label="Manufacturers"
                tableState={tableState}
                filterRecords={manufacturers}
                labelField={"label"}
                valueField={"id"}
                filterKey="manufacturers"
                searchFilterField="name"
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="models">
            <AccordionTrigger className="border-b data-[state=open]:border-b-0">
              <div className="flex w-full flex-row items-center justify-between">
                <span>Models</span>
                {tableState.getFilter("models").length > 0 && (
                  <Badge className="bg-primary text-primary-foreground">
                    {tableState.getFilter("models").length}
                  </Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent className="max-w-[330px] border-b pb-2">
              <SearchFilterBlock<T, ModelModel>
                label="Models"
                tableState={tableState}
                modelName="model"
                modelFilters={{ disabled: "0" }}
                labelField={"label"}
                valueField={"id"}
                filterKey="models"
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ScrollArea>
    </div>
  );
});

const groupRecords = <T extends StoreModel>(
  records: T[],
  parentField: keyof T,
) => {
  const grouped: Record<string, typeof records> = {};
  records.forEach((record) => {
    const parentLabel = record[parentField] as unknown as string;
    if (!grouped[parentLabel]) {
      grouped[parentLabel] = [];
    }
    grouped[parentLabel].push(record);
  });
  return Object.entries(grouped).map(([label, records]) => ({
    label,
    records,
  }));
};
