export const GET = async ({ params, cookies, redirect }: any) => {
  const page = params.page;
  const paramsCookie = cookies.get("urlParams")?.value;

  const redirectURL = `https://secure.webclass.ai/${page}`;

  // Determine the target URL server-side
  let targetUrl = redirectURL;

  if (paramsCookie) {
    try {
      // Parse `urlParams` cookie JSON
      const queryParams = new URLSearchParams(
        JSON.parse(paramsCookie),
      ).toString();
      targetUrl = `${redirectURL}?${queryParams}`;
    } catch (error) {
      console.error("Failed to parse urlParams cookie:", error);
      // Fallback to default redirect URL
      targetUrl = redirectURL;
    }
  }

  console.log("targetUrl", targetUrl);
  return redirect(targetUrl, 302);
};
