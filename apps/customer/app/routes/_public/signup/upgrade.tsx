import { NewUpgrade } from "@/ui/customer/onboarding";
import { useNavigate } from "react-router";

export default function SignupUpgrade() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-[url('/img/hero.png')] bg-cover p-5">
      <NewUpgrade
        onSelectFree={() => navigate("/signup/requests")}
        onSelectSeller={() => navigate("/signup/assets")}
      />
    </div>
  );
}
