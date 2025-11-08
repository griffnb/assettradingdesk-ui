import { useAdmin } from "@/common_lib/authentication/useAdmin";
import { Button } from "@/ui/shadcn/ui/button";
import { Skeleton } from "@/ui/shadcn/ui/skeleton";
import { SignIn, SignOutButton, useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

export default function Login() {
  const { admin, adminLoading } = useAdmin({ checkOnly: true });
  const { isLoaded, isSignedIn } = useAuth();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (isLoaded && !adminLoading) {
      if (isSignedIn && admin) {
        window.location.href = "/";
      } else {
        setReady(true);
      }
    }
  }, [isLoaded, isSignedIn, adminLoading, admin]);

  if (!ready) {
    return <Skeleton />;
  }

  if (isSignedIn && !admin) {
    return (
      <div className="flex h-dvh flex-col items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold">Access Denied</h2>
          <p className="mb-4">
            You do not have the necessary permissions to access this
            application.
          </p>
          <Button className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            <SignOutButton redirectUrl="/login" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-dvh flex-col items-center justify-center">
      <SignIn />
    </div>
  );
}
