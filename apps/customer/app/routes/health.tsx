import { Route } from "../+types/root";

export async function loader() {
  return {
    processEnv: process.env,
    metaEnv: import.meta.env,
  };
}
export default function Page({ loaderData }: Route.ComponentProps) {
  console.log("Client", import.meta.env);
  console.log("Server", loaderData);
  return <>1</>;
}
