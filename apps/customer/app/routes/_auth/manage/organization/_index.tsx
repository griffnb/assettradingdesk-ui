import { useAccount } from "@/common_lib/authentication/useAccount";
import { OrganizationModel } from "@/models/models/organization/model/OrganizationModel";
import { Store } from "@/models/store/Store";
import { LoadingSkeleton } from "@/ui/common/components/loading/LoadingSkeleton";
import { OrganizationManagement } from "@/ui/customer/settings/OrganizationManagement";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

export default observer(function OrganizationPage() {
  const { account } = useAccount();
  const [organization, setOrganization] = useState<OrganizationModel | null>(
    null,
  );

  useEffect(() => {
    if (account?.organization_id) {
      Store.organization.get(account.organization_id).then((resp) => {
        if (resp.success && resp.data) {
          setOrganization(resp.data);
        }
      });
    }
  }, [account?.organization_id]);

  if (!organization) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="p-6">
      <OrganizationManagement record={organization} />
    </div>
  );
});
