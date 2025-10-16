import { SignUp } from "@clerk/clerk-react";

export default function Signup() {
  return (
    <div className="flex flex-col items-center justify-center">
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
