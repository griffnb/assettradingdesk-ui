import { IFilter } from "@/ui/common/components/types/filters";

export const filters: IFilter[] = [
  {
    placeholder: "",
    type: "hidden",
    field: {
      queryParam: "pictures",
      postgresColumn: "_c:has_pictures",
      elasticsearchColumn: "_c:has_pictures",
    },
  },
  {
    placeholder: "",
    type: "hidden",
    field: {
      queryParam: "price",
      postgresColumn: "gt:price",
      elasticsearchColumn: "gt:price",
    },
  },
  {
    placeholder: "Categories",
    type: "hidden",
    field: {
      queryParam: "categories",
      postgresColumn: "_c:category_id",
      elasticsearchColumn: "_c:category_id",
    },
  },
  {
    placeholder: "Manufacturers",
    type: "hidden",
    field: {
      queryParam: "manufacturers",
      postgresColumn: "manufacturers.id",
      elasticsearchColumn: "manufacturers.id",
    },
  },
  {
    placeholder: "Models",
    type: "hidden",
    field: {
      queryParam: "models",
      postgresColumn: "model_id",
      elasticsearchColumn: "model_id",
    },
  },
];
