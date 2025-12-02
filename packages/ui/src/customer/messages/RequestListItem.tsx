import { Avatar, AvatarFallback } from "@/ui/shadcn/ui/avatar";
import { Badge } from "@/ui/shadcn/ui/badge";
import { cn } from "@/utils/cn";
import dayjs from "dayjs";
import { ChevronDown, ChevronRight } from "lucide-react";
import { observer } from "mobx-react-lite";

export interface AssetData {
  id: string;
  name: string;
  initials: string;
  lastMessageBody?: string;
  lastMessageTime?: Date;
}

export interface RequestListItemProps {
  requestId: string;
  requestInitials: string;
  displayId: string;
  messageCount: number;
  unreadCount: number;
  isExpanded: boolean;
  hasAssets: boolean;
  assets: AssetData[];
  selectedAssetId?: string;
  onToggle: () => void;
  onAssetSelect: (assetId: string) => void;
}

/**
 * Collapsible request list item showing request info and expandable assets
 *
 * @example
 * <RequestListItem
 *   requestId="req-1"
 *   requestInitials="R1"
 *   displayId="12345678"
 *   messageCount={3}
 *   unreadCount={1}
 *   isExpanded={false}
 *   hasAssets={true}
 *   assets={[]}
 *   onToggle={() => {}}
 *   onAssetSelect={() => {}}
 * />
 */
export const RequestListItem = observer(function RequestListItem({
  requestInitials,
  displayId,
  messageCount,
  unreadCount,
  isExpanded,
  hasAssets,
  assets,
  selectedAssetId,
  onToggle,
  onAssetSelect,
}: RequestListItemProps) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-3 bg-card/50 px-4 py-3 text-left hover:bg-muted"
      >
        <Avatar className="h-10 w-10">
          <AvatarFallback>{requestInitials}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="text-sm font-semibold">Request {displayId}</p>
          <p className="text-xs text-muted-foreground">
            {messageCount} message{messageCount !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Badge className="bg-primary/20 text-primary" variant="secondary">
              {unreadCount}
            </Badge>
          )}
          {hasAssets &&
            (isExpanded ? (
              <ChevronDown className="size-4" />
            ) : (
              <ChevronRight className="size-4" />
            ))}
        </div>
      </button>
      {isExpanded && hasAssets && (
        <div className="bg-muted/30">
          {assets.map((asset) => (
            <button
              key={asset.id}
              onClick={() => onAssetSelect(asset.id)}
              className={cn(
                "flex w-full items-start gap-3 border-t px-4 py-3 pl-16 text-left hover:bg-muted",
                selectedAssetId === asset.id && "bg-muted",
              )}
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback>{asset.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-xs font-medium">{asset.name}</p>
                <p className="line-clamp-1 text-xs text-muted-foreground">
                  {asset.lastMessageBody || "No messages"}
                </p>
              </div>
              <div className="text-right text-xs text-muted-foreground">
                <p>
                  {asset.lastMessageTime
                    ? dayjs(asset.lastMessageTime).fromNow()
                    : ""}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
});
