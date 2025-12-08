import { AccountModel } from "@/models/models/account/model/AccountModel";
import { MessageModel } from "@/models/models/message/model/MessageModel";
import { cn } from "@/utils/cn";
import { observer } from "mobx-react-lite";

interface ThreadRowProps {
  thread: MessageModel;
  account: AccountModel;

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
export const ThreadRow = observer(function ThreadRow({
  thread,
  active,
  account,
  onClick,
}: ThreadRowProps) {
  const lastMessagePreview =
    thread.body.length > 60
      ? thread.body.substring(0, 60) + "..."
      : thread.body;

  // Determine other party name
  const otherParty =
    thread.from_account_id !== account.id
      ? thread.from_account_name
      : thread.to_account_name;

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
      data-seen={thread.unread_count === 0 ? "true" : "false"}
    >
      <div className="flex flex-row items-center gap-x-3">
        <img
          src={thread.asset_thumbnail}
          alt={thread.asset_make_model}
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
              {thread.unread_count > 0 && (
                <span className="flex size-2.5 flex-none flex-col items-center justify-center rounded-full bg-icon-brand-primary" />
              )}
              <span className="truncate">{thread.asset_make_model}</span>
            </div>
            <div
              className={cn(
                "ml-2 flex flex-row items-center gap-x-1 whitespace-nowrap text-sm font-bold",
                "group-data-[active=true]:text-text-brand-tertiary",
                "group-data-[seen=true]:font-semibold",
                "group-data-[seen=true]:group-data-[active=false]:text-text-neutral-quaternary",
              )}
            >
              {thread.createdAtFmt}
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
            {otherParty.trim() == "" ? "Other Party" : otherParty}
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
