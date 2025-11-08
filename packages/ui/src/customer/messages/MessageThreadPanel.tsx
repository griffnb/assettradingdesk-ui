import { Badge } from "@/ui/shadcn/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/ui/shadcn/ui/card";
import { ScrollArea } from "@/ui/shadcn/ui/scroll-area";
import { Separator } from "@/ui/shadcn/ui/separator";
import { observer } from "mobx-react-lite";
import { MessageBubble } from "./MessageBubble";
import { ReplyBox } from "./ReplyBox";

export interface MessageData {
  id: string;
  senderName: string;
  body: string;
  timestamp: Date | null;
}

export interface MessageThreadPanelProps {
  title: string;
  subtitle?: string;
  messageCount?: number;
  messages: MessageData[];
  showReplyBox?: boolean;
  replyValue?: string;
  replyPlaceholder?: string;
  replyHelperText?: string;
  sending?: boolean;
  emptyStateText?: string;
  onReplyChange?: (value: string) => void;
  onReplySend?: () => void;
}

/**
 * Right panel showing message thread with optional reply box
 *
 * @example
 * <MessageThreadPanel
 *   title="CT Scanner"
 *   subtitle="Opportunity OPP-123"
 *   messageCount={5}
 *   messages={[]}
 *   showReplyBox={true}
 *   replyValue=""
 *   onReplyChange={() => {}}
 *   onReplySend={() => {}}
 * />
 */
export const MessageThreadPanel = observer(function MessageThreadPanel({
  title,
  subtitle,
  messageCount,
  messages,
  showReplyBox = false,
  replyValue = "",
  replyPlaceholder = "Type your reply...",
  replyHelperText = "Reply to inquiry",
  sending = false,
  emptyStateText = "Select a conversation to view messages",
  onReplyChange,
  onReplySend,
}: MessageThreadPanelProps) {
  const hasMessages = messages.length > 0;

  return (
    <Card className="border-muted">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">{title}</CardTitle>
            {subtitle && (
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            )}
          </div>
          {messageCount !== undefined && messageCount > 0 && (
            <Badge variant="outline">{messageCount} messages</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {!hasMessages ? (
          <div className="flex h-[500px] items-center justify-center text-muted-foreground">
            <p className="text-sm">{emptyStateText}</p>
          </div>
        ) : (
          <>
            <ScrollArea className="h-[440px] px-6">
              <div className="space-y-6 py-6">
                {messages.map((message) => (
                  <MessageBubble
                    key={message.id}
                    senderName={message.senderName}
                    body={message.body}
                    timestamp={message.timestamp}
                  />
                ))}
              </div>
            </ScrollArea>
            {showReplyBox && onReplyChange && onReplySend && (
              <>
                <Separator />
                <ReplyBox
                  value={replyValue}
                  placeholder={replyPlaceholder}
                  helperText={replyHelperText}
                  sending={sending}
                  onChange={onReplyChange}
                  onSend={onReplySend}
                />
              </>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
});
