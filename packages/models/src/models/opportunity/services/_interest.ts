import {
  IJSONAPIType,
  ServerService,
} from "@/common_lib/services/ServerService";

// @link {go}/internal/controllers/opportunities/auth_actions.go:37
export function notInterested(
  opportunityID: string,
): Promise<IJSONAPIType<boolean>> {
  return ServerService.callPut(
    "opportunity",
    `${opportunityID}/not-interested`,
    {},
  );
}

// @link {go}/internal/controllers/opportunities/auth_actions.go:15
export function interested(
  opportunityID: string,
): Promise<IJSONAPIType<boolean>> {
  return ServerService.callPut("opportunity", `${opportunityID}/interesed`, {});
}
