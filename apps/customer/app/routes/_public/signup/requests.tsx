import { Store } from "@/models/store/Store";
import { NewRequests } from "@/ui/customer/onboarding";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";
export default observer(function SignupRequests() {
  const navigate = useNavigate();
  const request = Store.request.create();

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-[url('/img/hero.png')] bg-cover p-5">
      <NewRequests
        record={request}
        onSuccess={() => navigate("/dashboard")}
        onCancel={() => navigate("/signup/upgrade")}
      />
    </div>
  );
});
