import { getPublicEnvVar } from "@/utils/env";
import { Auth0Provider } from "@auth0/auth0-react";
import { Outlet } from "react-router";

export default function RootIndex() {
  const domain = getPublicEnvVar("PUBLIC_OAUTH_DOMAIN");
  const clientId = getPublicEnvVar("PUBLIC_OAUTH_CLIENT_ID");

  return (
    <Auth0Provider domain={domain} clientId={clientId} authorizationParams={{}}>
      <Outlet />;
    </Auth0Provider>
  );
}
