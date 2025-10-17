import { SignIn } from "@clerk/clerk-react";

export default function Login() {
  return (
    <div className="flex h-dvh flex-col items-center justify-center bg-[url('/img/hero.png')] bg-cover p-5">
      <SignIn signUpUrl="/signup" />
    </div>
  );
}
