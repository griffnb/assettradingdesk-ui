import { useAccount } from "@/common_lib/authentication/useAccount";
import { OrganizationModel } from "@/models/models/organization/model/OrganizationModel";
import { Store } from "@/models/store/Store";
import { NewOrganization } from "@/ui/customer/onboarding/NewOrganization";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
export default observer(function SignupOrganization() {
  const navigate = useNavigate();
  const {account,accountLoading} = useAccount();
  const [organization, setOrganization] = useState<OrganizationModel | null>(null);

  useEffect(() => {
    if (account) {
      Store.organization.get(account.organization_id || "").then((resp) => {
        if(resp.success && resp.data){
          setOrganization(resp.data);
        }
      }
    );
    }
  }, [account]);


  if (accountLoading || !organization) {
    return null;
  }

  

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
