import { IConstant } from "@/models/types/constants";

export const billing_provider: IConstant[] = [
  {
    id: 1,
    label: "Stripe",
  },
];

export enum BillingProvider {
  Stripe = 1,
}
