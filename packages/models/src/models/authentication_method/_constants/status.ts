import { Status } from "@/models/types/constants";

export const status: Status[] = [
  {
    id: 1,
    label: "Pending",
    class: "fa fa-circle-clock text-yellow-500",
  },
  {
    id: 100,
    label: "Active",
    class: "fa fa-circle-play text-green-500",
  },
  {
    id: 200,
    label: "Archived",
    class: "fa fa-circle-pause text-yellow-500",
  },
  {
    id: 300,
    label: "Deleted",
    class: "fa fa-circle-minus text-error-500",
  },
];

export const AuthenticationMethodStatus = {
  PENDING: 1,
  ACTIVE: 100,
  ARCHIVED: 200,
  DELETED: 300,
} as const;

export type AuthenticationMethodStatus =
  (typeof AuthenticationMethodStatus)[keyof typeof AuthenticationMethodStatus];
