import { SignIn } from "@clerk/clerk-react";

export default function Login() {
  return (
    <div className="flex h-dvh flex-col items-center justify-center">
      <SignIn />
    </div>
  );
}
