import { SignUp } from "@clerk/clerk-react";

export default function Signup() {
  return (
    <div className="flex h-dvh flex-col items-center justify-center bg-[url('/img/hero.png')] bg-cover p-5">
      <SignUp
        signInUrl="/login"
        oauthFlow="popup"
        appearance={{
          layout: {
            logoPlacement: "none",
          },
        }}
      />
    </div>
  );
}
