import { ManufacturerModel } from "@/models/models/manufacturer/model/ManufacturerModel";
import { ModelModel } from "@/models/models/model/model/ModelModel";
import { Badge } from "@/ui/shadcn/ui/badge";
import { Card, CardContent } from "@/ui/shadcn/ui/card";
import { Separator } from "@/ui/shadcn/ui/separator";
import { cn } from "@/utils/cn";
import { observer } from "mobx-react-lite";
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
  const totalAssets = models.reduce(
    (sum, model) => sum + (model.asset_count || 0),
    0,
  );

  return (
    <>
      <ManufacturerBreadcrumb manufacturer={manufacturer} />
      <div
        className={cn(
          "mx-auto flex flex-col items-center gap-8 bg-white p-6 md:w-[1200px]",
          className,
        )}
      >
        {/* Hero Section */}
        <div className="w-full rounded-3xl border bg-[url('/img/hero2.png')] bg-cover bg-center p-8 text-white">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex-1">
              <p className="text-sm uppercase tracking-widest text-white/70">
                Manufacturer
              </p>
              <h1 className="text-3xl font-semibold">{manufacturer.name}</h1>
              {manufacturer.description && (
                <p className="mt-2 text-sm text-white/80">
                  {manufacturer.description}
                </p>
              )}
            </div>
            <div className="rounded-2xl border border-white/20 bg-gray-500/50 px-6 py-4 text-right">
              <p className="text-sm text-white/90">Total Models</p>
              <p className="text-2xl font-semibold">{models.length}</p>
              {totalAssets > 0 && (
                <p className="text-xs text-white/90">
                  {totalAssets} assets available
                </p>
              )}
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-white/20 text-white">
              {models.length} {models.length === 1 ? "Model" : "Models"}
            </Badge>
            {totalAssets > 0 && (
              <Badge variant="secondary" className="bg-white/20 text-white">
                {totalAssets} Available Assets
              </Badge>
            )}
          </div>
        </div>

        <Separator className="my-4" />

        {/* Models Grid */}
        {models.length > 0 ? (
          <div className="w-full space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">
                Available Models
              </h2>
              <Badge variant="outline" className="text-sm">
                {models.length} {models.length === 1 ? "model" : "models"}
              </Badge>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {models.map((model) => (
                <ManufacturerModelCard
                  key={model.id}
                  model={model}
                  manufacturer={manufacturer}
                />
              ))}
            </div>
          </div>
        ) : (
          <Card className="w-full">
            <CardContent className="py-12 text-center">
              <p className="text-lg text-muted-foreground">
                No models available for this manufacturer yet.
              </p>
            </CardContent>
          </Card>
        )}

        {/* SEO Content Section */}
        {manufacturer.description && (
          <>
            <Separator className="my-4" />
            <div className="w-full space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">
                About {manufacturer.name}
              </h2>
              <div className="prose max-w-none text-gray-700">
                <p>{manufacturer.description}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
});
