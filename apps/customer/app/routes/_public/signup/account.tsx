import { Store } from "@/models/store/Store";
import { NewAccount } from "@/ui/customer/onboarding";
import { useNavigate } from "react-router";

export default function SignupAccount() {
  const navigate = useNavigate();
  const account = Store.account.create();

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-[url('/img/hero.png')] bg-cover p-5">
      <NewAccount
        record={account}
        onSuccess={() => navigate("/signup/organization")}
        onCancel={() => navigate("/login")}
      />
    </div>
  );
}
