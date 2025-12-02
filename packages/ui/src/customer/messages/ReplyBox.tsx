import { Button } from "@/ui/shadcn/ui/button";
import { Textarea } from "@/ui/shadcn/ui/textarea";
import { observer } from "mobx-react-lite";

export interface ReplyBoxProps {
  value: string;
  placeholder?: string;
  helperText?: string;
  disabled?: boolean;
  sending?: boolean;
  onChange: (value: string) => void;
  onSend: () => void;
}

/**
 * Reply textarea with send button for messaging
 *
 * @example
 * <ReplyBox
 *   value=""
 *   placeholder="Type your reply..."
 *   helperText="Reply to buyer inquiry"
 *   onChange={(val) => console.log(val)}
 *   onSend={() => console.log('send')}
 * />
 */
export const ReplyBox = observer(function ReplyBox({
  value,
  placeholder = "Type your reply...",
  helperText = "Reply to inquiry",
  disabled = false,
  sending = false,
  onChange,
  onSend,
}: ReplyBoxProps) {
  return (
    <div className="space-y-3 p-4">
      <Textarea
        placeholder={placeholder}
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled || sending}
      />
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{helperText}</span>
        <Button
          size="sm"
          onClick={onSend}
          disabled={disabled || sending || !value.trim()}
        >
          {sending ? "Sending..." : "Send reply"}
        </Button>
      </div>
    </div>
  );
});
