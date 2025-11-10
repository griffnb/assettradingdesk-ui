import { VerifyEmailSent } from "@/ui/customer/onboarding/VerifyEmailSent";
import { observer } from "mobx-react-lite";
export default observer(function VerifySent() {
  return (
    <div className="flex min-h-dvh flex-col items-center bg-[url('/img/hero.png')] bg-cover p-5">
      <VerifyEmailSent />
    </div>
  );
});
