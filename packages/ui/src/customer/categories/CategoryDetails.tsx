import { CategoryModel } from "@/models/models/category/model/CategoryModel";
import { ModelModel } from "@/models/models/model/model/ModelModel";
import { Badge } from "@/ui/shadcn/ui/badge";
import { Card, CardContent } from "@/ui/shadcn/ui/card";
import { Separator } from "@/ui/shadcn/ui/separator";
import { cn } from "@/utils/cn";
import { observer } from "mobx-react-lite";
import { CategoryBreadcrumb } from "./CategoryBreadcrumb";
import { CategoryModelCard } from "./CategoryModelCard";

export interface CategoryDetailsProps {
  category: CategoryModel;
  models: ModelModel[];
  className?: string;
}

export const CategoryDetails = observer(function CategoryDetails({
  category,
  models,
  className,
}: CategoryDetailsProps) {
  const totalAssets = models.reduce(
    (sum, model) => sum + (model.asset_count || 0),
    0,
  );

  return (
    <>
      <CategoryBreadcrumb category={category} />
      <div
        className={cn(
          "mx-auto flex flex-col items-center gap-8 bg-white p-6 md:w-[1200px]",
          className,
        )}
      >
        {/* Hero Section */}
        <div className="w-full rounded-3xl border bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 p-8 text-white">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex-1">
              <p className="text-sm uppercase tracking-widest text-white/70">
                Category
              </p>
              <h1 className="text-3xl font-semibold">{category.name}</h1>
              {category.description && (
                <p className="mt-2 text-sm text-white/80">
                  {category.description}
                </p>
              )}
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/5 px-6 py-4 text-right">
              <p className="text-sm text-white/70">Total Models</p>
              <p className="text-2xl font-semibold">{models.length}</p>
              {totalAssets > 0 && (
                <p className="text-xs text-white/60">
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
            {category.industry_name && (
              <Badge variant="secondary" className="bg-white/20 text-white">
                {category.industry_name}
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
                <CategoryModelCard
                  key={model.id}
                  model={model}
                  category={category}
                />
              ))}
            </div>
          </div>
        ) : (
          <Card className="w-full">
            <CardContent className="py-12 text-center">
              <p className="text-lg text-muted-foreground">
                No models available in this category yet.
              </p>
            </CardContent>
          </Card>
        )}

        {/* SEO Content Section */}
        {category.description && (
          <>
            <Separator className="my-4" />
            <div className="w-full space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">
                About {category.name}
              </h2>
              <div className="prose max-w-none text-gray-700">
                <p>{category.description}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
});
