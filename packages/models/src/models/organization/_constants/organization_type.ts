import { IConstant } from "@/models/types/constants";

// @link {go}/internal/models/organization/organization_type.go:3
export const organization_type: IConstant[] = [
  {
    id: 1,
    label: "End User",
    helpText: "You use your own assets.",
  },
  {
    id: 2,
    label: "Refurbisher",
    helpText: "You refurbish and resell assets.",
  },
  {
    id: 3,
    label: "Broker",
    helpText: "You facilitate transactions between buyers and sellers",
  },
];

export enum OrganizationType {
  EndUser = 1,
  Refurbisher = 2,
  Broker = 3,
}
