import { Button } from "@/ui/shadcn/ui/button";
import { cn } from "@/utils/cn";
import { observer } from "mobx-react-lite";

export interface ProductActionsProps {
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  primaryLabel?: string;
  secondaryLabel?: string;
  className?: string;
}

export const ProductActions = observer(function ProductActions({
  onPrimaryAction,
  onSecondaryAction,
  primaryLabel = "Contact Seller",
  secondaryLabel = "Request Quote",
  className,
}: ProductActionsProps) {
  return (
    <div className={cn("flex w-full items-end gap-5", className)}>
      <Button
        onClick={onPrimaryAction}
        className="h-10 flex-1 bg-gray-800 text-white hover:bg-gray-700"
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
  );
});
