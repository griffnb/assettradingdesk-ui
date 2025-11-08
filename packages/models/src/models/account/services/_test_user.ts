import { ServerService } from "@/common_lib/services/ServerService";

export interface TestUserRequest {}
// @link {go}/internal/services/accounts/account_testing.go:CreateTestUser
export const createTestUser = (request: { login_as?: boolean }) => {
  return ServerService.callPost("account", "testUser", {
    login_as: request.login_as ? "true" : "",
  });
};
