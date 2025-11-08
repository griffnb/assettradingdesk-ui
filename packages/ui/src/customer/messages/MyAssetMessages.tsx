import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { MessageModel } from "@/models/models/message/model/MessageModel";
import { MessageService } from "@/models/models/message/services/MessageService";
import { Store } from "@/models/store/Store";
import { Avatar, AvatarFallback } from "@/ui/shadcn/ui/avatar";
import { Badge } from "@/ui/shadcn/ui/badge";
import { Button } from "@/ui/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/ui/shadcn/ui/card";
import { ScrollArea } from "@/ui/shadcn/ui/scroll-area";
import { Separator } from "@/ui/shadcn/ui/separator";
import { Skeleton } from "@/ui/shadcn/ui/skeleton";
import { Textarea } from "@/ui/shadcn/ui/textarea";
import { cn } from "@/utils/cn";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { ChevronDown, ChevronRight } from "lucide-react";
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
  const [expandedAssets, setExpandedAssets] = useState<Set<string>>(new Set());
  const [selectedThread, setSelectedThread] =
    useState<OpportunityThread | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<AssetConversation | null>(
    null,
  );
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

  const toggleAsset = (assetId: string) => {
    const newExpanded = new Set(expandedAssets);
    if (newExpanded.has(assetId)) {
      newExpanded.delete(assetId);
    } else {
      newExpanded.add(assetId);
    }
    setExpandedAssets(newExpanded);
  };

  const getAssetInitials = (assetName?: string | null) => {
    if (!assetName) return "?";
    return assetName
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  if (loading) {
    return (
      <div className={cn("space-y-4", className)}>
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <Card className={className}>
      <CardContent className="grid gap-6 p-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        {/* Left Panel - Asset List with Expandable Threads */}
        <Card className="border-muted">
          <CardHeader>
            <CardTitle className="text-base">Your Assets</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[600px]">
              <div className="divide-y">
                {conversations.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
                    <p className="text-sm">No messages yet</p>
                  </div>
                ) : (
                  conversations.map((conv) => {
                    const isExpanded = expandedAssets.has(conv.assetId);
                    return (
                      <div key={conv.assetId}>
                        <button
                          onClick={() => toggleAsset(conv.assetId)}
                          className="flex w-full items-center gap-3 bg-card/50 px-4 py-3 text-left hover:bg-muted"
                        >
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>
                              {getAssetInitials(conv.asset?.model_name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="text-sm font-semibold">
                              {conv.asset?.model_name || "Unknown Asset"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {conv.threads.length} conversation
                              {conv.threads.length !== 1 ? "s" : ""}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {conv.totalUnread > 0 && (
                              <Badge
                                className="bg-primary/20 text-primary"
                                variant="secondary"
                              >
                                {conv.totalUnread}
                              </Badge>
                            )}
                            {isExpanded ? (
                              <ChevronDown className="size-4" />
                            ) : (
                              <ChevronRight className="size-4" />
                            )}
                          </div>
                        </button>
                        {isExpanded && (
                          <div className="bg-muted/30">
                            {conv.threads.map((thread, idx) => {
                              const lastMessage =
                                thread.messages[thread.messages.length - 1];
                              const isSelected =
                                selectedThread?.opportunityId ===
                                  thread.opportunityId &&
                                selectedAsset?.assetId === conv.assetId;
                              return (
                                <button
                                  key={thread.opportunityId}
                                  onClick={() => selectThread(conv, thread)}
                                  className={cn(
                                    "flex w-full items-start gap-3 border-t px-4 py-3 pl-16 text-left hover:bg-muted",
                                    isSelected && "bg-muted",
                                  )}
                                >
                                  <div className="flex-1">
                                    <p className="text-xs font-medium">
                                      Thread {idx + 1}
                                    </p>
                                    <p className="line-clamp-1 text-xs text-muted-foreground">
                                      {lastMessage?.body || "No messages"}
                                    </p>
                                  </div>
                                  <div className="text-right text-xs text-muted-foreground">
                                    <p>
                                      {lastMessage?.created_at
                                        ? dayjs(
                                            lastMessage.created_at.toDate(),
                                          ).fromNow()
                                        : ""}
                                    </p>
                                    {thread.unreadCount > 0 && (
                                      <Badge
                                        className="mt-1 bg-primary/20 text-primary"
                                        variant="secondary"
                                      >
                                        {thread.unreadCount}
                                      </Badge>
                                    )}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Right Panel - Message Thread */}
        <Card className="border-muted">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">
                  {selectedThread && selectedAsset
                    ? selectedAsset.asset?.model_name || "Conversation"
                    : "Select a conversation"}
                </CardTitle>
                {selectedThread && (
                  <p className="text-xs text-muted-foreground">
                    Opportunity {selectedThread.opportunityId}
                  </p>
                )}
              </div>
              {selectedThread && (
                <Badge variant="outline">
                  {selectedThread.messages.length} messages
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {!selectedThread ? (
              <div className="flex h-[500px] items-center justify-center text-muted-foreground">
                <p className="text-sm">
                  Select a conversation to view messages
                </p>
              </div>
            ) : (
              <>
                <ScrollArea className="h-[440px] px-6">
                  <div className="space-y-6 py-6">
                    {selectedThread.messages
                      .sort((a, b) => {
                        if (!a.created_at || !b.created_at) return 0;
                        return a.created_at.isBefore(b.created_at) ? -1 : 1;
                      })
                      .map((message, idx) => (
                        <div key={message.id || idx} className="space-y-1">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="font-medium">
                              {message.created_by_name || "Unknown"}
                            </span>
                            <span>•</span>
                            <span>
                              {message.created_at
                                ? dayjs(message.created_at.toDate()).format(
                                    "h:mm A",
                                  )
                                : ""}
                            </span>
                          </div>
                          <div className="rounded-2xl border bg-muted px-4 py-3 text-sm">
                            {message.body}
                          </div>
                        </div>
                      ))}
                  </div>
                </ScrollArea>
                <Separator />
                <div className="space-y-3 p-4">
                  <Textarea
                    placeholder="Type your reply..."
                    rows={3}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    disabled={sending}
                  />
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Reply to buyer inquiry</span>
                    <Button
                      size="sm"
                      onClick={handleReply}
                      disabled={sending || !replyText.trim()}
                    >
                      {sending ? "Sending..." : "Send reply"}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
});
