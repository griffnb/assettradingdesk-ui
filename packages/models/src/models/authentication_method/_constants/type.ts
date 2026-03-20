import { IConstant } from "@/models/types/constants";

export const type: IConstant[] = [
  {
    id: 1,
    label: "Password",
  },
  {
    id: 2,
    label: "Email OTP",
  },
  {
    id: 3,
    label: "SMS OTP",
  },
  {
    id: 4,
    label: "Passkey",
  },
  {
    id: 5,
    label: "2FA Key",
  },
  {
    id: 6,
    label: "2FA Phone",
  },
  {
    id: 7,
    label: "2FA Email",
  },
  {
    id: 8,
    label: "OAuth",
  },
  {
    id: 9,
    label: "Magic Link",
  },
];

export const AuthenticationType = {
  PASSWORD: 1,
  EMAIL_OTP: 2,
  SMS_OTP: 3,
  PASSKEY: 4,
  TWO_FA_KEY: 5,
  TWO_FA_PHONE: 6,
  TWO_FA_EMAIL: 7,
  OAUTH: 8,
  MAGIC_LINK: 9,
} as const;

export type AuthenticationType =
  (typeof AuthenticationType)[keyof typeof AuthenticationType];
