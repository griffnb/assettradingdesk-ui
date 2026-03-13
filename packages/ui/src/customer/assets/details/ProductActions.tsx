import { LayerService } from "@/common_lib/services/LayerService";
import { cn } from "@/common_lib/utils/cn";
import { AccountModel } from "@/models/models/account/model/AccountModel";
import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { Button } from "@/ui/shadcn/ui/button";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import {
  MessageSidePanel,
  MessageSidePanelID,
} from "../../messages/v2/MessageSidePanel";
import { NotInterestedDialog } from "./NotInterestedDialog";

export interface ProductActionsProps {
  asset: AssetModel;
  account: AccountModel | null;

  className?: string;
}

export const ProductActions = observer(function ProductActions({
  asset,
  account,
  className,
}: ProductActionsProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleContactClick = () => {
    if (account) {
      LayerService.addOnly({
        id: MessageSidePanelID,
        component: MessageSidePanel,
        props: {
          account: account,
          assetId: asset.id as string,
          closeAction: () => {},
          title: asset.label,
        },
      });
    }
  };
  const handleNotInterestedClick = () => {
    setDialogOpen(true);
  };

  return (
    <>
      <div className={cn("flex w-full items-end gap-5", className)}>
        <Button
          onClick={handleContactClick}
          className="h-10 flex-1 bg-primary text-white hover:bg-primary/90"
        >
          Contact Seller
        </Button>
        <Button
          onClick={handleNotInterestedClick}
          variant="outline"
          className="h-10 flex-1 border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
        >
          Not Interested
        </Button>
      </div>

      {account && (
        <NotInterestedDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          asset={asset}
        />
      )}
    </>
  );
});
