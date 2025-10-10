import { Route } from "./+types";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home Page" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader() {
  return {
    message: "This message came from the server!",
  };
}

export default function RootIndex({ loaderData }: Route.ComponentProps) {
  /*
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }
    */
  return <div>Im the root index here? {loaderData.message}</div>;
}
