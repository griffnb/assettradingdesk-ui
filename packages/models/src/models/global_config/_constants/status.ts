import { Status } from "@/models/types/constants";

export const status: Status[] = [
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
