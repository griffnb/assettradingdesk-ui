import { IConstant } from "@/models/types/constants";

export const v1_migration_status: IConstant[] = [
  {
    id: 0,
    label: "Pending",
  },
  {
    id: 1,
    label: "Queued",
  },
  {
    id: 2,
    label: "Processing",
  },
  {
    id: 3,
    label: "Completed",
  },
  {
    id: 4,
    label: "Errored",
  },
];

export enum V1MigrationStatus {
  Pending = 0,
  Queued = 1,
  Processing = 2,
  Completed = 3,
  Errored = 4,
}
