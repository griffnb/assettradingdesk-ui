import { CompanyIndex } from "@/admin/pods/company/pages/CompanyIndex";
import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { observer } from "mobx-react-lite";

export const meta = () => {
  return [
    { title: "Admin: Companies" },
    {
      name: "description",
      content: "Companies",
    },
  ];
};

export default observer(() => {
  const { admin, adminLoading } = useAdmin();
  if (adminLoading || !admin) {
    return null;
  }

  return <CompanyIndex />;
});
