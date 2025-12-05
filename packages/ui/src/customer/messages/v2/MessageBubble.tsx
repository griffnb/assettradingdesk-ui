import { MessageModel } from "@/models/models/message/model/MessageModel";
import { cn } from "@/utils/cn";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";

export interface MessageBubbleProps {
  message: MessageModel;
  isOwnMessage: boolean;
  senderName: string;
}

/**
 * Individual message bubble displaying sender, message content, and timestamp
 * Left-aligned for received messages, right-aligned for sent messages
 *
 * @example
 * <MessageBubble
 *   message={messageModel}
 *   isOwnMessage={false}
 *   senderName="John Doe"
 * />
 */
export const MessageBubble = observer(function MessageBubble({
  message,
  isOwnMessage,
  senderName,
}: MessageBubbleProps) {
  const formattedTime = message.created_at
    ? dayjs(message.created_at).format("h:mm A")
    : "";

  return (
    <div
      className={cn("mb-4 flex w-full flex-col", [
        isOwnMessage ? "items-end" : "items-start",
      ])}
    >
      <div className="mb-1 text-xs text-text-neutral-quaternary">
        {senderName}
      </div>
      <div
        className={cn("max-w-[70%] whitespace-pre-wrap break-words rounded-lg p-3", [
          isOwnMessage
            ? "bg-bg-brand-primary text-text-brand-tertiary"
            : "bg-bg-neutral-tertiary text-text-neutral-primary",
        ])}
      >
        {message.body}
      </div>
      <div className="mt-1 text-xs text-text-neutral-quaternary">
        {formattedTime}
      </div>
    </div>
  );
});
