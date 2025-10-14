import { IFilter } from "@/ui/common/components/types/filters";

export const filters: IFilter[] = [
  {
    placeholder: "Paying Organization",
    type: "hidden",
    field: {
      queryParam: "pictures",
      postgresColumn: "_c:has_pictures",
      elasticsearchColumn: "_c:has_pictures",
    },
  },
  {
    placeholder: "Paying Organization",
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
      postgresColumn: "categories.id",
      elasticsearchColumn: "categories.id",
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
];
