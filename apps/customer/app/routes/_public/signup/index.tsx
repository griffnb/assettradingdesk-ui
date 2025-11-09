import { SignupForm } from "@/ui/customer/onboarding/SignupForm";

export default function SignupAccount() {
  return (
    <div className="flex min-h-dvh flex-col items-center bg-[url('/img/hero.png')] bg-cover p-5">
      <SignupForm />
    </div>
  );
}
