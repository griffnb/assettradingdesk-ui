import { IFilter } from "@/ui/common/components/types/filters";
import { constants } from "@/models/models/billing_plan/constants";

export const filters: IFilter[] = [
  {
    placeholder: "Plan Name",
    type: "text",
    field: "q:name",
  },
  {
    placeholder: "Internal Name",
    type: "text",
    field: "q:internal_name",
  },
  {
    placeholder: "Billing Cycle",
    type: "multi-select",
    field: "billing_cycle",
    options: constants.billing_cycle,
  },
  {
    placeholder: "Is Default",
    type: "checkbox",
    field: "is_default",
    checkedValue: "1",
    uncheckedValue: "",
  },
  {
    placeholder: "Level",
    type: "number",
    field: "level",
  },
  {
    type: "gap",
    placeholder: "",
    label: "Price Range",
    field: "",
  },
  {
    placeholder: "Min Price",
    type: "number",
    field: "gt:price",
  },
  {
    placeholder: "Max Price",
    type: "number",
    field: "lt:price",
  },
  {
    type: "gap",
    placeholder: "",
    label: "Date Range",
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
