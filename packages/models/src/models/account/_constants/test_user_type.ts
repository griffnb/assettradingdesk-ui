import { IConstant } from "@/models/types/constants";

export const test_user_type: IConstant[] = [
  {
    id: 1,
    label: "Rule Testing",
  },
  {
    id: 2,
    label: "Generated",
  },
];

export enum TestUserType {
  RuleTesting = 1,
  Generated = 2,
}
