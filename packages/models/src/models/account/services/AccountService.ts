import { setPassword } from "./_password";
import { checkExisting, signup } from "./_signup";
import { createTestUser } from "./_test_user";
import {
  resendVerification,
  updateVerifyEmail,
  verifyAccount,
  verifyInvite,
} from "./_verify";

export const AccountService = {
  createTestUser,
  signup,
  checkExisting,
  verifyAccount,
  verifyInvite,
  setPassword,
  resendVerification,
  updateVerifyEmail,
};
