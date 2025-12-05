import { AccountModel } from "@/models/models/account/model/AccountModel";
import { SidePanelWrap } from "@/ui/common/components/side-panel/SidePanelWrap";
import { cva, VariantProps } from "class-variance-authority";
import { observer } from "mobx-react-lite";
import { HTMLAttributes } from "react";
import { MessageThreadPanel } from "./MessageThreadPanel";

export const MessageSidePanelID = "MessageSidePanel";

const styleVariants = cva("", {
  variants: {
    variant: {
      default: "min-w-[40%] overflow-y-auto",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

/**
 * A Sample Component
 *
 * @example
 * [&_*[data-slot='my-slot']]:mx-auto
 *
 * @slot {"my-slot"} data-slot="my-slot"
 */

export interface MessageSidePanelProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof styleVariants> {
  clearOpportunity: () => void;
  opportunityId: string;
  account: AccountModel;
  title: string;
}
export const MessageSidePanel = observer(function MessageSidePanel(
  fullProps: MessageSidePanelProps,
) {
  const {
    className,
    variant,
    clearOpportunity,
    opportunityId,
    account,
    title,
  } = fullProps;

  return (
    <SidePanelWrap
      id={MessageSidePanelID}
      className={styleVariants({ variant, className })}
      title={title}
      resizeable={false}
      size="lg"
      closeAction={clearOpportunity}
    >
      <MessageThreadPanel
        opportunityId={opportunityId}
        account={account}
        reloadList={() => {}}
        // Prop removed as per TypeScript error correction
      />
    </SidePanelWrap>
  );
});
