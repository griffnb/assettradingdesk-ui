import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { MessageModel } from "@/models/models/message/model/MessageModel";
import { OpportunityModel } from "@/models/models/opportunity/model/OpportunityModel";
import { Store } from "@/models/store/Store";
import { Avatar, AvatarFallback } from "@/ui/shadcn/ui/avatar";
import { Badge } from "@/ui/shadcn/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/ui/shadcn/ui/card";
import { ScrollArea } from "@/ui/shadcn/ui/scroll-area";
import { Separator } from "@/ui/shadcn/ui/separator";
import { Skeleton } from "@/ui/shadcn/ui/skeleton";
import { cn } from "@/utils/cn";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { ChevronDown, ChevronRight } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

dayjs.extend(relativeTime);

export interface MySentMessagesProps {
  className?: string;
}

interface RequestConversation {
  opportunity: OpportunityModel | null;
  opportunityId: string;
  asset: AssetModel | null;
  messages: MessageModel[];
  unreadCount: number;
}

export const MySentMessages = observer(function MySentMessages({
  className,
}: MySentMessagesProps) {
  const [requests, setRequests] = useState<RequestConversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedRequests, setExpandedRequests] = useState<Set<string>>(
    new Set(),
  );
  const [selectedRequest, setSelectedRequest] =
    useState<RequestConversation | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<AssetModel | null>(null);

  useEffect(() => {
    loadSentMessages();
  }, []);

  const loadSentMessages = async () => {
    setLoading(true);
    const response = await Store.message.query({});
    if (response.success && response.data) {
      const messages = response.data as MessageModel[];

      // Group messages by opportunity
      const opportunityMap = new Map<string, RequestConversation>();

      messages.forEach((msg) => {
        if (!msg.opportunity_id) return;

        if (!opportunityMap.has(msg.opportunity_id)) {
          opportunityMap.set(msg.opportunity_id, {
            opportunity: null,
            opportunityId: msg.opportunity_id,
            asset: null,
            messages: [],
            unreadCount: 0,
          });
        }

        const request = opportunityMap.get(msg.opportunity_id)!;
        request.messages.push(msg);
        if (msg.is_read === 0) {
          request.unreadCount++;
        }
      });

      // Load opportunity and asset details
      const requestArray = Array.from(opportunityMap.values());
      await Promise.all(
        requestArray.map(async (request) => {
          const oppResponse = await Store.opportunity.get(
            request.opportunityId,
          );
          if (oppResponse.success && oppResponse.data) {
            request.opportunity = oppResponse.data;
            if (request.opportunity.asset_id) {
              const assetResponse = await Store.asset.get(
                request.opportunity.asset_id,
              );
              if (assetResponse.success && assetResponse.data) {
                request.asset = assetResponse.data;
              }
            }
          }
        }),
      );

      setRequests(requestArray);
    }
    setLoading(false);
  };

  const toggleRequest = (opportunityId: string) => {
    const newExpanded = new Set(expandedRequests);
    if (newExpanded.has(opportunityId)) {
      newExpanded.delete(opportunityId);
    } else {
      newExpanded.add(opportunityId);
    }
    setExpandedRequests(newExpanded);
  };

  const selectAsset = (request: RequestConversation, asset: AssetModel) => {
    setSelectedRequest(request);
    setSelectedAsset(asset);
  };

  const getRequestInitials = (request: RequestConversation) => {
    if (!request.opportunity?.id) return "?";
    return `R${request.opportunity.id.slice(0, 2).toUpperCase()}`;
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
        {/* Left Panel - Request List with Expandable Assets */}
        <Card className="border-muted">
          <CardHeader>
            <CardTitle className="text-base">My Requests</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[600px]">
              <div className="divide-y">
                {requests.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
                    <p className="text-sm">No requests yet</p>
                    <p className="mt-2 text-xs">
                      Contact sellers about assets you&apos;re interested in
                    </p>
                  </div>
                ) : (
                  requests.map((request) => {
                    const isExpanded = expandedRequests.has(
                      request.opportunityId,
                    );
                    const hasMultipleAssets = request.asset !== null;
                    return (
                      <div key={request.opportunityId}>
                        <button
                          onClick={() => toggleRequest(request.opportunityId)}
                          className="flex w-full items-center gap-3 bg-card/50 px-4 py-3 text-left hover:bg-muted"
                        >
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>
                              {getRequestInitials(request)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="text-sm font-semibold">
                              Request {request.opportunityId.slice(0, 8)}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {request.messages.length} message
                              {request.messages.length !== 1 ? "s" : ""}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {request.unreadCount > 0 && (
                              <Badge
                                className="bg-primary/20 text-primary"
                                variant="secondary"
                              >
                                {request.unreadCount}
                              </Badge>
                            )}
                            {hasMultipleAssets &&
                              (isExpanded ? (
                                <ChevronDown className="size-4" />
                              ) : (
                                <ChevronRight className="size-4" />
                              ))}
                          </div>
                        </button>
                        {isExpanded && request.asset && (
                          <div className="bg-muted/30">
                            <button
                              onClick={() =>
                                selectAsset(request, request.asset!)
                              }
                              className={cn(
                                "flex w-full items-start gap-3 border-t px-4 py-3 pl-16 text-left hover:bg-muted",
                                selectedRequest?.opportunityId ===
                                  request.opportunityId &&
                                  selectedAsset?.id === request.asset.id &&
                                  "bg-muted",
                              )}
                            >
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>
                                  {getAssetInitials(request.asset.model_name)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <p className="text-xs font-medium">
                                  {request.asset.model_name || "Asset"}
                                </p>
                                <p className="line-clamp-1 text-xs text-muted-foreground">
                                  {request.messages[
                                    request.messages.length - 1
                                  ]?.body || "No messages"}
                                </p>
                              </div>
                              <div className="text-right text-xs text-muted-foreground">
                                <p>
                                  {(() => {
                                    const lastMsg =
                                      request.messages[
                                        request.messages.length - 1
                                      ];
                                    return lastMsg?.created_at
                                      ? dayjs(lastMsg.created_at.toDate()).fromNow()
                                      : "";
                                  })()}
                                </p>
                              </div>
                            </button>
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
                  {selectedRequest && selectedAsset
                    ? selectedAsset.model_name || "Conversation"
                    : "Select a request"}
                </CardTitle>
                {selectedRequest && (
                  <p className="text-xs text-muted-foreground">
                    Request {selectedRequest.opportunityId.slice(0, 8)}
                  </p>
                )}
              </div>
              {selectedRequest && (
                <Badge variant="outline">
                  {selectedRequest.messages.length} messages
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {!selectedRequest ? (
              <div className="flex h-[500px] items-center justify-center text-muted-foreground">
                <p className="text-sm">Select a request to view messages</p>
              </div>
            ) : (
              <>
                <ScrollArea className="h-[440px] px-6">
                  <div className="space-y-6 py-6">
                    {selectedRequest.messages
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
                  <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-muted p-6 text-center">
                    <p className="text-xs text-muted-foreground">
                      Waiting for seller response
                    </p>
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
