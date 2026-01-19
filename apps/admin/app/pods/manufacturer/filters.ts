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
