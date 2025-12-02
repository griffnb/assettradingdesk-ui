import type { PagesFunction } from "@cloudflare/workers-types";
import { createPagesFunctionHandler } from "@react-router/cloudflare";

// @ts-ignore - build output is in parent directory at runtime
import * as build from "../build/server";

export const onRequest: PagesFunction = createPagesFunctionHandler({
  build,
  getLoadContext(context) {
    return {
      cloudflare: {
        env: context.env,
      },
    };
  },
});
