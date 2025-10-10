import { IConstant } from "@/models/types/constants";

export const role: IConstant[] = [
  {
    id: 1,
    label: "Family Member",
  },
  {
    id: 5,
    label: "Family Admin",
  },
  {
    id: 10,
    label: "Family Owner",
  },
];

export enum AccountRole {
  FamilyMember = 1,
  FamilyAdmin = 5,
  FamilyOwner = 10,
}
