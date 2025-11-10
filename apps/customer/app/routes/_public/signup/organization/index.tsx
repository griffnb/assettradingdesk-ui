import { Store } from "@/models/store/Store";
import { NewOrganization } from "@/ui/customer/onboarding/NewOrganization";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";
export default observer(function SignupOrganization() {
  const navigate = useNavigate();
  const organization = Store.organization.create();

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-[url('/img/hero.png')] bg-cover p-5">
      <NewOrganization
        record={organization}
        onSuccess={() => navigate("/signup/upgrade")}
        onCancel={() => navigate("/signup/account")}
      />
    </div>
  );
});
