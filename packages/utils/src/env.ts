type Env = {
  PUBLIC_API_URL: string;
  PUBLIC_SESSION_KEY: string;
  PUBLIC_API_HOST: string;
  PUBLIC_SAGE_API_URL: string;
  PUBLIC_SAGE_ADMIN_URL: string;
  PUBLIC_SOCKET_HOST: string;
  PUBLIC_ENVIRONMENT: "development" | "staging" | "production";
  PUBLIC_GLOBAL_NOTIFICATION_SERVICE_ON: string;
  PUBLIC_NAMESPACE: string;
  PUBLIC_OAUTH_CLIENT_ID?: string;
  PUBLIC_OAUTH_DOMAIN?: string;
  PUBLIC_TURNSTILE_KEY?: string;
  PUBLIC_RESIZE_ORIGIN?: string;
  PUBLIC_DECRYPT_KEY?: string;
  PUBLIC_STRIPE_PUBLISHABLE_KEY: string;
  PUBLIC_SCAN?: string;
  PUBLIC_CLERK_PUBLISHABLE_KEY?: string;
  PUBLIC_CUSTOMER_URL?: string;
};

const env: Env = {
  PUBLIC_API_URL: import.meta.env.VITE_PUBLIC_API_URL!,

  PUBLIC_SESSION_KEY: import.meta.env.VITE_PUBLIC_SESSION_KEY!, // Use non-null assertion since these are expected to be set

  PUBLIC_API_HOST: import.meta.env.VITE_PUBLIC_API_HOST!,

  PUBLIC_SAGE_API_URL: import.meta.env.VITE_PUBLIC_SAGE_API_URL!,

  PUBLIC_SAGE_ADMIN_URL: import.meta.env.VITE_PUBLIC_SAGE_ADMIN_URL!,

  PUBLIC_ENVIRONMENT: import.meta.env.VITE_PUBLIC_ENVIRONMENT!,

  PUBLIC_SOCKET_HOST: import.meta.env.VITE_PUBLIC_SOCKET_HOST!,

  PUBLIC_GLOBAL_NOTIFICATION_SERVICE_ON:
    import.meta.env.VITE_PUBLIC_GLOBAL_NOTIFICATION_SERVICE_ON || "false",

  PUBLIC_NAMESPACE: import.meta.env.VITE_PUBLIC_NAMESPACE || "",

  PUBLIC_OAUTH_CLIENT_ID: import.meta.env.VITE_PUBLIC_OAUTH_CLIENT_ID,

  PUBLIC_OAUTH_DOMAIN: import.meta.env.VITE_PUBLIC_OAUTH_DOMAIN,

  PUBLIC_TURNSTILE_KEY: import.meta.env.VITE_PUBLIC_TURNSTILE_KEY,

  PUBLIC_RESIZE_ORIGIN: import.meta.env.VITE_PUBLIC_RESIZE_ORIGIN,

  PUBLIC_DECRYPT_KEY: import.meta.env.VITE_PUBLIC_DECRYPT_KEY,

  PUBLIC_STRIPE_PUBLISHABLE_KEY:
    import.meta.env.VITE_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
  PUBLIC_CLERK_PUBLISHABLE_KEY:
    import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "",
  PUBLIC_SCAN: import.meta.env.VITE_PUBLIC_SCAN,

  PUBLIC_CUSTOMER_URL: import.meta.env.VITE_PUBLIC_CUSTOMER_URL,
};

export function getPublicEnvVar(key: keyof Env): string {
  const value = env[key];
  if (value === undefined) {
    throw new Error(`Environment variable ${key} is not set.`);
  }
  return value;
}

export function getEnv(): Env {
  return env;
}
