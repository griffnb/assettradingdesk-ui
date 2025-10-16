import { IConstant } from "@/models/types/constants";

export const install_status: IConstant[] = [
  {
    id: 0,
    label: "Unknown",
  },
  {
    id: 1,
    label: "Installed - Powered On",
  },
  {
    id: 2,
    label: "Installed - Powered Off",
  },
  {
    id: 3,
    label: "Uninstalled - Floor",
  },
  {
    id: 4,
    label: "Uninstalled - Warehouse",
  },
  {
    id: 5,
    label: "Uninstalled - Crated",
  },
];
