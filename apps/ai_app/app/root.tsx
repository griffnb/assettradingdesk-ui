import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useNavigate,
} from "react-router";

import { SessionService } from "@/common_lib/services/SessionService";
import { ThemeProvider } from "@/ui/ai/theme-provider";
import { Skeleton } from "@/ui/ai/ui/skeleton";
import { InAppLayout } from "@/ui/customer/layout/InAppLayout";
import { getPublicEnvVar } from "@/utils/env";
import { ClerkProvider, useAuth, useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import type { Route } from "../.react-router/types/app/+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="https://cdn.platform.openai.com/deployments/chatkit/chatkit.js" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  // Import your Publishable Key
  const PUBLISHABLE_KEY = getPublicEnvVar("PUBLIC_CLERK_PUBLISHABLE_KEY");

  if (!PUBLISHABLE_KEY) {
    throw new Error("Add your Clerk Publishable Key to the .env file");
  }
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <ThemeProvider>
        <Auth />
      </ThemeProvider>
    </ClerkProvider>
  );
}

function Auth() {
  const { getToken } = useAuth();
  const { isSignedIn, isLoaded } = useUser();
  let navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    SessionService.tokenFetch = getToken;
  }, [getToken]);

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  if (!isLoaded && !isAuthPage) {
    return <Skeleton />;
  }

  if (!isSignedIn && !isAuthPage) {
    navigate("/login");
    return null;
  }

  if (isAuthPage) {
    // no app shell, just render outlet
    return <Outlet />;
  }

  return (
    <InAppLayout>
      <Outlet />
    </InAppLayout>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}

export function HydrateFallback() {
  return <Skeleton />;
}
