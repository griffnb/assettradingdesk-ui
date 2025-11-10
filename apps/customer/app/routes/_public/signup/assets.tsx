import { Store } from "@/models/store/Store";
import { NewAssets } from "@/ui/customer/onboarding";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";

export default observer(function SignupAssets() {
  const navigate = useNavigate();
  const asset = Store.asset.create();

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-[url('/img/hero.png')] bg-cover p-5">
      <NewAssets
        record={asset}
        onSuccess={() => navigate("/dashboard")}
        onCancel={() => navigate("/signup/upgrade")}
      />
    </div>
  );
});
