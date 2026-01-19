import { constants } from "@/models/constants";
import { IFilter } from "@/ui/common/components/types/filters";

export const filters: IFilter[] = [
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
    placeholder: "First Name",
    type: "text",
    field: "first_name",
  },
  {
    placeholder: "Last Name",
    type: "text",
    field: "last_name",
  },
  {
    type: "gap",
    placeholder: "",
    label: "Role & Access",
    field: "",
  },
  {
    placeholder: "Role",
    type: "multi-select",
    field: "role",
    options: constants.account.role,
  },
  {
    placeholder: "Test User Type",
    type: "multi-select",
    field: "test_user_type",
    options: constants.account.test_user_type,
  },
  {
    type: "gap",
    placeholder: "",
    label: "Relationships",
    field: "",
  },
  {
    placeholder: "Organization",
    type: "model-search-multi-select",
    field: "organization_id",
    modelName: "organization",
    modelDisplayField: "label",
    modelSearchFilters: { disabled: "0" },
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
    placeholder: "Company",
    type: "model-search-multi-select",
    field: "company_id",
    modelName: "company",
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
    placeholder: "Email Verified Date",
    type: "date-range",
    field: "between:email_verified_at_ts",
    format: "YYYY-MM-DD",
  },
  {
    placeholder: "Last Login Date",
    type: "date-range",
    field: "between:last_login_ts",
    format: "YYYY-MM-DD",
  },
  {
    placeholder: "Created Date",
    type: "date-range",
    field: "between:created_at",
    format: "YYYY-MM-DD",
  },
];
