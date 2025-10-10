import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { Home } from "../../../pods/home/Home";

export default function RootIndex() {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }
  return <Home />;
}
