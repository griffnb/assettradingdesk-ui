import { cn } from "@/common_lib/utils/cn";
import { MessageModel } from "@/models/models/message/model/MessageModel";
import { OpportunityModel } from "@/models/models/opportunity/model/OpportunityModel";
import { observer } from "mobx-react-lite";
import { formatDateTime } from "./utils";

interface OpportunityThreadItemProps {
  opportunity: OpportunityModel;
  messages: MessageModel[];

  unreadCount: number;
  active: boolean;
  onClick: () => void;
}

export const OpportunityThreadItem = observer(
  (props: OpportunityThreadItemProps) => {
    const { opportunity, messages, unreadCount, active } = props;

    // Get last message for preview
    const lastMessage =
      messages.length > 0 ? messages[messages.length - 1] : null;
    const messagePreview = lastMessage?.body
      ? lastMessage.body.length > 60
        ? lastMessage.body.substring(0, 60) + "..."
        : lastMessage.body
      : "";

    const timestamp = lastMessage?.updated_at
      ? formatDateTime(lastMessage.updated_at)
      : "";

    // TODO: Load buyer account name from Store.account.get(opportunity.buyer_account_id)
    // For now, using buyer_account_id as placeholder
    const buyerName = opportunity.buyer_account_id || "Unknown Buyer";

    const isSeen = unreadCount === 0;

    return (
      <div
        onClick={props.onClick}
        className={cn(
          "group box-border h-24 shrink-0 grow-0 cursor-pointer overflow-hidden border-b border-border-neutral-primary py-3 pl-8 pr-4",
          "data-[active=true]:bg-bg-brand-primary",
          "data-[seen=true]:bg-bg-neutral-secondary",
          "data-[seen=false]:bg-white",
        )}
        data-active={active ? "true" : "false"}
        data-seen={isSeen ? "true" : "false"}
      >
        <div className="flex flex-row items-center">
          <div
            className={cn(
              "mr-auto flex flex-row items-center gap-x-2 truncate text-sm text-text-neutral-primary",
              "group-data-[active=true]:text-text-brand-tertiary",
              "group-data-[seen=false]:font-bold",
              "group-data-[seen=true]:font-semibold",
            )}
          >
            {unreadCount > 0 && (
              <span className="flex size-2.5 flex-none flex-col items-center justify-center rounded-full bg-icon-brand-primary" />
            )}
            <span className="truncate">{buyerName}</span>
          </div>
          <div
            className={cn(
              "ml-2 flex flex-row items-center gap-x-1 whitespace-nowrap text-xs",
              "group-data-[active=true]:text-text-brand-tertiary",
              "group-data-[seen=true]:font-medium",
              "group-data-[seen=false]:font-bold",
              "group-data-[seen=true]:group-data-[active=false]:text-text-neutral-quaternary",
            )}
          >
            {timestamp}
          </div>
        </div>
        <div
          className={cn(
            "mt-1.5 line-clamp-2 flex max-h-10 flex-row text-xs",
            active
              ? "text-text-brand-tertiary"
              : "text-text-neutral-quaternary",
          )}
        >
          {messagePreview}
        </div>
        {unreadCount > 0 && (
          <div className="mt-1 flex items-center">
            <span
              className={cn(
                "inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-xs font-bold",
                active
                  ? "bg-bg-brand-tertiary text-text-brand-primary"
                  : "bg-bg-brand-primary text-text-brand-tertiary",
              )}
            >
              {unreadCount}
            </span>
          </div>
        )}
      </div>
    );
  },
);
