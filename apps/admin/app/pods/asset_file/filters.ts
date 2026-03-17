import { IFilter } from "@/ui/common/components/types/filters";
import { constants } from "@/models/models/asset_file/constants";

export const filters: IFilter[] = [
  {
    placeholder: "File Name",
    type: "text",
    field: "q:file_name",
  },
  {
    placeholder: "File Type",
    type: "multi-select",
    field: "file_type",
    options: constants.file_type,
  },
  {
    placeholder: "Asset",
    type: "model-search-multi-select",
    field: "asset_id",
    modelName: "asset",
    modelDisplayField: "label",
    modelSearchFilters: { disabled: "0" },
    modelSearchParam: "q",
  },
  {
    placeholder: "File Location",
    type: "text",
    field: "q:file_location",
  },
  {
    placeholder: "Created By",
    type: "text",
    field: "q:created_by_name",
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
