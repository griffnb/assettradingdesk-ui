import { constants } from "@/models/constants";
import { IFilter } from "@/ui/common/components/types/filters";

export const filters: IFilter[] = [
  {
    placeholder: "Pipeline Name",
    type: "text",
    field: "name",
  },
  {
    type: "gap",
    placeholder: "",
    label: "Pipeline Info",
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
    placeholder: "Stage",
    type: "multi-select",
    field: "stage",
    options: constants.pipeline.stage,
  },
  {
    type: "gap",
    placeholder: "",
    label: "Buyer Information",
    field: "",
  },
  {
    placeholder: "Buyer Owner Account",
    type: "model-search-multi-select",
    field: "buyer_owner_account_id",
    modelName: "account",
    modelDisplayField: "label",
    modelSearchParam: "q",
  },
  {
    placeholder: "Buyer Client",
    type: "model-search-multi-select",
    field: "buyer_client_id",
    modelName: "client",
    modelDisplayField: "label",
    modelSearchParam: "q",
  },
  {
    placeholder: "Buyer Company",
    type: "text",
    field: "q:buyer_company_name",
  },
  {
    placeholder: "Buyer Facility",
    type: "text",
    field: "q:buyer_facility_name",
  },
  {
    type: "gap",
    placeholder: "",
    label: "Seller Information",
    field: "",
  },
  {
    placeholder: "Seller Owner Account",
    type: "model-search-multi-select",
    field: "seller_owner_account_id",
    modelName: "account",
    modelDisplayField: "label",
    modelSearchParam: "q",
  },
  {
    placeholder: "Seller Client",
    type: "model-search-multi-select",
    field: "seller_client_id",
    modelName: "client",
    modelDisplayField: "label",
    modelSearchParam: "q",
  },
  {
    placeholder: "Seller Company",
    type: "text",
    field: "q:seller_company_name",
  },
  {
    placeholder: "Seller Facility",
    type: "text",
    field: "q:seller_facility_name",
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
