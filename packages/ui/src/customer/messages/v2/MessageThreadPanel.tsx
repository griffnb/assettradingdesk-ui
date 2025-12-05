import { AccountModel } from "@/models/models/account/model/AccountModel";
import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { MessageModel } from "@/models/models/message/model/MessageModel";
import { OpportunityModel } from "@/models/models/opportunity/model/OpportunityModel";
// Removed unused MessageService import
import { Store } from "@/models/store/Store";
// Removed unused cn import
import { observer } from "mobx-react-lite";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { MessageBubble } from "./MessageBubble";
import { ReplyBox } from "./ReplyBox";
import { formatPrice } from "./utils";

export interface MessageThreadPanelProps {
  opportunityId: string | null;
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
  opportunityId,
  account,
  reloadList,
}: MessageThreadPanelProps) {
  const [messages, setMessages] = useState<MessageModel[]>([]);
  const [, setOpportunity] = useState<OpportunityModel | null>(null);
  const [asset, setAsset] = useState<AssetModel | null>(null);
  const [otherPartyName, setOtherPartyName] = useState<string>("");

  useEffect(() => {
    if (!opportunityId) {
      setMessages([]);
      setOpportunity(null);
      setAsset(null);
      setOtherPartyName("");
      return;
    }
    loadMockThread();
  }, [opportunityId]);

  const loadMockThread = () => {
    // Create mock asset
    const mockAsset = Store.asset.create({
      id: "mock-asset-1",
      label: "Classic 1967 Ford Mustang GT",
      year: 1967,
      price: 85000,
      thumbnail: "https://example.com/mustang-thumbnail.jpg",
      location: "California, USA"
    });

    // Create mock opportunity
    const mockOpportunity = Store.opportunity.create({
      id: "mock-opp-1",
      asset_id: mockAsset.id,
      buyer_account_id: "buyer-account-1",
      seller_account_id: "seller-account-1",
      buyer_client_name: "John Smith",
      seller_client_name: "Classic Car Dealers Inc."
    });

    // Create mock messages
    const mockMessages = [
      Store.message.create({
        id: "msg-1",
        from_account_id: "buyer-account-1",
        to_account_id: "seller-account-1",
        body: "Hi, I'm interested in the 1967 Ford Mustang. Could you tell me more about its condition?",
        created_at: dayjs("2023-11-15T10:30:00Z"),
        opportunity_id: mockOpportunity.id,
        is_read: 1
      }),
      Store.message.create({
        id: "msg-2",
        from_account_id: "seller-account-1",
        to_account_id: "buyer-account-1",
        body: "Great choice! The Mustang is in excellent condition. Original paint, fully restored engine, only 50,000 miles.",
        created_at: dayjs("2023-11-15T11:15:00Z"),
        opportunity_id: mockOpportunity.id,
        is_read: 1
      }),
      Store.message.create({
        id: "msg-3",
        from_account_id: "buyer-account-1",
        to_account_id: "seller-account-1",
        body: "Would you be open to a pre-purchase inspection?",
        created_at: dayjs("2023-11-15T12:00:00Z"),
        opportunity_id: mockOpportunity.id,
        is_read: 1
      }),
      Store.message.create({
        id: "msg-4",
        from_account_id: "seller-account-1",
        to_account_id: "buyer-account-1",
        body: "Absolutely! We're happy to arrange an independent inspection at your convenience.",
        created_at: dayjs("2023-11-15T12:45:00Z"),
        opportunity_id: mockOpportunity.id,
        is_read: 1
      }),
      Store.message.create({
        id: "msg-5",
        from_account_id: "buyer-account-1",
        to_account_id: "seller-account-1",
        body: "Great! I'll have my mechanic contact you to schedule.",
        created_at: dayjs("2023-11-15T13:30:00Z"),
        opportunity_id: mockOpportunity.id,
        is_read: 1
      }),
      Store.message.create({
        id: "msg-6",
        from_account_id: "seller-account-1",
        to_account_id: "buyer-account-1",
        body: "Looking forward to finalizing this sale!",
        created_at: dayjs("2023-11-15T14:00:00Z"),
        opportunity_id: mockOpportunity.id,
        is_read: 1
      })
    ];

    // Set the mock states
    setAsset(mockAsset);
    setOpportunity(mockOpportunity);
    setMessages(mockMessages);

    // Determine other party name based on account type
    const isSeller = account.organization_id != null;
    setOtherPartyName(
      isSeller
        ? (mockOpportunity.buyer_client_name || mockOpportunity.buyer_account_id || "Buyer")
        : (mockOpportunity.seller_client_name || mockOpportunity.seller_account_id || "Seller")
    );
  };

  const handleReply = async (body: string) => {
    if (!opportunityId || messages.length === 0) return;

    const isSeller = account.organization_id != null;
    const lastMessage = messages[messages.length - 1];

    if (!lastMessage) {
      console.error("No last message to reply to");
      return;
    }

    try {
      const newMessage = Store.message.create({
        body,
        from_account_id: account.id,
        to_account_id: isSeller
          ? lastMessage.from_account_id
          : lastMessage.to_account_id,
        opportunity_id: opportunityId,
        created_at: dayjs(), // Use current time
        is_read: 0
      });

      // Directly update the messages list
      setMessages(prevMessages => [...prevMessages, newMessage]);
      reloadList?.();
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  if (!opportunityId || messages.length === 0) {
    return (
      <div className="mx-auto flex size-full flex-row place-items-center overflow-y-auto overflow-x-hidden">
        <span className="mx-auto font-semibold uppercase text-text-neutral-quinary-disabled">
          No Message Selected
        </span>
      </div>
    );
  }

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
      <ReplyBox onSubmit={handleReply} placeholder="Type your reply..." />
    </div>
  );
});
