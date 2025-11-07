import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { MessageService } from "@/models/models/message/services/MessageService";
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

export interface MessageInquiryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  asset: AssetModel;
}

export const MessageInquiryDialog = observer(function MessageInquiryDialog({
  open,
  onOpenChange,
  asset,
}: MessageInquiryDialogProps) {
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

    try {
      const response = await MessageService.createBuyerMessage({
        body: message,
        asset_id: asset.id || undefined,
      });

      if (response.success) {
        setMessage("");
        onOpenChange(false);
      } else {
        setError(response.error || "Failed to send message");
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
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
          <DialogTitle>Send Message About This Asset</DialogTitle>
          <DialogDescription>
            Ask the seller a question about {asset.model_name || "this asset"}
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
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});
