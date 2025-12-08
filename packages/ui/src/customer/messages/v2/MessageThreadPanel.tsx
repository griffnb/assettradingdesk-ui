import { AccountModel } from "@/models/models/account/model/AccountModel";
import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { MessageModel } from "@/models/models/message/model/MessageModel";
// Removed unused MessageService import
// Removed unused cn import
import { MessageService } from "@/models/models/message/services/MessageService";
import { Store } from "@/models/store/Store";
import { StoreResponse } from "@/models/types/store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { MessageBubble } from "./MessageBubble";
import { ReplyBox } from "./ReplyBox";
import { formatPrice } from "./utils";

export interface MessageThreadPanelProps {
  threadId: string | null | undefined;
  assetId?: string | null;
  account: AccountModel;
  reloadList?: () => void;
}

export const MessageThreadPanelID = "MessageThreadPanel";

/**
 * Displays all messages in an opportunity conversation with ability to reply
 * Shows asset context header, message list, and reply box
 *
 * @example
 * <MessageThreadPanel
 *   opportunityId={opportunityId}
 *   account={accountModel}
 *   reloadList={handleReload}
 *   clearActiveThread={handleClear}
 * />
 */
export const MessageThreadPanel = observer(function MessageThreadPanel({
  threadId,
  assetId,
  account,
  reloadList,
}: MessageThreadPanelProps) {
  const [messages, setMessages] = useState<MessageModel[]>([]);
  const [asset, setAsset] = useState<AssetModel | null>(null);
  const [otherPartyName, setOtherPartyName] = useState<string>("");

  useEffect(() => {
    if (!threadId && !assetId) {
      setMessages([]);
      setAsset(null);
      return;
    }
    loadThread();
  }, [threadId, assetId]);

  const loadThread = async () => {
    let resp: StoreResponse<MessageModel[]>;
    if (threadId) {
      resp = await MessageService.getThread(threadId);
    } else {
      resp = await MessageService.getThreadByAsset(assetId as string);
    }
    if (resp.success && resp.data) {
      setMessages(resp.data);

      // Determine other party name
      const otherMessage = resp.data.find(
        (msg) => msg.from_account_id !== account.id,
      );
      if (otherMessage) {
        setOtherPartyName(otherMessage.from_account_name);
      }

      if (!asset) {
        const assetID = resp.data[0]?.asset_id;
        if (assetID) {
          const assetResp = await Store.asset.get(assetID);
          if (assetResp.success && assetResp.data) {
            setAsset(assetResp.data);
          }
        }
      }
    }
  };

  const handleReply = async (body: string) => {
    console.log(`ThreadId: ${threadId}, AssetId: ${assetId}`, body);

    if (!threadId && assetId) {
      try {
        await MessageService.createNewThread({ body, asset_id: assetId });

        loadThread();

        if (reloadList) {
          reloadList();
        }
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    } else if (threadId) {
      const lastMessage = messages[messages.length - 1];

      if (!lastMessage) {
        console.error("No last message to reply to");
        return;
      }

      try {
        await MessageService.createReply({ body, thread_id: threadId });

        loadThread();

        if (reloadList) {
          reloadList();
        }
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }
  };

  return (
    <div className="flex flex-1 flex-col items-center self-stretch overflow-hidden">
      {/* Asset context header */}
      {asset && (
        <div className="flex w-full flex-col border-b border-border-neutral-primary bg-bg-neutral-secondary p-4">
          <div className="flex items-center gap-4">
            <img
              src={asset.thumbnail}
              alt={asset.label}
              className="size-16 rounded-lg object-cover"
            />
            <div className="flex flex-1 flex-col">
              <div className="text-lg font-semibold text-text-neutral-primary">
                {asset.label}
              </div>
              <div className="text-sm text-text-neutral-tertiary">
                {asset.year} • {formatPrice(asset.price)}
              </div>
              {asset.location && (
                <div className="text-sm text-text-neutral-tertiary">
                  {asset.location}
                </div>
              )}
            </div>
          </div>
          <div className="mt-2 text-sm font-medium text-text-neutral-secondary">
            Conversation with {otherPartyName}
          </div>
        </div>
      )}

      {/* Message list */}
      <div className="flex flex-1 flex-col items-center self-stretch overflow-scroll p-4">
        {messages.length === 0 ? (
          <div className="flex size-full items-center justify-center">
            <span className="text-text-neutral-quaternary">
              No messages yet
            </span>
          </div>
        ) : (
          messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              isOwnMessage={message.from_account_id === account.id}
              senderName={
                message.from_account_id === account.id ? "You" : otherPartyName
              }
            />
          ))
        )}
      </div>

      {/* Reply box at bottom */}
      <ReplyBox
        onSubmit={handleReply}
        placeholder={
          messages.length == 0 ? "Ask your questions...." : "Type your reply..."
        }
      />
    </div>
  );
});
