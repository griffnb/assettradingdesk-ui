import { IConstant } from "@/models/types/constants";

export const visibility: IConstant[] = [
  {
    id: 0,
    label: "Private",
  },
  {
    id: 1,
    label: "Public",
  },
];

export enum Visibility {
  Private = 0,
  Public = 1,
}
