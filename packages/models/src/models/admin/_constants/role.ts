import { IConstant } from "@/models/types/constants";

export const role: IConstant[] = [
  {
    id: 80,
    label: "Read Only Admin",
  },
  {
    id: 85,
    label: "Broker Admin",
  },
  {
    id: 100,
    label: "System Admin",
  },
];

export enum AdminRole {
  ReadOnlyAdmin = 80,
  BrokerAdmin = 85,
  SystemAdmin = 100,
}
