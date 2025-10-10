import { Settings } from "@/models/models/sage_product/SageProductBaseModel";
import { sha256Hex } from "@/utils/strings";
import type { APIRoute } from "astro";
import PageLoader from "../../../helpers/PageLoader";

export const GET: APIRoute = async ({ params, request }) => {
  // API endpoint

  const metaParts = params.metas?.split("/") || [];

  const url = new URL(request.url);
  const hashedKey = await sha256Hex(`SAGE_KEY:${metaParts[0]}`);
  if (url.searchParams.get("key") != hashedKey) {
    const resp = new Response("Invalid Key", { status: 400 });
    return resp;
  }

  const props = {};

  const settings = new Settings();
  await PageLoader(metaParts[0], "", {}, settings, props);

  return new Response(JSON.stringify(props), {
    headers: { "Content-Type": "application/json" },
  });
};
