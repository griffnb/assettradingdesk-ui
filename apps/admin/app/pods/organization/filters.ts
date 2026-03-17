import { constants } from "@/models/constants";
import { IFilter } from "@/ui/common/components/types/filters";

export const filters: IFilter[] = [
  {
    placeholder: "Name",
    type: "text",
    field: "q:name",
  },
  {
    placeholder: "Organization Type",
    type: "multi-select",
    field: "organization_type",
    options: constants.organization.organization_type,
  },
  {
    placeholder: "Subdomain",
    type: "text",
    field: "subdomain",
  },
  {
    type: "gap",
    placeholder: "",
    label: "Billing Information",
    field: "",
  },
  {
    placeholder: "Billing Plan",
    type: "model-search-multi-select",
    field: "billing_plan_id",
    modelName: "billing_plan",
    modelDisplayField: "label",
    modelSearchFilters: { disabled: "0" },
    modelSearchParam: "q",
  },
  {
    placeholder: "Billing Email",
    type: "text",
    field: {
      queryParam: "billing_email",
      postgresColumn: "organizations.properties->>'billing_email'",
      elasticsearchColumn: "billing_email",
    },
  },
  {
    placeholder: "Stripe ID",
    type: "text",
    field: "stripe_id",
  },
  {
    type: "gap",
    placeholder: "",
    label: "External Integration",
    field: "",
  },
  {
    placeholder: "External ID",
    type: "text",
    field: "external_id",
  },
  {
    placeholder: "End User Company",
    type: "model-search-multi-select",
    field: "end_user_company_id",
    modelName: "company",
    modelDisplayField: "label",
    modelSearchFilters: { disabled: "0" },
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
  {
    placeholder: "Updated Date",
    type: "date-range",
    field: "between:updated_at",
    format: "YYYY-MM-DD",
  },
];
