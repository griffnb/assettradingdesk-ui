import useMediaQuery, { BREAKPOINTS } from "@/common_lib/hooks/useMediaQuery";
import { LayerService } from "@/common_lib/services/LayerService";
import { AccountModel } from "@/models/models/account/model/AccountModel";
import { MessageThreadPanel } from "@/ui/customer/messages/v2/MessageThreadPanel";
import { ThreadsList } from "@/ui/customer/messages/v2/ThreadsList";
import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { MessageSidePanel, MessageSidePanelID } from "./MessageSidePanel";

/**
 * Main container component for the messaging system
 * Displays asset-based messages grouped by opportunities (buyer-seller pairs)
 * Pattern from AtlasMailIndex.tsx but adapted for asset messages
 *
 * Features:
 * - Seller view: Assets with nested opportunities (multiple buyers per asset)
 * - Buyer view: Opportunities grouped by request (multiple assets per inquiry)
 * - URL-based navigation: /messages/:opportunityId
 * - Resizable panels on desktop, modal on mobile
 *
 * @example
 * <MessagesIndex />
 */

interface MessagesIndexProps {
  account: AccountModel;
}

export const MessagesIndex = observer(function MessagesIndex(
  props: MessagesIndexProps,
) {
  const [reloadedAt, setReloadedAt] = useState<Date>(new Date());
  const navigate = useNavigate();
  const params = useParams();
  const { isMediaQuery: isSmallDesktop } = useMediaQuery(BREAKPOINTS.LG);
  const resizingRef = useRef<boolean>(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const { account } = props;

  // Handle URL parameter updates
  useEffect(() => {
    if (params.threadId) {
      setActiveThreadId(params.threadId);
    }
  }, [params.threadId]);

  /**
   * Update active opportunity and navigate to new URL
   * For mobile, opens MessageThreadPanel in LayerService modal
   */
  const onSetActiveThread = (threadId: string) => {
    setActiveThreadId(threadId);
    navigate(`/manage/messages/${threadId}`, { replace: false });

    if (isSmallDesktop) {
      LayerService.add({
        id: MessageSidePanelID,
        component: MessageSidePanel,
        props: {
          closeAction: () => {
            setActiveThreadId(null);
            navigate("/manage/messages", { replace: false });
          },
          threadId: threadId,
          account: account,
          title: "Asset XXX XXTODO",
        },
      });
    }
  };

  /**
   * Handle mouse down for resizable panel
   * Preserves exact logic from AtlasMailIndex
   */
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isSmallDesktop) return;
    if (!elementRef.current) return;
    const startX = e.clientX;

    const startWidth = elementRef.current.getBoundingClientRect().width;

    resizingRef.current = true;

    const onMouseMove = (event: MouseEvent) => {
      if (!resizingRef.current || !elementRef.current) return;

      const newWidth = startWidth + (event.clientX - startX);

      elementRef.current.style.width = `${newWidth}px`;
    };

    const onMouseUp = () => {
      resizingRef.current = false;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("selectstart", preventSelection);
    };

    const preventSelection = (e: Event) => e.preventDefault();

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("selectstart", preventSelection);
  };

  return (
    <div className="flex h-full flex-col overflow-y-hidden">
      <div className="flex flex-row items-center justify-between border-b px-6 py-2">
        <div className="flex flex-col items-start gap-x-1 lg:max-w-full lg:flex-row lg:items-center">
          <span className="text-lg font-semibold">Messages</span>
        </div>
      </div>

      <div className="flex h-full flex-row self-stretch overflow-y-auto overflow-x-hidden">
        <div
          ref={elementRef}
          style={{ width: !isSmallDesktop ? `440px` : "100%" }}
          className="shrink-0 self-stretch overflow-y-scroll"
        >
          <ThreadsList
            threadId={activeThreadId}
            setActiveThread={onSetActiveThread}
            reloadedAt={reloadedAt}
            account={account}
          />
        </div>

        <div
          onMouseDown={handleMouseDown}
          className="h-full w-[2px] cursor-ew-resize bg-border-neutral-primary"
        />

        <div className="hidden lg:contents">
          <MessageThreadPanel
            threadId={activeThreadId}
            account={account}
            reloadList={() => {
              setReloadedAt(new Date());
            }}
          />
        </div>
      </div>
    </div>
  );
});
