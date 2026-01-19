import { IFilter } from "@/ui/common/components/types/filters";

export const filters: IFilter[] = [
  {
    placeholder: "Name",
    type: "text",
    field: "name",
  },
  {
    placeholder: "Email",
    type: "email",
    field: "email",
  },
  {
    placeholder: "Phone",
    type: "text",
    field: "phone",
  },
  {
    placeholder: "Mobile",
    type: "text",
    field: "mobile",
  },
  {
    placeholder: "Title",
    type: "text",
    field: "title",
  },
  {
    type: "gap",
    placeholder: "",
    label: "Client Attributes",
    field: "",
  },
  {
    placeholder: "Decision Maker",
    type: "checkbox",
    field: "is_decision_maker",
    checkedValue: "1",
    uncheckedValue: "",
  },
  {
    type: "gap",
    placeholder: "",
    label: "Relationships",
    field: "",
  },
  {
    placeholder: "Company",
    type: "model-search-multi-select",
    field: "company_id",
    modelName: "company",
    modelDisplayField: "label",
    modelSearchParam: "q",
  },
  {
    placeholder: "Facility",
    type: "model-search-multi-select",
    field: "facility_id",
    modelName: "facility",
    modelDisplayField: "label",
    modelSearchParam: "q",
  },
  {
    placeholder: "Supervisor",
    type: "model-search-multi-select",
    field: "supervisor_client_id",
    modelName: "client",
    modelDisplayField: "label",
    modelSearchParam: "q",
  },
  {
    placeholder: "Source Account",
    type: "model-search-multi-select",
    field: "source_account_id",
    modelName: "account",
    modelDisplayField: "label",
    modelSearchParam: "q",
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
];
