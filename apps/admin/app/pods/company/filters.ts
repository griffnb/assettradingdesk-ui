import { constants as assetConstants } from "@/models/models/asset/constants";
import { constants as companyConstants } from "@/models/models/company/constants";
import { IFilter } from "@/ui/common/components/types/filters";

export const filters: IFilter[] = [
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
    placeholder: "Country",
    type: "text",
    field: "country",
  },
  {
    type: "gap",
    placeholder: "",
    label: "Company Classification",
    field: "",
  },
  {
    placeholder: "Company Types",
    type: "multi-select",
    field: {
      queryParam: "company_type",
      postgresColumn: "companies.meta_data->>'company_types'",
      elasticsearchColumn: "company_type",
    },
    options: companyConstants.company_type,
  },
  {
    placeholder: "Wafer Sizes",
    type: "multi-select",
    field: {
      queryParam: "wafer_size",
      postgresColumn: "companies.meta_data->>'wafer_sizes'",
      elasticsearchColumn: "wafer_size",
    },
    options: assetConstants.wafer_size,
  },
  {
    type: "gap",
    placeholder: "",
    label: "Contact Information",
    field: "",
  },
  {
    placeholder: "Email",
    type: "text",
    field: "email",
  },
  {
    placeholder: "Phone",
    type: "text",
    field: "phone",
  },
];
