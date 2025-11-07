import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { Button } from "@/ui/shadcn/ui/button";
import { cn } from "@/utils/cn";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { MessageInquiryDialog } from "./MessageInquiryDialog";

export interface ProductActionsProps {
  asset: AssetModel;
  isAuthenticated: boolean;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  primaryLabel?: string;
  secondaryLabel?: string;
  className?: string;
}

export const ProductActions = observer(function ProductActions({
  asset,
  isAuthenticated,
  onPrimaryAction,
  onSecondaryAction,
  primaryLabel = "Contact Seller",
  secondaryLabel = "Request Quote",
  className,
}: ProductActionsProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handlePrimaryClick = () => {
    if (isAuthenticated) {
      setDialogOpen(true);
    } else if (onPrimaryAction) {
      onPrimaryAction();
    }
  };

  return (
    <>
      <div className={cn("flex w-full items-end gap-5", className)}>
        <Button
          onClick={handlePrimaryClick}
          className="h-10 flex-1 bg-primary text-white hover:bg-primary/90"
        >
          {primaryLabel}
        </Button>
        <Button
          onClick={onSecondaryAction}
          variant="outline"
          className="h-10 flex-1 border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
        >
          {secondaryLabel}
        </Button>
      </div>

      {isAuthenticated && (
        <MessageInquiryDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          asset={asset}
        />
      )}
    </>
  );
});
