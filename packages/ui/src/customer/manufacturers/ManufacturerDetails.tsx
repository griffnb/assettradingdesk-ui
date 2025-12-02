import { ManufacturerModel } from "@/models/models/manufacturer/model/ManufacturerModel";
import { ModelModel } from "@/models/models/model/model/ModelModel";
import { Badge } from "@/ui/shadcn/ui/badge";
import { Card, CardContent } from "@/ui/shadcn/ui/card";
import { Separator } from "@/ui/shadcn/ui/separator";
import { cn } from "@/utils/cn";
import { observer } from "mobx-react-lite";
import { Link } from "react-router";
import { ManufacturerBreadcrumb } from "./ManufacturerBreadcrumb";
import { ManufacturerModelCard } from "./ManufacturerModelCard";

export interface ManufacturerDetailsProps {
  manufacturer: ManufacturerModel;
  models: ModelModel[];
  className?: string;
}

export const ManufacturerDetails = observer(function ManufacturerDetails({
  manufacturer,
  models,
  className,
}: ManufacturerDetailsProps) {

  const totalAssets = models.reduce((sum, model) => sum + (model.asset_count || 0), 0);

  return (
    <div className={cn("flex flex-col", className)}>
      <ManufacturerBreadcrumb manufacturer={manufacturer} />

      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 p-6">
        {/* Hero Section */}
        <div className="rounded-3xl border bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-8 text-white shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex-1">
              <p className="text-sm uppercase tracking-widest text-white/70">Manufacturer</p>
              <h1 className="mt-2 text-4xl font-bold">{manufacturer.name}</h1>
              {manufacturer.description && (
                <p className="mt-4 text-base leading-relaxed text-white/90">{manufacturer.description}</p>
              )}
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 px-8 py-6 text-right backdrop-blur-sm">
              <p className="text-sm text-white/70">Total Models</p>
              <p className="text-3xl font-bold">{models.length}</p>
              <p className="mt-2 text-xs text-white/60">{totalAssets} assets available</p>
            </div>
          </div>
        </div>

        {/* Models Grid */}
        {models.length > 0 ? (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Available Models</h2>
              <Badge variant="outline" className="text-sm">
                {models.length} {models.length === 1 ? "model" : "models"}
              </Badge>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {models.map((model) => (
                <ManufacturerModelCard key={model.id} model={model} manufacturer={manufacturer} />
              ))}
            </div>
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-lg text-muted-foreground">No models available for this manufacturer yet.</p>
            </CardContent>
          </Card>
        )}

        {/* SEO Content Section */}
        {manufacturer.description && (
          <>
            <Separator className="my-4" />
            <div className="prose prose-slate max-w-none">
              <h2 className="text-xl font-semibold text-gray-900">About {manufacturer.name}</h2>
              <p className="mt-4 text-gray-700">{manufacturer.description}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
});
