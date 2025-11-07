"use client";

import { Badge } from "@/ui/shadcn/ui/badge";
import { Button } from "@/ui/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/shadcn/ui/card";
import { Progress } from "@/ui/shadcn/ui/progress";
import { Separator } from "@/ui/shadcn/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/shadcn/ui/tabs";

const opportunities = [
  {
    id: "OPP-1182",
    title: "Helios 7T MRI ↔ Pacific Imaging",
    summary: "Exact model match · budget variance +2%",
    buyer: "Pacific Imaging Group",
    seller: "Northern Med Center",
    fit: 92,
    hot: true,
  },
  {
    id: "OPP-1185",
    title: "NXE:3600D ↔ Foundry Expansion",
    summary: "Needs Q2 removal · requires financing",
    buyer: "WaferCore Fab",
    seller: "Capital Foundry",
    fit: 86,
    hot: false,
  },
];

export function OpportunitiesShowcase() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Opportunity review</CardTitle>
        <CardDescription>Give brokers high fidelity accept / decline flows with full context.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="new" className="space-y-4">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="new">New (4)</TabsTrigger>
            <TabsTrigger value="reviewing">Reviewing (7)</TabsTrigger>
            <TabsTrigger value="dismissed">Dismissed</TabsTrigger>
          </TabsList>
          <TabsContent value="new" className="space-y-4">
            {opportunities.map((opp) => (
              <Card key={opp.id} className="border-primary/20">
                <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle className="text-lg">{opp.title}</CardTitle>
                    <CardDescription>{opp.summary}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Badge variant="secondary">{opp.id}</Badge>
                    {opp.hot && (
                      <Badge className="bg-rose-500/10 text-rose-700">Hot match</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border bg-muted/30 p-4 text-sm">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Buyer</p>
                    <p className="text-base font-semibold">{opp.buyer}</p>
                    <p className="text-muted-foreground">Needs install: Jan 15 – Feb 20</p>
                    <Separator className="my-3" />
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Seller</p>
                    <p className="text-base font-semibold">{opp.seller}</p>
                    <p className="text-muted-foreground">Ready to de-install Dec 12</p>
                  </div>
                  <div className="space-y-3 rounded-2xl border bg-background p-4 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Fit score</span>
                      <span className="font-semibold">{opp.fit}%</span>
                    </div>
                    <Progress value={opp.fit} className="h-2" />
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <span>Price delta</span>
                        <Badge variant="outline">+2%</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Spec coverage</span>
                        <Badge variant="outline">100%</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Timeline overlap</span>
                        <Badge variant="outline">35 days</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-3 border-t bg-muted/20 p-4 md:flex-row md:items-center md:justify-between">
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">
                    Actions resolve SLA · use decline reason to train matching
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline">Need more info</Button>
                    <Button variant="destructive">Not interested</Button>
                    <Button>Convert to pipeline</Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
          <TabsContent value="reviewing" className="rounded-2xl border border-dashed p-6 text-center text-sm text-muted-foreground">
            All reviewing opportunities move to a pipeline within 48h.
          </TabsContent>
          <TabsContent value="dismissed" className="rounded-2xl border border-dashed p-6 text-center text-sm text-muted-foreground">
            Declined matches stay searchable for 90 days.
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
