import { IConstant } from "@/models/types/constants";

export const stage: IConstant[] = [
  {
    id: 1,
    label: "New",
  },
  {
    id: 2,
    label: "Qualification",
  },
  {
    id: 3,
    label: "Specifications",
  },
  {
    id: 4,
    label: "Negotiation",
  },
  {
    id: 5,
    label: "Paperwork",
  },
  {
    id: 6,
    label: "Closed",
  },
  {
    id: 7,
    label: "Lost",
  },
];

export enum PipelineStage {
  New = 1,
  Qualification = 2,
  Specifications = 3,
  Negotiation = 4,
  Paperwork = 5,
  Closed = 6,
  Lost = 7,
}
