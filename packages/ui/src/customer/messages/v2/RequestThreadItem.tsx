import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { MessageModel } from "@/models/models/message/model/MessageModel";
import { OpportunityModel } from "@/models/models/opportunity/model/OpportunityModel";
import { cn } from "@/utils/cn";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import { formatDateTime } from "./utils";

interface RequestThreadItemProps {
  opportunity: OpportunityModel;
  asset: AssetModel;
  messages: MessageModel[];
  unreadCount: number;
  active: boolean;
  onClick: () => void;
}

/**
 * Display single conversation in buyer view (flat list, no nesting)
 * Shows asset info with last message preview
 * Pattern from ThreadRow.tsx but simplified for buyer conversations
 *
 * @example
 * <RequestThreadItem
 *   opportunity={opportunityModel}
 *   asset={assetModel}
 *   messages={messageArray}
 *   unreadCount={2}
 *   active={false}
 *   onClick={() => setActiveOpportunityId(opportunity.id)}
 * />
 */
export const RequestThreadItem = observer(function RequestThreadItem({
  opportunity, // Keep the prop to satisfy the interface, but add an eslint-disable comment
  asset,
  messages,
  unreadCount,
  active,
  onClick,
}: RequestThreadItemProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _ = opportunity; // Optional: explicitly reference the prop to suppress unused variable warning

  const lastMessage =
    messages.length > 0 ? messages[messages.length - 1] : null;
  const lastMessagePreview = lastMessage
    ? lastMessage.body.length > 60
      ? lastMessage.body.substring(0, 60) + "..."
      : lastMessage.body
    : "No messages";

  const lastMessageTime = lastMessage
    ? formatDateTime(dayjs(lastMessage.updated_at))
    : "";

  const assetName = `${asset.manufacturer_name} ${asset.model_name}`;

  return (
    <div
      onClick={onClick}
      className={cn(
        "group box-border h-28 shrink-0 grow-0 cursor-pointer overflow-hidden border-b border-border-neutral-primary p-4",
        "data-[active=true]:bg-bg-brand-primary",
        "data-[seen=true]:bg-bg-neutral-secondary",
        "data-[seen=false]:bg-white",
      )}
      data-active={active ? "true" : "false"}
      data-seen={unreadCount === 0 ? "true" : "false"}
    >
      <div className="flex flex-row items-center gap-x-3">
        <img
          src={asset.thumbnail}
          alt={assetName}
          className="size-12 shrink-0 rounded object-cover"
        />
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex flex-row items-center">
            <div
              className={cn(
                "mr-auto flex flex-row items-center gap-x-2 truncate text-base text-text-neutral-primary",
                "group-data-[active=true]:text-text-brand-tertiary",
                "group-data-[seen=false]:font-bold",
                "group-data-[seen=true]:font-semibold",
              )}
            >
              {unreadCount > 0 && (
                <span className="flex size-2.5 flex-none flex-col items-center justify-center rounded-full bg-icon-brand-primary" />
              )}
              <span className="truncate">{assetName}</span>
            </div>
            <div
              className={cn(
                "ml-2 flex flex-row items-center gap-x-1 whitespace-nowrap text-sm font-bold",
                "group-data-[active=true]:text-text-brand-tertiary",
                "group-data-[seen=true]:font-semibold",
                "group-data-[seen=true]:group-data-[active=false]:text-text-neutral-quaternary",
              )}
            >
              {lastMessageTime}
            </div>
          </div>
          <div
            className={cn(
              "h-5 truncate text-sm",
              active
                ? "text-text-brand-tertiary"
                : "text-text-neutral-secondary",
            )}
          >
            {asset.year && `${asset.year} • `}
            {asset.location}
          </div>
          <div
            className={cn(
              "line-clamp-2 flex max-h-10 flex-row text-sm",
              active
                ? "text-text-brand-tertiary"
                : "text-text-neutral-quaternary",
            )}
          >
            {lastMessagePreview}
          </div>
        </div>
      </div>
    </div>
  );
});
