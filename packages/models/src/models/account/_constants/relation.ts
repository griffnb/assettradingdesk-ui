import { IConstant } from "@/models/types/constants";

export const relation: IConstant[] = [
  {
    id: 1,
    label: "Owner",
    hidden: true,
  },
  {
    id: 2,
    label: "Spouse",
  },
  {
    id: 3,
    label: "Child",
  },
  {
    id: 4,
    label: "Parent",
  },
  {
    id: 5,
    label: "Sibling",
  },
  {
    id: 6,
    label: "Other Family",
  },
];

export enum AccountRelation {
  Primary = 1,
  Spouse,
  Child,
  Parent,
  Sibling,
  OtherFamily,
}
