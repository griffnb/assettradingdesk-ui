import { cn } from "@/common_lib/utils/cn";
import { ManufacturerModel } from "@/models/models/manufacturer/model/ManufacturerModel";
import { ModelModel } from "@/models/models/model/model/ModelModel";
import { Badge } from "@/ui/shadcn/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/shadcn/ui/card";
import { PackageIcon } from "lucide-react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router";

export interface ManufacturerModelCardProps {
  model: ModelModel;
  manufacturer: ManufacturerModel;
  className?: string;
}

export const ManufacturerModelCard = observer(function ManufacturerModelCard({
  model,

  className,
}: ManufacturerModelCardProps) {
  const modelUrl = model.slug ? `/models/${model.slug}` : `/models/${model.id}`;

  return (
    <Link
      to={modelUrl}
      className="group block transition-transform hover:scale-[1.02]"
    >
      <Card
        className={cn(
          "h-full border-slate-200 transition-shadow hover:shadow-lg",
          className,
        )}
      >
        <CardHeader className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-colors group-hover:bg-slate-200">
              <PackageIcon className="size-6" />
            </div>
            {model.asset_count > 0 && (
              <Badge variant="secondary" className="shrink-0">
                {model.asset_count}{" "}
                {model.asset_count === 1 ? "asset" : "assets"}
              </Badge>
            )}
          </div>
          <div>
            <CardTitle className="line-clamp-2 text-lg leading-snug">
              {model.name}
            </CardTitle>
            {model.category_name && (
              <CardDescription className="mt-1 text-xs">
                {model.category_name}
              </CardDescription>
            )}
          </div>
        </CardHeader>
        {model.description && (
          <CardContent>
            <p className="line-clamp-3 text-sm text-muted-foreground">
              {model.description}
            </p>
          </CardContent>
        )}
      </Card>
    </Link>
  );
});
