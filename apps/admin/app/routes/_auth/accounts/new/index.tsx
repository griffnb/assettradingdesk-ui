
import { AccountNew } from "@/admin/pods/account/pages/AccountNew";
import { useAuth } from "@clerk/clerk-react";
import { observer } from "mobx-react-lite";


export default observer(() => {
  const { isLoaded, isSignedIn } = useAuth();
  if (isLoaded) {
    return null
  }

  if (!isSignedIn) {
    return null;
  }


  return <AccountNew />;
});
