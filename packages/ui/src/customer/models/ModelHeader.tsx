import { cn } from "@/common_lib/utils/cn";
import { ModelModel } from "@/models/models/model/model/ModelModel";
import { Badge } from "@/ui/shadcn/ui/badge";
import { observer } from "mobx-react-lite";

export interface ModelHeaderProps {
  model: ModelModel;
  assetCount: number;
  className?: string;
}

//TODO pull out to a reusable component and put in manufacturers index / details and categories index / details
export const ModelHeader = observer(function ModelHeader({
  model,
  assetCount,
  className,
}: ModelHeaderProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border bg-[url('/img/hero2.png')] bg-cover bg-center p-8 text-white",
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm uppercase tracking-widest text-white/70">
            Model
          </p>
          <h1 className="text-3xl font-semibold">
            {model.manufacturer_name} · {model.name}
          </h1>
          {model.description && (
            <p className="mt-2 text-sm text-white/80">{model.description}</p>
          )}
        </div>
        <div className="rounded-2xl border border-white/20 bg-gray-500/50 px-6 py-4 text-right">
          <p className="text-sm text-white/90">Available Assets</p>
          <p className="text-2xl font-semibold">{assetCount}</p>
          {assetCount > 0 && (
            <p className="text-xs text-white/90">Browse listings below</p>
          )}
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {model.category_name && (
          <Badge variant="secondary" className="bg-white/20 text-white">
            {model.category_name}
          </Badge>
        )}
        {model.manufacturer_name && (
          <Badge variant="secondary" className="bg-white/20 text-white">
            {model.manufacturer_name}
          </Badge>
        )}
      </div>
    </div>
  );
});
