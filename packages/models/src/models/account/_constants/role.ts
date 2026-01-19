import { IConstant } from "@/models/types/constants";

export const role: IConstant[] = [
  {
    id: 1,
    label: "User",
  },
  {
    id: 40,
    label: "Org Admin",
  },
  {
    id: 50,
    label: "Org Owner",
  },
];

export enum AccountRole {
  User = 1,
  OrgAdmin = 40,
  OrgOwner = 50,
}
