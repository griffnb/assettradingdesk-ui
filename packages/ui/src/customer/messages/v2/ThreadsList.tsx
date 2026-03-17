import { AccountModel } from "@/models/models/account/model/AccountModel";
import { MessageModel } from "@/models/models/message/model/MessageModel";
import { MessageService } from "@/models/models/message/services/MessageService";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { PageButtons } from "./PageButtons";
import { ThreadRow } from "./ThreadRow";

interface ThreadsListProps {
  threadId: string | null;
  setActiveThread: (threadId: string) => void;
  reloadedAt: Date;
  account: AccountModel;
}
const PAGE_SIZE = 50;
/**
 * Display list of buyer's sent message conversations grouped by request/opportunity
 * This displays the buyer's conversation list (flat, no nesting)
 * Pattern from ThreadsList.tsx
 *
 * @example
 * <RequestThreadsList
 *   activeOpportunityId={activeOpportunityId}
 *   setActiveOpportunity={setActiveOpportunity}
 *   reloadedAt={reloadedAt}
 *   account={account}
 * />
 */
export const ThreadsList = observer(function ThreadsList({
  threadId,
  setActiveThread,
  reloadedAt,
  account,
}: ThreadsListProps) {
  const [loading, setLoading] = useState(true);
  const [threads, setThreads] = useState<MessageModel[]>([]);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadThreads();
  }, [reloadedAt]);

  const loadThreads = async () => {
    setLoading(true);
    const resp = await MessageService.getThreads();
    if (resp.success && resp.data) {
      setThreads(resp.data);
    }
    setLoading(false);
  };

  const renderRequestList = () => {
    if (threads.length === 0) {
      return (
        <div className="flex flex-1 items-center justify-center p-8 text-center">
          <span className="mx-auto font-semibold uppercase text-text-neutral-quinary-disabled">
            {searchTerm ? "No conversations match your search" : "No Messages"}
          </span>
        </div>
      );
    }

    return (
      <div className="flex flex-col">
        {threads.map((thread) => {
          return (
            <ThreadRow
              key={thread.thread_id}
              account={account}
              thread={thread}
              active={thread.thread_id === threadId}
              onClick={() => setActiveThread(thread.thread_id || "")}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="group relative flex size-full h-fit min-h-full shrink-0 grow-0 flex-col bg-bg-neutral-secondary">
      <div className="sticky top-0 z-10 box-border w-full border-b border-border-neutral-primary bg-bg-neutral-secondary p-4 font-semibold text-text-neutral-quaternary">
        <div className="hidden flex-row items-center justify-between lg:flex">
          <div>Messages</div>
          <PageButtons
            loading={loading}
            page={1}
            setPage={() => {}}
            total={5}
            pageSize={PAGE_SIZE}
          />
        </div>
        <div className="relative mt-2 flex w-full flex-1 flex-row items-center gap-2">
          <div className="flex-1 rounded-lg border text-xs">
            <input
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              value={searchTerm}
              className="w-full rounded-lg border-none px-4 py-1.5 !ring-0"
              placeholder="Search"
            />
          </div>
          <div className="lg:hidden lg:w-0">
            <PageButtons
              loading={loading}
              page={1}
              setPage={() => {}}
              total={5}
              pageSize={PAGE_SIZE}
            />
          </div>
        </div>
      </div>
      {loading ? (
        <div className="flex flex-1 items-center justify-center p-8">
          <i className="fa fa-spinner fa-spin text-icon-neutral-quaternary" />
        </div>
      ) : (
        renderRequestList()
      )}
    </div>
  );
});
