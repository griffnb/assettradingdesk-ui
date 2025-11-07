import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { MessageModel } from "@/models/models/message/model/MessageModel";
import { OpportunityModel } from "@/models/models/opportunity/model/OpportunityModel";
import { Store } from "@/models/store/Store";
import { Badge } from "@/ui/shadcn/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/shadcn/ui/card";
import { Skeleton } from "@/ui/shadcn/ui/skeleton";
import { cn } from "@/utils/cn";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { CheckCircle2, Clock, Mail, MessageSquare } from "lucide-react";
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
  const [selectedRequest, setSelectedRequest] =
    useState<RequestConversation | null>(null);

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

  const getRequestStatus = (request: RequestConversation) => {
    if (request.messages.length > 1) {
      return {
        label: "Active",
        icon: CheckCircle2,
        color: "bg-green-500",
        variant: "default" as const,
      };
    }
    return {
      label: "Pending",
      icon: Clock,
      color: "bg-yellow-500",
      variant: "secondary" as const,
    };
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
        <h1 className="text-3xl font-bold text-gray-900">My Sent Messages</h1>
        <p className="text-gray-500">
          Track your inquiries and responses from sellers
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {/* Request List */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>My Requests ({requests.length})</CardTitle>
            <CardDescription>Select a request to view messages</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {requests.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <Mail className="mb-4 size-12 text-gray-400" />
                <p className="text-sm text-gray-500">No requests yet</p>
                <p className="mt-2 text-xs text-gray-400">
                  Contact sellers about assets you're interested in
                </p>
              </div>
            ) : (
              <div className="max-h-[600px] overflow-y-auto">
                {requests.map((request) => {
                  const status = getRequestStatus(request);
                  const StatusIcon = status.icon;

                  return (
                    <button
                      key={request.opportunityId}
                      onClick={() => setSelectedRequest(request)}
                      className={cn(
                        "w-full border-b p-4 text-left transition-colors hover:bg-gray-50",
                        selectedRequest?.opportunityId ===
                          request.opportunityId && "bg-blue-50",
                      )}
                    >
                      <div className="flex gap-3">
                        {request.asset?.mediumImage ? (
                          <img
                            src={request.asset.mediumImage}
                            alt={request.asset.model_name || "Asset"}
                            className="size-16 rounded object-cover"
                          />
                        ) : (
                          <div className="flex size-16 items-center justify-center rounded bg-gray-200">
                            <Mail className="size-8 text-gray-400" />
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">
                            {request.asset?.model_name || "Request"}
                          </p>
                          <div className="mt-1 flex items-center gap-2">
                            <Badge variant={status.variant} className="text-xs">
                              <StatusIcon className="mr-1 size-3" />
                              {status.label}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {request.messages.length} message
                              {request.messages.length !== 1 ? "s" : ""}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Message Thread */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>
              {selectedRequest ? "Conversation" : "Select a Request"}
            </CardTitle>
            <CardDescription>
              {selectedRequest
                ? "View your conversation with the seller"
                : "Click a request from the list to view messages"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedRequest ? (
              <div className="space-y-4">
                {/* Messages */}
                <div className="max-h-[500px] space-y-4 overflow-y-auto">
                  {selectedRequest.messages
                    .sort((a, b) => {
                      if (!a.created_at || !b.created_at) return 0;
                      return a.created_at.isBefore(b.created_at) ? -1 : 1;
                    })
                    .map((message, index) => (
                      <div
                        key={message.id || index}
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

                {selectedRequest.messages.length === 1 && (
                  <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 p-8 text-center">
                    <Clock className="mb-2 size-12 text-gray-400" />
                    <p className="text-sm font-medium text-gray-600">
                      Waiting for seller response
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      You'll see the reply here when the seller responds
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-gray-400">
                <div className="text-center">
                  <MessageSquare className="mx-auto mb-4 size-16" />
                  <p>Select a request to view the conversation</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
});
