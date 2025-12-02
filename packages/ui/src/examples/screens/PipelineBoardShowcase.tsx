"use client";

import { Badge } from "@/ui/shadcn/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/ui/shadcn/ui/card";
import { ScrollArea } from "@/ui/shadcn/ui/scroll-area";

const columns = [
  {
    stage: "Qualification",
    value: "$38.4M",
    deals: [
      {
        name: "Helios 7T MRI",
        buyer: "Pacific Imaging",
        amount: "$3.9M",
        aging: "8 days",
      },
      {
        name: "NXE:3600D",
        buyer: "WaferCore Fab",
        amount: "$124M",
        aging: "3 days",
      },
    ],
  },
  {
    stage: "Specifications",
    value: "$52.1M",
    deals: [
      {
        name: "AMR Additive Cell",
        buyer: "AeroForge",
        amount: "$5.4M",
        aging: "15 days",
      },
      {
        name: "High purity CMP plant",
        buyer: "NanoPolish",
        amount: "$18.7M",
        aging: "6 days",
      },
    ],
  },
  {
    stage: "Negotiation",
    value: "$11.8M",
    deals: [
      {
        name: "Ion Implant Suite",
        buyer: "Frontier Devices",
        amount: "$7.8M",
        aging: "22 days",
      },
      {
        name: "CT Replacement",
        buyer: "Metro Health",
        amount: "$4M",
        aging: "4 days",
      },
    ],
  },
];

export function PipelineBoardShowcase() {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Pipeline board</CardTitle>
        <CardDescription>Show brokers a kanban snapshot with instant rollups.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 lg:grid-cols-3">
          {columns.map((column) => (
            <Card key={column.stage} className="border-primary/10 bg-muted/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{column.stage}</CardTitle>
                  <Badge variant="outline">{column.value}</Badge>
                </div>
                <CardDescription>{column.deals.length} deals</CardDescription>
              </CardHeader>
              <CardContent className="p-3">
                <ScrollArea className="h-[320px] pr-4">
                  <div className="space-y-3">
                    {column.deals.map((deal) => (
                      <div key={deal.name} className="rounded-2xl border bg-background p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold">{deal.name}</p>
                          <span className="text-xs text-muted-foreground">{deal.aging}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{deal.buyer}</p>
                        <div className="mt-3 flex items-center justify-between text-sm">
                          <span className="font-medium">{deal.amount}</span>
                          <div className="flex gap-1 text-xs text-muted-foreground">
                            <span>Pricing</span>
                            <span>•</span>
                            <span>Docs</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
