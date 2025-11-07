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
import { Checkbox } from "@/ui/shadcn/ui/checkbox";
import { Input } from "@/ui/shadcn/ui/input";
import { Label } from "@/ui/shadcn/ui/label";
import { ScrollArea } from "@/ui/shadcn/ui/scroll-area";
import { Separator } from "@/ui/shadcn/ui/separator";
import { Slider } from "@/ui/shadcn/ui/slider";
import { Switch } from "@/ui/shadcn/ui/switch";

const categories = [
  "Imaging",
  "Semiconductor",
  "Additive",
  "Test & Metrology",
  "Life Sciences",
];

const manufacturers = ["GE", "Siemens", "Lam", "ASML", "Applied"];

const assets = [
  {
    title: "Helios 7T MRI",
    subtitle: "Austin, TX · 1.8k scan hours",
    price: "$3.9M",
    status: "Verified",
    tags: ["Neuro", "In operation"],
  },
  {
    title: "EUV Scanner NXE:3600",
    subtitle: "Hsinchu, TW · 2020 install",
    price: "$124M",
    status: "Broker exclusive",
    tags: ["Foundry", "Hot"],
  },
  {
    title: "AMR Additive Cell",
    subtitle: "Portland, OR · 6 bay",
    price: "$5.4M",
    status: "New arrival",
    tags: ["Ti-6Al-4V", "Automation"],
  },
];

export function AssetCatalogShowcase() {
  return (
    <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
      <Card className="lg:sticky lg:top-6">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>
            Tune the marketplace feed in seconds.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="search">Keyword or model</Label>
            <Input
              id="search"
              placeholder="Search models, OEMs, features"
              className="bg-muted"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Only active inventory</Label>
              <Switch defaultChecked aria-label="Only active" />
            </div>
            <div className="flex items-center justify-between">
              <Label>Has verified photos</Label>
              <Switch defaultChecked aria-label="Has photos" />
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <Label>Budget window</Label>
            <Slider
              defaultValue={[20, 80]}
              min={0}
              max={100}
              step={5}
              className="py-4"
            />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>$250k</span>
              <span>$120M</span>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <Label>Categories</Label>
            <div className="space-y-2 text-sm">
              {categories.map((category) => (
                <label key={category} className="flex items-center gap-3">
                  <Checkbox defaultChecked={category === "Semiconductor"} />
                  <span>{category}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label>Manufacturers</Label>
            <ScrollArea className="h-32 rounded border">
              <div className="space-y-2 p-3 text-sm">
                {manufacturers.map((make) => (
                  <label key={make} className="flex items-center gap-3">
                    <Checkbox defaultChecked={make === "Lam"} />
                    <span>{make} Corporation</span>
                  </label>
                ))}
              </div>
            </ScrollArea>
          </div>

          <Button className="w-full">Save filter preset</Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm text-muted-foreground">
              42 matches · updated moments ago
            </p>
            <p className="text-lg font-semibold">Semiconductor + Imaging</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Sort: Recently verified
            </Button>
            <Button variant="ghost" size="sm">
              Export list
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {assets.map((asset) => (
            <Card key={asset.title} className="flex flex-col">
              <CardContent className="space-y-4 p-4">
                <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
                  <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                    Photo ready
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{asset.title}</h3>
                    <Badge variant="secondary">{asset.price}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {asset.subtitle}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {asset.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="border-dashed"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <Separator />
              <CardFooter className="flex items-center justify-between px-4 py-3 text-sm text-muted-foreground">
                <span>{asset.status}</span>
                <Button size="sm">View details</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
