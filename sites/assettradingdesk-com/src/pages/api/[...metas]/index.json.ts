import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params, request }) => {
  return new Response(JSON.stringify({}), {
    headers: { "Content-Type": "application/json" },
  });
};
