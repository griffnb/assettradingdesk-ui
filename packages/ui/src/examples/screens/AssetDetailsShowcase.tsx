"use client";

import { AspectRatio } from "@/ui/shadcn/ui/aspect-ratio";
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
import { Separator } from "@/ui/shadcn/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/shadcn/ui/tabs";

const specs = [
  { label: "Model", value: "Helios 7T MRI" },
  { label: "Year", value: "2021" },
  { label: "Gradient Strength", value: "80 mT/m" },
  { label: "Bore Size", value: "70 cm" },
  { label: "Location", value: "Austin, TX" },
  { label: "Verification", value: "Sept 18, 2025" },
];

const highlights = [
  "Full-body neuro + MSK protocol packs included",
  "Factory maintenance plan transferable",
  "Installation support + rigging crew on standby",
  "Seller open to three-phase payment structure",
];

const timeline = [
  { date: "Sep 18", label: "Certified inspector verified asset" },
  { date: "Oct 02", label: "Seller uploaded granular coil inventory" },
  { date: "Oct 14", label: "Buyer submitted configuration questions" },
  { date: "Oct 21", label: "Rigging estimate + freight cleared" },
];

const gallery = [
  "https://images.unsplash.com/photo-1583912372063-3ec9fb247502?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&w=800&q=60",
];

export function AssetDetailsShowcase() {
  return (
    <div className="space-y-6 rounded-3xl border bg-gradient-to-b from-background via-background/80 to-muted/30 p-8 shadow-sm">
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="outline">7T MRI</Badge>
        <Badge variant="secondary" className="bg-emerald-50 text-emerald-800">
          Verified Inventory
        </Badge>
        <span className="text-sm text-muted-foreground">
          Listing #ATD-924A · Updated 2h ago
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
        <Card className="shadow-sm">
          <CardContent className="space-y-4 p-4">
            <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-2xl">
              <img
                src={gallery[0]}
                alt="MRI hero"
                className="h-full w-full object-cover"
              />
            </AspectRatio>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {gallery.slice(1).map((src) => (
                <div
                  key={src}
                  className="overflow-hidden rounded-xl border bg-muted/40"
                >
                  <img src={src} alt="MRI detail" className="h-28 w-full object-cover" />
                </div>
              ))}
              <div className="flex h-28 items-center justify-center rounded-xl border border-dashed text-sm text-muted-foreground">
                +6 media
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-semibold">$3.95M</CardTitle>
              <CardDescription>Includes installation + two supercon coils</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Asking</span>
                <span>$3.95M</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Recent appraisal</span>
                <span>$4.35M</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Preferred payment</span>
                <span>40 / 40 / 20 milestone</span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button className="w-full">Request live demo</Button>
              <Button variant="outline" className="w-full">
                Ask underwriting question
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Next steps</CardTitle>
              <CardDescription>Everything is ready for diligence</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {timeline.map((entry) => (
                <div key={entry.label} className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                  <div>
                    <p className="font-medium">{entry.label}</p>
                    <p className="text-muted-foreground">{entry.date}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardContent className="grid gap-6 p-6 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
          <div className="space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-2xl font-semibold tracking-tight">
                  Helios 7T Whole-Body System
                </h2>
                <Badge variant="secondary">In operation</Badge>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Commissioned in Q4 2021 · 2,400 scan hours · OEM service through Dec 2026 · Fully calibrated
                spectroscopy + fMRI package with inline AI recon server.
              </p>
            </div>

            <Tabs defaultValue="highlights">
              <TabsList className="w-full justify-start overflow-x-auto">
                <TabsTrigger value="highlights">Highlights</TabsTrigger>
                <TabsTrigger value="specs">Specifications</TabsTrigger>
                <TabsTrigger value="compliance">Compliance</TabsTrigger>
              </TabsList>
              <TabsContent value="highlights" className="space-y-3 pt-4">
                {highlights.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl border bg-muted/30 p-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                    <p className="text-sm leading-relaxed text-muted-foreground">{item}</p>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="specs" className="pt-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  {specs.map((spec) => (
                    <div key={spec.label} className="rounded-xl border bg-muted/20 p-4">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">
                        {spec.label}
                      </p>
                      <p className="text-base font-medium">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="compliance" className="space-y-3 pt-4 text-sm text-muted-foreground">
                <p>Full FDA 510(k) clearance · CE mark maintained through 2027</p>
                <p>Shielding report + mezzanine drawings ready for transfer.</p>
                <p>Helium contract secured with fallback supplier in Dallas.</p>
              </TabsContent>
            </Tabs>
          </div>

          <Separator orientation="vertical" className="hidden lg:block" />

          <div className="space-y-4">
            <div className="rounded-2xl border bg-card p-4">
              <p className="text-sm font-medium text-muted-foreground">Buyer fit snapshot</p>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Field strength</span>
                  <Badge className="bg-emerald-500/10 text-emerald-700">Matches</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Budget window</span>
                  <Badge className="bg-amber-500/10 text-amber-700">Within 5%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Timeline</span>
                  <Badge className="bg-blue-500/10 text-blue-700">Aligned</Badge>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border bg-muted/30 p-4 text-sm text-muted-foreground">
              <p>Broker note</p>
              <p className="mt-2">
                “Seller is flexible on removal date if deposit arrives before November. Last audit scored 98/100.”
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
