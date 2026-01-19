import { Button } from "@/ui/shadcn/ui/button";
import { Textarea } from "@/ui/shadcn/ui/textarea";
import { cn } from "@/ui/shadcn/utils";
import { observer } from "mobx-react-lite";
import { useState } from "react";

export interface ReplyBoxProps {
  onSubmit: (body: string) => Promise<void>;
  disabled?: boolean;
  placeholder?: string;
}

/**
 * Reply textarea with send button for messaging
 * Manages its own state, auto-clears on successful submit
 * Submit on Cmd/Ctrl + Enter
 *
 * @example
 * <ReplyBox
 *   onSubmit={async (body) => await sendMessage(body)}
 *   placeholder="Type your reply..."
 *   disabled={false}
 * />
 */
export const ReplyBox = observer(function ReplyBox({
  onSubmit,
  disabled = false,
  placeholder = "Type your message...",
}: ReplyBoxProps) {
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async () => {
    if (!body.trim() || sending || disabled) {
      return;
    }

    setSending(true);
    try {
      await onSubmit(body.trim());
      setBody("");
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
      event.preventDefault();
      handleSubmit();
    }
  };

  const isSubmitDisabled = disabled || sending || !body.trim();

  return (
    <div className="flex flex-col gap-3 self-stretch border-t border-border-neutral-primary bg-bg-neutral-secondary p-4">
      <Textarea
        placeholder={placeholder}
        value={body}
        onChange={(event) => setBody(event.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled || sending}
        className={cn(["min-h-20 w-full resize-none bg-white"])}
      />
      <div className="flex items-center justify-end">
        <Button size="sm" onClick={handleSubmit} disabled={isSubmitDisabled}>
          {sending && <i className="fa fa-spinner fa-spin" />}
          {sending ? "Sending..." : "Send"}
        </Button>
      </div>
    </div>
  );
});
