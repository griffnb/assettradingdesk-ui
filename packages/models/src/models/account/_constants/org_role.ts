import { IConstant } from "@/models/types/constants";

export const org_role: IConstant[] = [
  {
    id: 1,
    label: "Member",
  },
  {
    id: 20,
    label: "Local Admin",
  },
  {
    id: 40,
    label: "Union Admin",
  },
  {
    id: 60,
    label: "Full Admin",
  },
  {
    id: 100,
    label: "Owner",
  },
];

export enum OrgRole {
  Member = 1,
  LocalAdmin = 20,
  UnionAdmin = 40,
  FullAdmin = 60,
  Owner = 100,
}
