import { Status } from "@/models/types/constants";

export const status: Status[] = [
  {
    id: 1,
    label: "Pending Invite",
    class: "fa fa-envelope text-warning-500",
    short: "Pending",
    icon: "fa fa-envelope",
  },

  {
    id: 2,
    label: "Pending - Email Verification",
    class: "fa fa-envelope-circle-check text-warning-500",
    short: "Pending",
    icon: "fa fa-envelope-circle-check",
  },
  {
    id: 3,
    label: "Pending - Onboard",
    class: "fa fa-house-medical-circle-exclamation text-warning-400",
    short: "Pending",
    icon: "fa fa-house-medical-circle-exclamation",
  },

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
    id: 201,
    label: "User Disabled",
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
  PendingInvite = 1,
  PendingEmailVerification = 2,
  PendingOnboard = 3,
  Active = 100,
  Disabled = 200,
  UserDisabled = 201,
  Rejected = 202,
  Deleted = 300,
}
