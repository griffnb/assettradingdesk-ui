/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PUBLIC_API_URL: string;
  readonly VITE_PUBLIC_SESSION_KEY: string;
  readonly VITE_PUBLIC_API_HOST: string;
  readonly VITE_PUBLIC_SAGE_API_URL: string;
  readonly VITE_PUBLIC_SAGE_ADMIN_URL: string;
  readonly VITE_PUBLIC_SOCKET_HOST: string;
  readonly VITE_PUBLIC_ENVIRONMENT: "development" | "staging" | "production";
  readonly VITE_PUBLIC_GLOBAL_NOTIFICATION_SERVICE_ON?: string;
  readonly VITE_PUBLIC_NAMESPACE?: string;
  readonly VITE_PUBLIC_OAUTH_CLIENT_ID?: string;
  readonly VITE_PUBLIC_OAUTH_DOMAIN?: string;
  readonly VITE_PUBLIC_TURNSTILE_KEY?: string;
  readonly VITE_PUBLIC_RESIZE_ORIGIN?: string;
  readonly VITE_PUBLIC_DECRYPT_KEY?: string;
  readonly VITE_PUBLIC_STRIPE_PUBLISHABLE_KEY?: string;
  readonly VITE_PUBLIC_SCAN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
