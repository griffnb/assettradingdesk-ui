import { IFilter } from "@/ui/common/components/types/filters";

export const filters: IFilter[] = [
  {
    placeholder: "Name",
    type: "text",
    field: "name",
  },
  {
    placeholder: "Slug",
    type: "text",
    field: "slug",
  },
  {
    placeholder: "Description",
    type: "text",
    field: "description",
  },
  {
    type: "gap",
    placeholder: "",
    label: "Relationships",
    field: "",
  },
  {
    placeholder: "Manufacturer",
    type: "model-search-multi-select",
    field: "manufacturer_id",
    modelName: "manufacturer",
    modelDisplayField: "label",
    modelSearchParam: "q",
  },
  {
    placeholder: "Category",
    type: "model-search-multi-select",
    field: "category_id",
    modelName: "category",
    modelDisplayField: "label",
    modelSearchParam: "q",
  },
  {
    type: "gap",
    placeholder: "",
    label: "Stats & Metadata",
    field: "",
  },
  {
    placeholder: "Hot (Min)",
    type: "number",
    field: "gt:hot",
  },
  {
    placeholder: "Hot (Max)",
    type: "number",
    field: "lt:hot",
  },
  {
    type: "gap",
    placeholder: "",
    label: "Date Filters",
    field: "",
  },
  {
    placeholder: "Created Date",
    type: "date-range",
    field: "between:created_at",
    format: "YYYY-MM-DD",
  },
  {
    placeholder: "Updated Date",
    type: "date-range",
    field: "between:updated_at",
    format: "YYYY-MM-DD",
  },
];
