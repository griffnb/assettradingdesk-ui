import { LayerService } from "@/common_lib/services/LayerService";
import { NotificationService } from "@/common_lib/services/NotificationService";
import { AccountModel } from "@/models/models/account/model/AccountModel";
import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { MessageService } from "@/models/models/message/services/MessageService";
import { SidePanelWrap } from "@/ui/common/components/side-panel/SidePanelWrap";
import { Button } from "@/ui/shadcn/ui/button";
import { Textarea } from "@/ui/shadcn/ui/textarea";
import { cn } from "@/utils/cn";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { AssetSearchInput } from "./AssetSearchInput";

export interface NewMessagePanelProps {
  account: AccountModel;
  onSuccess?: (opportunityId: string) => void;
}

export const NewMessagePanel = observer(function NewMessagePanel(
  props: NewMessagePanelProps,
) {
  const { onSuccess } = props;

  const [selectedAsset, setSelectedAsset] = useState<AssetModel | null>(null);
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async () => {
    if (!selectedAsset || !body.trim() || sending) {
      return;
    }

    setSending(true);
    try {
      const response = await MessageService.createNewThread({
        body: body.trim(),
        asset_id: selectedAsset.id as string,
      });

      if (response.success && response.data?.opportunity_id) {
        onSuccess?.(response.data.opportunity_id);
        LayerService.remove("NewMessagePanel");
      } else {
        NotificationService.addError(
          response.error || "Failed to send message",
        );
      }
    } catch {
      NotificationService.addError("Failed to send message");
    } finally {
      setSending(false);
    }
  };

  const canSubmit = selectedAsset && body.trim() && !sending;

  return (
    <SidePanelWrap
      size="lg"
      id="NewMessagePanel"
      title="Start Conversation"
      closeHandler={() => LayerService.remove("NewMessagePanel")}
    >
      <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-6">
        <AssetSearchInput
          onSelect={setSelectedAsset}
          selectedAsset={selectedAsset}
        />

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-neutral-700">
            Your Message
          </label>
          <Textarea
            placeholder="Type your message here..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="min-h-[200px] resize-none"
            disabled={sending}
          />
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-neutral-200 pt-4">
          <Button
            variant="outline"
            onClick={() => LayerService.remove("NewMessagePanel")}
            disabled={sending}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={cn({
              "cursor-not-allowed opacity-50": !canSubmit,
            })}
          >
            {sending ? (
              <>
                <i className="fa fa-spinner fa-spin mr-2" />
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </Button>
        </div>
      </div>
    </SidePanelWrap>
  );
});
