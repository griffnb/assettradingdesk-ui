import { IConstant } from "@/models/types/constants";

export const billing_cycle: IConstant[] = [
  {
    id: 1,
    label: "Monthly",
  },
  {
    id: 2,
    label: "Quarterly",
  },
  {
    id: 3,
    label: "Annually",
  },
];

export enum BillingCycle {
  Monthly = 1,
  Quarterly = 2,
  Annually = 3,
}
