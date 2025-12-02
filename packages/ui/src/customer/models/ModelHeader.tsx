import { ModelModel } from "@/models/models/model/model/ModelModel";
import { Badge } from "@/ui/shadcn/ui/badge";
import { cn } from "@/utils/cn";
import { observer } from "mobx-react-lite";

export interface ModelHeaderProps {
  model: ModelModel;
  assetCount: number;
  className?: string;
}

export const ModelHeader = observer(function ModelHeader({
  model,
  assetCount,
  className,
}: ModelHeaderProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 p-8 text-white",
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
        <div className="rounded-2xl border border-white/20 bg-white/5 px-6 py-4 text-right">
          <p className="text-sm text-white/70">Available Assets</p>
          <p className="text-2xl font-semibold">{assetCount}</p>
          {assetCount > 0 && (
            <p className="text-xs text-white/60">Browse listings below</p>
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
