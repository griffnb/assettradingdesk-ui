import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { observer } from "mobx-react-lite";

export interface AssetSEOContentProps {
  asset: AssetModel;
}

export const AssetSEOContent = observer(function AssetSEOContent({
  asset,
}: AssetSEOContentProps) {
  const hasManufacturerDescription =
    asset.manufacturer_description &&
    asset.manufacturer_description.trim().length > 0;
  const hasModelDescription =
    asset.model_description && asset.model_description.trim().length > 0;
  const hasSeoContent = hasManufacturerDescription || hasModelDescription;

  if (!hasSeoContent) {
    return null;
  }

  return (
    <section className="flex w-full flex-col items-start gap-6 rounded-xl border-2 border-gray-200 p-6 md:p-12">
      <h2 className="text-2xl font-bold text-gray-900">
        About {asset.manufacturer_name} {asset.model_name}
      </h2>

      {hasManufacturerDescription && (
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-semibold text-gray-800">
            {asset.manufacturer_name}
          </h3>
          <p className="text-base leading-relaxed text-gray-700">
            {asset.manufacturer_description}
          </p>
        </div>
      )}

      {hasModelDescription && (
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-semibold text-gray-800">
            {asset.model_name} Model
          </h3>
          <p className="text-base leading-relaxed text-gray-700">
            {asset.model_description}
          </p>
        </div>
      )}
    </section>
  );
});
