import { Status } from "@/models/types/constants";

export const status: Status[] = [
  {
    id: 100,
    label: "Active",
    class: "fa fa-circle-play text-green-500",
  },
  {
    id: 200,
    label: "Disabled",
    class: "fa fa-circle-pause text-yellow-500",
  },
  {
    id: 201,
    label: "Sold",
    class: "fa fa-circle-check text-blue-500",
  },
  {
    id: 300,
    label: "Deleted",
    class: "fa fa-circle-minus text-error-500",
  },
];
