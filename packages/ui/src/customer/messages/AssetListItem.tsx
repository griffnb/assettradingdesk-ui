import { Avatar, AvatarFallback } from "@/ui/shadcn/ui/avatar";
import { Badge } from "@/ui/shadcn/ui/badge";
import { ChevronDown, ChevronRight } from "lucide-react";
import { observer } from "mobx-react-lite";
import { ConversationThreadItem } from "./ConversationThreadItem";

export interface ThreadData {
  id: string;
  lastMessageBody?: string;
  lastMessageTime?: Date;
  unreadCount: number;
}

export interface AssetListItemProps {
  assetId: string;
  assetName: string;
  assetInitials: string;
  threadCount: number;
  totalUnread: number;
  isExpanded: boolean;
  threads: ThreadData[];
  selectedThreadId?: string;
  onToggle: () => void;
  onThreadSelect: (threadId: string) => void;
}

/**
 * Collapsible asset list item showing asset info and expandable conversation threads
 *
 * @example
 * <AssetListItem
 *   assetId="asset-1"
 *   assetName="CT Scanner"
 *   assetInitials="CS"
 *   threadCount={3}
 *   totalUnread={5}
 *   isExpanded={false}
 *   threads={[]}
 *   onToggle={() => {}}
 *   onThreadSelect={() => {}}
 * />
 */
export const AssetListItem = observer(function AssetListItem({
  assetName,
  assetInitials,
  threadCount,
  totalUnread,
  isExpanded,
  threads,
  selectedThreadId,
  onToggle,
  onThreadSelect,
}: AssetListItemProps) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-3 bg-card/50 px-4 py-3 text-left hover:bg-muted"
      >
        <Avatar className="h-10 w-10">
          <AvatarFallback>{assetInitials}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="text-sm font-semibold">{assetName}</p>
          <p className="text-xs text-muted-foreground">
            {threadCount} conversation{threadCount !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {totalUnread > 0 && (
            <Badge className="bg-primary/20 text-primary" variant="secondary">
              {totalUnread}
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
          {threads.map((thread, idx) => (
            <ConversationThreadItem
              key={thread.id}
              threadNumber={idx + 1}
              lastMessageBody={thread.lastMessageBody}
              lastMessageTime={thread.lastMessageTime}
              unreadCount={thread.unreadCount}
              isSelected={selectedThreadId === thread.id}
              onClick={() => onThreadSelect(thread.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
});
