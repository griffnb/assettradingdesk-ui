import dayjs from "dayjs";
import { observer } from "mobx-react-lite";

export interface MessageBubbleProps {
  senderName: string;
  body: string;
  timestamp: Date | null;
  variant?: "default" | "sender" | "receiver";
}

/**
 * Individual message bubble displaying sender, time, and message content
 *
 * @example
 * <MessageBubble
 *   senderName="John Doe"
 *   body="This is a message"
 *   timestamp={new Date()}
 *   variant="default"
 * />
 */
export const MessageBubble = observer(function MessageBubble({
  senderName,
  body,
  timestamp,
  variant = "default",
}: MessageBubbleProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span className="font-medium">{senderName}</span>
        <span>•</span>
        <span>{timestamp ? dayjs(timestamp).format("h:mm A") : ""}</span>
      </div>
      <div
        className={`rounded-2xl border px-4 py-3 text-sm ${
          variant === "sender"
            ? "bg-primary/5 text-foreground"
            : "bg-muted"
        }`}
      >
        {body}
      </div>
    </div>
  );
});
