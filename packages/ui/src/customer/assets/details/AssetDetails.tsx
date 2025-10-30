import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { cn } from "@/utils/cn";
import { observer } from "mobx-react-lite";
import { AssetBreadCrumb } from "./AssetBreadCrumb";
import { AssetImageGallery } from "./AssetImageGallery";
import { ProductInfo } from "./ProductInfo";
import { SimilarListings } from "./SimilarListings";

export interface AssetDetailsProps {
  // Asset data
  asset: AssetModel;
  // Similar assets
}

export const AssetDetails = observer(function AssetDetails({
  asset,
}: AssetDetailsProps) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: asset.model_name || "",
        text: asset.description,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleFavorite = () => {
    // TODO: Implement favorite functionality
    console.log("Favorite clicked for asset:", asset.id);
  };

  const handlePrimaryAction = () => {
    // TODO: Implement primary action (e.g., contact seller)
    console.log("Primary action clicked for asset:", asset.id);
  };

  const handleSecondaryAction = () => {
    // TODO: Implement secondary action (e.g., request quote)
    console.log("Secondary action clicked for asset:", asset.id);
  };

  return (
    <>
      <AssetBreadCrumb asset={asset} />
      <div
        className={cn(
          "mx-auto flex flex-col items-center gap-16 bg-white p-6 md:w-[1200px]",
        )}
      >
        {/* Main product section */}
        <div className="flex w-full flex-col items-start gap-12 rounded-xl border-2 border-gray-200 p-4 md:flex-row md:p-12">
          {/* Left side - Image gallery */}
          <AssetImageGallery
            asset={asset}
            className="flex w-full shrink-0 flex-col items-start justify-center gap-5 md:w-1/2"
          />

          {/* Right side - Product information */}
          <ProductInfo
            asset={asset}
            onShare={handleShare}
            onFavorite={handleFavorite}
            onPrimaryAction={handlePrimaryAction}
            onSecondaryAction={handleSecondaryAction}
            className="w-full md:w-1/2"
          />
        </div>

        {/* Similar listings section */}
        <SimilarListings
          asset={asset}
          className="flex w-full flex-col items-start gap-5"
        />
      </div>
    </>
  );
});
