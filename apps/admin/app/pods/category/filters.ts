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
    placeholder: "Industry",
    type: "model-search-multi-select",
    field: "industry_id",
    modelName: "industry",
    modelDisplayField: "label",
    modelSearchParam: "q",
  },
  {
    placeholder: "Parent Category",
    type: "model-search-multi-select",
    field: "parent_category_id",
    modelName: "category",
    modelDisplayField: "label",
    modelSearchParam: "q",
  },
  {
    type: "gap",
    placeholder: "",
    label: "Hierarchy",
    field: "",
  },
  {
    placeholder: "Category Hierarchy",
    type: "text",
    field: "category_hierarchy",
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
