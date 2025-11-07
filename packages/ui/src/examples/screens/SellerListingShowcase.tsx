"use client";

import { Button } from "@/ui/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/shadcn/ui/card";
import { Input } from "@/ui/shadcn/ui/input";
import { Label } from "@/ui/shadcn/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/shadcn/ui/select";
import { Separator } from "@/ui/shadcn/ui/separator";
import { Switch } from "@/ui/shadcn/ui/switch";
import { Textarea } from "@/ui/shadcn/ui/textarea";

export function SellerListingShowcase() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>List an asset</CardTitle>
        <CardDescription>
          High-fidelity mock form to capture every technical detail a broker needs before routing.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Model</Label>
              <Input placeholder="Search taxonomy…" defaultValue="ASML NXE:3600D" />
            </div>
            <div className="space-y-2">
              <Label>Manufacturer</Label>
              <Select defaultValue="asml">
                <SelectTrigger>
                  <SelectValue placeholder="Select OEM" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asml">ASML</SelectItem>
                  <SelectItem value="lam">Lam Research</SelectItem>
                  <SelectItem value="applied">Applied Materials</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Install year</Label>
              <Input type="number" defaultValue={2020} />
            </div>
            <div className="space-y-2">
              <Label>Site location</Label>
              <Input placeholder="City, Country" defaultValue="Hsinchu, Taiwan" />
            </div>
            <div className="space-y-2">
              <Label>Asking price (USD)</Label>
              <Input type="number" defaultValue={124000000} className="font-mono" />
            </div>
            <div className="space-y-2">
              <Label>Preferred payment structure</Label>
              <Input placeholder="e.g. 30 / 40 / 30 milestone" defaultValue="25 / 50 / 25 milestone" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Configuration notes</Label>
            <Textarea
              rows={5}
              placeholder="List upgrades, beams, automation kits, retrofit work, service coverage, handoff requirements."
              defaultValue="Twin-stage EUV pellicle upgrade complete · Includes two spare source modules · Cymer service through 2026 · APC integration with FabOS coming with license transfer."
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Rigging & de-install window</Label>
              <Input placeholder="e.g. Q1 2026" defaultValue="Feb 10 – Mar 05" />
            </div>
            <div className="space-y-2">
              <Label>Power / facilities requirements</Label>
              <Input placeholder="Short summary" defaultValue="Requires 13.8kV / cleanroom ISO 1" />
            </div>
          </div>

          <div className="rounded-2xl border bg-muted/40 p-4">
            <p className="text-sm font-medium">Disclosures</p>
            <div className="mt-4 space-y-3 text-sm">
              <label className="flex items-center justify-between">
                <div>
                  <p>Active production tool</p>
                  <p className="text-muted-foreground">Ship 10 weeks after deposit</p>
                </div>
                <Switch defaultChecked aria-label="Active production" />
              </label>
              <Separator />
              <label className="flex items-center justify-between">
                <div>
                  <p>OEM service transferable</p>
                  <p className="text-muted-foreground">Signed consent on file</p>
                </div>
                <Switch defaultChecked aria-label="OEM service" />
              </label>
              <Separator />
              <label className="flex items-center justify-between">
                <div>
                  <p>Financing assistance needed</p>
                </div>
                <Switch aria-label="Financing" />
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="border-dashed bg-muted/30">
            <CardHeader>
              <CardTitle>Media upload</CardTitle>
              <CardDescription>Drag photos, BOM PDFs, service logs.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-muted-foreground/30 bg-background/80 p-6 text-center text-sm text-muted-foreground">
                Drop files or <span className="text-primary">browse</span>
                <p className="mt-2 text-xs">Max 5GB · auto-blur serials</p>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between rounded-xl bg-background p-3">
                  <span>floorplan.pdf</span>
                  <span className="text-muted-foreground">Uploading… 68%</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-background p-3">
                  <span>source-module.jpg</span>
                  <span className="text-emerald-600">Verified</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Broker checklist</CardTitle>
              <CardDescription>Everything required for automatic matching.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <label className="flex items-center justify-between">
                <span>Proof of ownership</span>
                <Switch defaultChecked aria-label="Ownership" />
              </label>
              <label className="flex items-center justify-between">
                <span>Recent performance logs</span>
                <Switch defaultChecked aria-label="Logs" />
              </label>
              <label className="flex items-center justify-between">
                <span>Environment survey</span>
                <Switch aria-label="Survey" />
              </label>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Send to auto-matching</Button>
            </CardFooter>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
