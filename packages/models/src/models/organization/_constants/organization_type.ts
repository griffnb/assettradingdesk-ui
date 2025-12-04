import { IConstant } from "@/models/types/constants";

export const organization_type: IConstant[] = [
  {
    id: 1,
    label: "End User / Refurbisher",
    helpText: "You buy and sell your own assets.",
  },
  {
    id: 2,
    label: "Broker",
    helpText: "You facilitate transactions between buyers and sellers",
  },
];

export enum OrganizationType {
  EndUser = 1,
  Broker = 2,
}
