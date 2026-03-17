"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/ui/shadcn/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/ui/shadcn/ui/chart";
import { Progress } from "@/ui/shadcn/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/shadcn/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/shadcn/ui/tabs";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const revenueData = [
  { stage: "New", value: 12.2 },
  { stage: "Qual", value: 18.3 },
  { stage: "Specs", value: 22.1 },
  { stage: "Negotiate", value: 14.5 },
  { stage: "Closed", value: 9.3 },
];

const kpis = [
  { label: "Active buyers", value: "142", delta: "+12% MoM" },
  { label: "Live assets", value: "58", delta: "+4 listing" },
  { label: "Match acceptance", value: "63%", delta: "+6 pts" },
];

const deals = [
  { name: "Helios 7T MRI", stage: "Negotiation", value: "$3.9M", owner: "Riley" },
  { name: "NXE:3600", stage: "Specifications", value: "$124M", owner: "Serena" },
  { name: "Ion Implant Suite", stage: "Qualification", value: "$7.8M", owner: "Marco" },
];

export function AnalyticsDashboardShowcase() {
  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle>Broker analytics</CardTitle>
        <CardDescription>Blend pipeline stats, buyer intent, and match performance in a single overview.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          {kpis.map((kpi) => (
            <Card key={kpi.label} className="border-primary/10">
              <CardHeader className="pb-2">
                <CardDescription>{kpi.label}</CardDescription>
                <CardTitle className="text-3xl">{kpi.value}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{kpi.delta}</CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
          <Card>
            <CardHeader>
              <CardTitle>Revenue by stage</CardTitle>
              <CardDescription>Rolling 30 day snapshot</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  revenue: {
                    label: "USD (M)",
                    color: "hsl(var(--chart-1))",
                  },
                }}
              >
                <BarChart data={revenueData}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="stage" tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" fill="var(--color-revenue)" radius={6} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Match health</CardTitle>
              <CardDescription>Top signals buyers care about.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <div>
                <p className="mb-1 text-xs uppercase tracking-wide">Price alignment</p>
                <Progress value={72} />
                <p className="mt-1">72% of accepted matches are within ±5% budget</p>
              </div>
              <div>
                <p className="mb-1 text-xs uppercase tracking-wide">Timeline overlap</p>
                <Progress value={64} className="bg-muted" />
                <p className="mt-1">64% share at least 30 days of availability</p>
              </div>
              <div>
                <p className="mb-1 text-xs uppercase tracking-wide">Config certainty</p>
                <Progress value={88} className="bg-muted" />
                <p className="mt-1">88% of requests include required metadata</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="pipeline">
          <TabsList>
            <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>
          <TabsContent value="pipeline" className="rounded-2xl border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Deal</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deals.map((deal) => (
                  <TableRow key={deal.name}>
                    <TableCell className="font-medium">{deal.name}</TableCell>
                    <TableCell>{deal.stage}</TableCell>
                    <TableCell>{deal.owner}</TableCell>
                    <TableCell className="text-right">{deal.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent
            value="activity"
            className="rounded-2xl border bg-muted/20 p-6 text-sm text-muted-foreground"
          >
            Activity stream placeholder – plug in timeline or broker actions here.
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
