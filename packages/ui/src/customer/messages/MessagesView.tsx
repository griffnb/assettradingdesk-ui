import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/shadcn/ui/tabs";
import { cn } from "@/utils/cn";
import { Inbox, Send } from "lucide-react";
import { observer } from "mobx-react-lite";
import { MyAssetMessages } from "./MyAssetMessages";
import { MySentMessages } from "./MySentMessages";

export interface MessagesViewProps {
  className?: string;
  defaultTab?: "received" | "sent";
}

/**
 * Combined messages view with tabs for received and sent messages
 *
 * @example
 * <MessagesView defaultTab="received" />
 */
export const MessagesView = observer(function MessagesView({
  className,
  defaultTab = "received",
}: MessagesViewProps) {
  return (
    <div className={cn("w-full", className)}>
      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="mb-6 grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="received" className="flex items-center gap-2">
            <Inbox className="size-4" />
            Received Messages
          </TabsTrigger>
          <TabsTrigger value="sent" className="flex items-center gap-2">
            <Send className="size-4" />
            Sent Messages
          </TabsTrigger>
        </TabsList>

        <TabsContent value="received">
          <MyAssetMessages />
        </TabsContent>

        <TabsContent value="sent">
          <MySentMessages />
        </TabsContent>
      </Tabs>
    </div>
  );
});
