import { Badge } from "@/ui/shadcn/ui/badge";
import { cn } from "@/utils/cn";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";

export interface ConversationThreadItemProps {
  threadNumber: number;
  lastMessageBody?: string;
  lastMessageTime?: Date;
  unreadCount: number;
  isSelected: boolean;
  onClick: () => void;
}

/**
 * A single conversation thread item in a collapsible list
 *
 * @example
 * <ConversationThreadItem
 *   threadNumber={1}
 *   lastMessageBody="Hello there"
 *   lastMessageTime={new Date()}
 *   unreadCount={2}
 *   isSelected={false}
 *   onClick={() => {}}
 * />
 */
export const ConversationThreadItem = observer(function ConversationThreadItem({
  threadNumber,
  lastMessageBody,
  lastMessageTime,
  unreadCount,
  isSelected,
  onClick,
}: ConversationThreadItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-start gap-3 border-t px-4 py-3 pl-16 text-left hover:bg-muted",
        isSelected && "bg-muted",
      )}
    >
      <div className="flex-1">
        <p className="text-xs font-medium">Thread {threadNumber}</p>
        <p className="line-clamp-1 text-xs text-muted-foreground">
          {lastMessageBody || "No messages"}
        </p>
      </div>
      <div className="text-right text-xs text-muted-foreground">
        <p>{lastMessageTime ? dayjs(lastMessageTime).fromNow() : ""}</p>
        {unreadCount > 0 && (
          <Badge
            className="mt-1 bg-primary/20 text-primary"
            variant="secondary"
          >
            {unreadCount}
          </Badge>
        )}
      </div>
    </button>
  );
});
