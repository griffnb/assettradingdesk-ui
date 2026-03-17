import { cn } from "@/common_lib/utils/cn";
import { ModelModel } from "@/models/models/model/model/ModelModel";
import { Separator } from "@/ui/shadcn/ui/separator";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { ModelAssetsList } from "./ModelAssetsList";
import { ModelBreadCrumb } from "./ModelBreadCrumb";
import { ModelHeader } from "./ModelHeader";

export interface ModelDetailsProps {
  model: ModelModel;
  className?: string;
}

export const ModelDetails = observer(function ModelDetails({
  model,
  className,
}: ModelDetailsProps) {
  const [assetCount, setAssetCount] = useState(0);

  return (
    <>
      <ModelBreadCrumb model={model} />
      <div
        className={cn(
          "mx-auto flex flex-col items-center gap-8 bg-white p-6 md:w-[1200px]",
          className,
        )}
      >
        <ModelHeader model={model} assetCount={assetCount} />

        <Separator className="my-4" />

        <ModelAssetsList
          model={model}
          onAssetCountChange={setAssetCount}
          className="w-full"
        />

        {model.description && (
          <>
            <Separator className="my-4" />
            <div className="w-full space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">
                About {model.name}
              </h2>
              <div className="prose max-w-none text-gray-700">
                <p>{model.description}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
});
