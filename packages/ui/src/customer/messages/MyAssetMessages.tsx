import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { MessageModel } from "@/models/models/message/model/MessageModel";
import { MessageService } from "@/models/models/message/services/MessageService";
import { Store } from "@/models/store/Store";
import { Button } from "@/ui/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/shadcn/ui/card";
import { Skeleton } from "@/ui/shadcn/ui/skeleton";
import { Textarea } from "@/ui/shadcn/ui/textarea";
import { cn } from "@/utils/cn";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { MailOpen, MessageSquare, Send } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

dayjs.extend(relativeTime);

export interface MyAssetMessagesProps {
  className?: string;
}

interface OpportunityThread {
  opportunityId: string;
  messages: MessageModel[];
  unreadCount: number;
}

interface AssetConversation {
  asset: AssetModel | null;
  assetId: string;
  threads: OpportunityThread[];
  totalUnread: number;
}

export const MyAssetMessages = observer(function MyAssetMessages({
  className,
}: MyAssetMessagesProps) {
  const [conversations, setConversations] = useState<AssetConversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAsset, setSelectedAsset] = useState<AssetConversation | null>(
    null,
  );
  const [selectedThread, setSelectedThread] =
    useState<OpportunityThread | null>(null);
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    setLoading(true);
    const response = await Store.message.query({});
    if (response.success && response.data) {
      const messages = response.data as MessageModel[];

      // Group by asset first, then by opportunity within each asset
      const assetMap = new Map<string, AssetConversation>();

      messages.forEach((msg) => {
        if (!msg.asset_id || !msg.opportunity_id) return;

        if (!assetMap.has(msg.asset_id)) {
          assetMap.set(msg.asset_id, {
            asset: null,
            assetId: msg.asset_id,
            threads: [],
            totalUnread: 0,
          });
        }

        const assetConv = assetMap.get(msg.asset_id)!;
        let thread = assetConv.threads.find(
          (t) => t.opportunityId === msg.opportunity_id,
        );

        if (!thread) {
          thread = {
            opportunityId: msg.opportunity_id,
            messages: [],
            unreadCount: 0,
          };
          assetConv.threads.push(thread);
        }

        thread.messages.push(msg);
        if (msg.is_read === 0) {
          thread.unreadCount++;
          assetConv.totalUnread++;
        }
      });

      // Load asset details for each
      const convArray = Array.from(assetMap.values());
      await Promise.all(
        convArray.map(async (conv) => {
          const assetResponse = await Store.asset.get(conv.assetId);
          if (assetResponse.success && assetResponse.data) {
            conv.asset = assetResponse.data;
          }
        }),
      );

      setConversations(convArray);
    }
    setLoading(false);
  };

  const handleReply = async () => {
    if (!selectedThread || !replyText.trim()) return;

    setSending(true);
    try {
      const firstMessage = selectedThread.messages[0];
      if (!firstMessage) return;

      const response = await MessageService.createSellerMessage({
        body: replyText,
        message_id: firstMessage.id || "",
      });

      if (response.success) {
        setReplyText("");
        loadMessages();
      }
    } catch (err) {
      console.error("Failed to send reply:", err);
    } finally {
      setSending(false);
    }
  };

  const markThreadAsRead = async (thread: OpportunityThread) => {
    const unreadMessages = thread.messages.filter((m) => m.is_read === 0);
    await Promise.all(
      unreadMessages.map(async (msg) => {
        msg.is_read = 1;
        await msg.save();
      }),
    );
  };

  const selectThread = (
    asset: AssetConversation,
    thread: OpportunityThread,
  ) => {
    setSelectedAsset(asset);
    setSelectedThread(thread);
    if (thread.unreadCount > 0) {
      markThreadAsRead(thread);
    }
  };

  if (loading) {
    return (
      <div className={cn("container mx-auto p-6", className)}>
        <Skeleton className="mb-4 h-8 w-64" />
        <div className="grid gap-4 md:grid-cols-3">
          <Skeleton className="h-96" />
          <Skeleton className="col-span-2 h-96" />
        </div>
      </div>
    );
  }

  return (
    <div className={cn("container mx-auto p-6", className)}>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Asset Messages</h1>
        <p className="text-gray-500">
          View and respond to inquiries about your listed assets
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {/* Asset List */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Your Assets ({conversations.length})</CardTitle>
            <CardDescription>
              Select an asset to view conversations
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {conversations.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <MailOpen className="mb-4 size-12 text-gray-400" />
                <p className="text-sm text-gray-500">No messages yet</p>
              </div>
            ) : (
              <div className="max-h-[600px] overflow-y-auto">
                {conversations.map((conv) => (
                  <button
                    key={conv.assetId}
                    onClick={() => {
                      setSelectedAsset(conv);
                      setSelectedThread(null);
                    }}
                    className={cn(
                      "w-full border-b p-4 text-left transition-colors hover:bg-gray-50",
                      selectedAsset?.assetId === conv.assetId && "bg-blue-50",
                    )}
                  >
                    <div className="flex gap-3">
                      {conv.asset?.mediumImage ? (
                        <img
                          src={conv.asset.mediumImage}
                          alt={conv.asset.model_name || "Asset"}
                          className="size-16 rounded object-cover"
                        />
                      ) : (
                        <div className="flex size-16 items-center justify-center rounded bg-gray-200">
                          <MailOpen className="size-8 text-gray-400" />
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">
                          {conv.asset?.model_name || "Unknown Asset"}
                        </p>
                        <p className="text-sm text-gray-500">
                          {conv.threads.length} conversation
                          {conv.threads.length !== 1 ? "s" : ""}
                        </p>
                        {conv.totalUnread > 0 && (
                          <span className="mt-1 inline-block rounded-full bg-blue-600 px-2 py-0.5 text-xs text-white">
                            {conv.totalUnread} new
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Threads & Message Detail */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>
              {selectedAsset
                ? selectedThread
                  ? "Conversation"
                  : "Select a Conversation"
                : "Select an Asset"}
            </CardTitle>
            <CardDescription>
              {selectedAsset && !selectedThread
                ? `${selectedAsset.threads.length} conversation${selectedAsset.threads.length !== 1 ? "s" : ""} for this asset`
                : selectedThread
                  ? "View messages and reply"
                  : "Click an asset from the list"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!selectedAsset ? (
              <div className="flex h-64 items-center justify-center text-gray-400">
                <div className="text-center">
                  <MailOpen className="mx-auto mb-4 size-16" />
                  <p>Select an asset to view conversations</p>
                </div>
              </div>
            ) : !selectedThread ? (
              <div className="space-y-2">
                {selectedAsset.threads.map((thread, idx) => {
                  const lastMessage =
                    thread.messages[thread.messages.length - 1];
                  return (
                    <button
                      key={thread.opportunityId}
                      onClick={() => selectThread(selectedAsset, thread)}
                      className="w-full rounded-lg border p-4 text-left transition-colors hover:bg-gray-50"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="size-4 text-gray-500" />
                          <span className="font-medium text-gray-900">
                            Conversation {idx + 1}
                          </span>
                        </div>
                        {thread.unreadCount > 0 && (
                          <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs text-white">
                            {thread.unreadCount} new
                          </span>
                        )}
                      </div>
                      <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                        {lastMessage?.body}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {lastMessage?.created_at
                          ? dayjs(lastMessage.created_at.toDate()).fromNow()
                          : ""}
                      </p>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-6">
                {/* Message Thread */}
                <div className="max-h-[400px] space-y-4 overflow-y-auto">
                  {selectedThread.messages
                    .sort((a, b) => {
                      if (!a.created_at || !b.created_at) return 0;
                      return a.created_at.isBefore(b.created_at) ? -1 : 1;
                    })
                    .map((message) => (
                      <div
                        key={message.id}
                        className="rounded-lg border border-gray-200 bg-white p-4"
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">
                            {message.created_by_name || "Unknown"}
                          </span>
                          <span className="text-xs text-gray-500">
                            {message.created_at
                              ? dayjs(message.created_at.toDate()).format(
                                  "MMM D, YYYY h:mm A",
                                )
                              : ""}
                          </span>
                        </div>
                        <p className="whitespace-pre-wrap text-gray-900">
                          {message.body}
                        </p>
                      </div>
                    ))}
                </div>

                {/* Reply Section */}
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="reply"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Reply
                    </label>
                    <Textarea
                      id="reply"
                      placeholder="Type your reply..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="min-h-[120px]"
                      disabled={sending}
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button
                      onClick={handleReply}
                      disabled={sending || !replyText.trim()}
                    >
                      <Send className="mr-2 size-4" />
                      {sending ? "Sending..." : "Send Reply"}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
});
