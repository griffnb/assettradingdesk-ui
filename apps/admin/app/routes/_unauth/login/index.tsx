import { SignIn } from "@clerk/clerk-react";

export default function Login() {
  console.log("Rendering login");
  return (
    <>
      <SignIn />
    </>
  );
}
