import { IConstant } from "@/models/types/constants";

export const organization_type: IConstant[] = [
  {
    id: 1,
    label: "End User",
  },
  {
    id: 2,
    label: "Broker",
  },
];

export enum OrganizationType {
  EndUser = 1,
  Broker = 2,
}
