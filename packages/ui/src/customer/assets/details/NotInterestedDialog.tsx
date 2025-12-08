import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { Button } from "@/ui/shadcn/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/ui/shadcn/ui/dialog";
import { Textarea } from "@/ui/shadcn/ui/textarea";
import { observer } from "mobx-react-lite";
import { useState } from "react";

export interface NotInterestedDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  asset: AssetModel;
}

export const NotInterestedDialog = observer(function NotInterestedDialog({
  open,
  onOpenChange,
  asset,
}: NotInterestedDialogProps) {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!message.trim()) {
      setError("Please enter a message");
      return;
    }

    setIsSubmitting(true);
    setError(null);
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setMessage("");
      setError(null);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Help us refine your results</DialogTitle>
          <DialogDescription>
            What makes this {asset.model_name || "this asset"} not a good fit
            for you?
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <Textarea
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[150px]"
            disabled={isSubmitting}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting || !message.trim()}
          >
            {isSubmitting ? "Sending..." : "Send Feedback"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});
