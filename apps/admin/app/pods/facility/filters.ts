import { constants as assetConstants } from "@/models/models/asset/constants";
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
    placeholder: "Company",
    type: "model-search-multi-select",
    field: "company_id",
    modelName: "company",
    modelDisplayField: "label",
    modelSearchFilters: { disabled: "0" },
    modelSearchParam: "q",
  },
  {
    placeholder: "Name",
    type: "text",
    field: "name",
  },
  {
    placeholder: "Country",
    type: "text",
    field: "country",
  },
  {
    placeholder: "City",
    type: "text",
    field: {
      queryParam: "city",
      postgresColumn: "facilities.address->>'city'",
      elasticsearchColumn: "city",
    },
  },
  {
    type: "gap",
    placeholder: "",
    label: "Facility Details",
    field: "",
  },
  {
    placeholder: "Wafer Sizes",
    type: "multi-select",
    field: {
      queryParam: "wafer_size",
      postgresColumn: "facilities.meta_data->>'wafer_sizes'",
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
    placeholder: "Phone",
    type: "text",
    field: "phone",
  },
];
