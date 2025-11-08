import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/ui/shadcn/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/shadcn/ui/tabs";
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
    <Card className={className}>
      <CardHeader>
        <CardTitle>Message Center</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="received" className="flex items-center gap-2">
              <Inbox className="size-4" />
              Received
            </TabsTrigger>
            <TabsTrigger value="sent" className="flex items-center gap-2">
              <Send className="size-4" />
              Sent
            </TabsTrigger>
          </TabsList>

          <TabsContent value="received" className="mt-6">
            <MyAssetMessages />
          </TabsContent>

          <TabsContent value="sent" className="mt-6">
            <MySentMessages />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        Messages are organized by asset or request · Click to expand conversations
      </CardFooter>
    </Card>
  );
});
