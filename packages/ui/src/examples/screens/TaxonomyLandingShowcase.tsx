"use client";

import { Badge } from "@/ui/shadcn/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/ui/shadcn/ui/card";
import { Separator } from "@/ui/shadcn/ui/separator";

const featuredAssets = [
  {
    title: "Helios 7T MRI",
    summary: "Neuro + MSK tuned · US compliance",
    price: "$3.9M",
  },
  {
    title: "Helios 5T Compact",
    summary: "Compact footprint · 980 scan hours",
    price: "$2.1M",
  },
  {
    title: "Helios 7T Research",
    summary: "Research license · Helsinki",
    price: "$3.4M",
  },
];

export function TaxonomyLandingShowcase() {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <CardTitle>Helios MRI Platform</CardTitle>
            <CardDescription>Manufacturer detail page with SEO-friendly copy + live counts.</CardDescription>
          </div>
          <Badge variant="outline">16 live assets</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-3xl border bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 p-8 text-white">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-widest text-white/70">Manufacturer</p>
              <h2 className="text-3xl font-semibold">Apex Medical Systems · Helios Line</h2>
              <p className="mt-2 text-sm text-white/80">
                Six generations of high-field MRI platforms optimized for translational research and flagship neuro centers.
              </p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/5 px-6 py-4 text-right">
              <p className="text-sm text-white/70">Avg. resale</p>
              <p className="text-2xl font-semibold">$3.7M</p>
              <p className="text-xs text-white/60">↑ 6% vs last quarter</p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {["7T", "5T", "Compact", "Research", "Hybrid"]?.map((variant) => (
              <Badge key={variant} variant="secondary" className="bg-white/20 text-white">
                {variant} series
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {featuredAssets.map((asset) => (
            <Card key={asset.title} className="border-primary/10">
              <CardContent className="space-y-2 p-4">
                <div className="aspect-[4/3] rounded-2xl bg-muted" />
                <p className="text-base font-semibold">{asset.title}</p>
                <p className="text-sm text-muted-foreground">{asset.summary}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{asset.price}</Badge>
                  <button className="text-sm text-primary">View</button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Separator />

        <div className="grid gap-4 lg:grid-cols-3">
          <div>
            <p className="text-sm uppercase tracking-wide text-muted-foreground">Top geographies</p>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span>US · 7 assets</span>
                <Badge variant="outline">Hot</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>EU · 5 assets</span>
                <Badge variant="outline">Stable</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>APAC · 4 assets</span>
                <Badge variant="outline">Emerging</Badge>
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm uppercase tracking-wide text-muted-foreground">Popular configs</p>
            <div className="mt-3 space-y-2 text-sm">
              <p>• Dual gradient, spectroscopy ready</p>
              <p>• Compact footprint mod</p>
              <p>• Research license transferred</p>
            </div>
          </div>
          <div>
            <p className="text-sm uppercase tracking-wide text-muted-foreground">Related requests</p>
            <div className="mt-3 space-y-2 text-sm">
              <p>Pacific Imaging · 7T install – budget $4.1M</p>
              <p>Helios research center · 5T upgrade – budget $2.5M</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
