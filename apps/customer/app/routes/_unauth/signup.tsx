import { SignUp } from "@clerk/clerk-react";

export default function Login() {
  return (
    <>
      <SignUp signInUrl="/login" />
    </>
  );
}
