"use client";

import { Badge } from "@/ui/shadcn/ui/badge";
import { Button } from "@/ui/shadcn/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/ui/shadcn/ui/card";
import { Checkbox } from "@/ui/shadcn/ui/checkbox";
import { Input } from "@/ui/shadcn/ui/input";
import { Label } from "@/ui/shadcn/ui/label";
import { Switch } from "@/ui/shadcn/ui/switch";

const savedSearches = [
  {
    name: "7T MRI buyers",
    filters: "Field strength ≥7T · verified · US",
    cadence: "Instant",
  },
  {
    name: "EUV scanners",
    filters: "EUV · removal < 90d · price < $150M",
    cadence: "Daily digest",
  },
];

export function SearchAlertsShowcase() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Search + alerts</CardTitle>
        <CardDescription>Capture buyer intent and let them follow assets like a pro.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-4 rounded-3xl border bg-muted/20 p-6">
          <Label className="text-sm font-semibold">Build a search</Label>
          <div className="grid gap-4 md:grid-cols-2">
            <Input placeholder="Keyword, OEM, model" defaultValue="Helios" />
            <Input placeholder="Location" defaultValue="North America" />
            <Input placeholder="Budget ceiling" defaultValue="$5,000,000" />
            <Input placeholder="Timeline" defaultValue="Q1 2026" />
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            <Badge variant="outline">Field strength ≥ 7T</Badge>
            <Badge variant="outline">Has verification</Badge>
            <Badge variant="outline">Auto create request</Badge>
          </div>
          <div className="rounded-2xl border border-dashed bg-background p-4 text-sm text-muted-foreground">
            When saved, auto-create matching requests and alert brokers when new assets go live.
          </div>
          <div className="flex flex-wrap justify-end gap-2">
            <Button variant="ghost">Preview results</Button>
            <Button>Save search</Button>
          </div>
        </div>

        <div className="space-y-4">
          <Card className="border-muted">
            <CardHeader>
              <CardTitle className="text-base">Saved searches</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {savedSearches.map((search) => (
                <div key={search.name} className="rounded-2xl border bg-background p-4 text-sm">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{search.name}</p>
                    <Badge variant="outline">{search.cadence}</Badge>
                  </div>
                  <p className="text-muted-foreground">{search.filters}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-muted">
            <CardHeader>
              <CardTitle className="text-base">Alert delivery</CardTitle>
              <CardDescription>Buyers pick how noisy their inbox should be.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <label className="flex items-center justify-between">
                <span>Instant push (critical matches)</span>
                <Switch defaultChecked />
              </label>
              <label className="flex items-center justify-between">
                <span>Daily digest</span>
                <Switch defaultChecked />
              </label>
              <label className="flex items-center justify-between">
                <span>Weekly recap</span>
                <Switch />
              </label>
              <div className="mt-4 rounded-2xl border bg-muted/30 p-4 text-xs text-muted-foreground">
                <p className="font-semibold text-foreground">Alert preview</p>
                <p className="mt-1">
                  {""}"Helios 7T MRI" listed in Austin · Verified · Asking $3.95M. Matches saved search “7T MRI buyers”.
                </p>
                <p className="mt-1">CTA: Review opportunity</p>
              </div>
            </CardContent>
          </Card>

          <div className="rounded-2xl border bg-muted/10 p-4 text-sm">
            <p className="font-semibold">Push to broker</p>
            <p className="text-muted-foreground">
              Enable “send to broker” and anytime a buyer saves a search the corresponding broker org is notified with
              context.
            </p>
            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <Checkbox defaultChecked id="broker" />
              <Label htmlFor="broker">Send digest to broker team</Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
