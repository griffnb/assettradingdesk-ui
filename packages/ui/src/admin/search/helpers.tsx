import { plural, titleCase } from "@/utils/strings";
import { LinkableRecord } from "./types";

export const getRecordLabel = (record: LinkableRecord) => {
  if (record.label) {
    return record.label;
  }
  if (record.name) {
    return titleCase(record.name);
  }

  return titleCase(record._model_name);
};

export const buildRecordLink = (record: LinkableRecord) => {
  if (record.link) {
    return record.link;
  }

  // Fallback to a generic link if no specific link is provided
  return `/${plural(record._model_name.toLowerCase())}/details/${record.id}`;
};
