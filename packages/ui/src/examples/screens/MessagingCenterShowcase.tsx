"use client";

import { Avatar, AvatarFallback } from "@/ui/shadcn/ui/avatar";
import { Badge } from "@/ui/shadcn/ui/badge";
import { Button } from "@/ui/shadcn/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/ui/shadcn/ui/card";
import { ScrollArea } from "@/ui/shadcn/ui/scroll-area";
import { Separator } from "@/ui/shadcn/ui/separator";
import { Textarea } from "@/ui/shadcn/ui/textarea";

const threads = [
  {
    id: "thread-1",
    counterpart: "Pacific Imaging",
    snippet: "Confirming helium logistics…",
    time: "2m ago",
    unread: 3,
  },
  {
    id: "thread-2",
    counterpart: "WaferCore Fab",
    snippet: "Uploaded photo set + BOM",
    time: "45m ago",
    unread: 0,
  },
  {
    id: "thread-3",
    counterpart: "Metro Health",
    snippet: "Final draft contract",
    time: "Yesterday",
    unread: 0,
  },
];

const messages = [
  { from: "broker", body: "Sharing the inspection packet – coil calibration looks great.", time: "09:12" },
  { from: "buyer", body: "Thanks! Can we lock install support if we wire 30% upfront?", time: "09:18" },
  { from: "broker", body: "Yes. Seller will hold rigging crew through Feb 20 if deposit lands by Nov 5.", time: "09:24" },
];

export function MessagingCenterShowcase() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Message center</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <Card className="border-muted">
          <CardHeader>
            <CardTitle className="text-base">Conversations</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[420px]">
              <div className="divide-y">
                {threads.map((thread) => (
                  <button
                    key={thread.id}
                    className="flex w-full items-center gap-3 bg-card/50 px-4 py-3 text-left hover:bg-muted"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {thread.counterpart
                          .split(" ")
                          .map((word) => word[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{thread.counterpart}</p>
                      <p className="text-xs text-muted-foreground">{thread.snippet}</p>
                    </div>
                    <div className="text-right text-xs text-muted-foreground">
                      <p>{thread.time}</p>
                      {thread.unread > 0 && (
                        <Badge className="mt-1 bg-primary/20 text-primary" variant="secondary">
                          {thread.unread}
                        </Badge>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="border-muted">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Pacific Imaging</CardTitle>
                <p className="text-xs text-muted-foreground">Opportunity OPP-1182 · Assigned to Riley</p>
              </div>
              <Badge variant="outline">Live</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[360px] px-6">
              <div className="space-y-6 py-6">
                {messages.map((message, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="font-medium capitalize">{message.from}</span>
                      <span>•</span>
                      <span>{message.time}</span>
                    </div>
                    <div
                      className={`rounded-2xl border px-4 py-3 text-sm ${
                        message.from === "broker"
                          ? "bg-primary/5 text-foreground"
                          : "bg-muted"
                      }`}
                    >
                      {message.body}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <Separator />
            <div className="space-y-3 p-4">
              <Textarea placeholder="Type a reply, attach docs, or drop a quote…" rows={3} />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Buyer sees broker + compliance all in one thread.</span>
                <Button size="sm">Send reply</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        Auto-mark unread when thread is opened · SLA targets set per opportunity.
      </CardFooter>
    </Card>
  );
}
