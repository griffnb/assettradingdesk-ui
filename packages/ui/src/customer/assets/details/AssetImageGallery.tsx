import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { cn } from "@/utils/cn";
import { observer } from "mobx-react-lite";

export interface AssetImageGalleryProps {
  asset: AssetModel;
  className?: string;
}

export const AssetImageGallery = observer(function AssetImageGallery({
  asset,
  className,
}: AssetImageGalleryProps) {
  // Default placeholder if no images
  const displayImages = asset.images("md", true);

  return (
    <div className={cn("flex flex-col gap-5", className)}>
      {/* Main large image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl">
        <img
          src={asset.largeImage}
          alt="Asset main view"
          className="size-full object-cover"
        />
      </div>

      {/* Thumbnail grid */}
      <div className="grid grid-cols-2 gap-5">
        {displayImages.slice(1, 5).map((image, index) => (
          <button
            key={index + 1}
            className={cn(
              "relative aspect-square overflow-hidden rounded-xl transition-all",
              "hover:ring-2 hover:ring-gray-300",
            )}
          >
            <img src={image} className="size-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
});
