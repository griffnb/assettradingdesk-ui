import { IConstant } from "@/models/types/constants";

export const company_type: IConstant[] = [
  {
    id: 0,
    label: "Unknown",
    icon: "u u-help-circle",
    textColor: " text-text-neutral-tertiary",
  },
  {
    id: 1,
    label: "End User",
    icon: "u u-building-warehouse",
    textColor: " text-text-neutral-tertiary",
  },
  {
    id: 2,
    label: "Refurbisher",
    icon: "u u-recycle",
    textColor: " text-text-neutral-tertiary",
  },
  {
    id: 3,
    label: "Dealer - IC",
    icon: "u u-handshake",
    textColor: " text-text-neutral-tertiary",
  },
  {
    id: 4,
    label: "Dealer - Non IC",
    icon: "u u-handshake",
    textColor: " text-text-neutral-tertiary",
  },
];
