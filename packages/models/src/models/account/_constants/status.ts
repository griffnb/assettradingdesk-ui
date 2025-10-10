import { Status } from "@/models/types/constants";

export const status: Status[] = [
  {
    id: 100,
    label: "Active",
    class: "fa  fa-person-circle-check text-success-500",
    icon: "fa fa-person-circle-check",
  },

  {
    id: 200,
    label: "Disabled",
    class: "fa fa-circle-stop text-error-500",
    icon: "fa fa-circle-stop",
  },

  {
    id: 300,
    label: "Deleted",
    class: "fa fa-cancel text-error-500",
    icon: "fa fa-cancel",
  },
];

export enum AccountStatus {
  Active = 100,

  Disabled = 200,

  Deleted = 300,
}
