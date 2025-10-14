import { cn } from "@/utils/cn";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { AssetImageGallery } from "./AssetImageGallery";
import { ProductInfo } from "./ProductInfo";
import { SimilarListings } from "./SimilarListings";

export interface AssetDetailsPageBodyProps {
  // Asset data
  asset: {
    id: string;
    title: string;
    category: string;
    price: number;
    currency?: string;
    description: string;
    images: string[];
    badges?: string[];
    specs: { label: string; value: string }[];
    additionalDescription?: string;
    additionalSpecs?: { label: string; value: string }[];
  };
  // Similar assets
  similarAssets: any[];
  resultCount: number;
  searchTerm: string;
  className?: string;
}

export const AssetDetailsPageBody = observer(function AssetDetailsPageBody({
  asset,
  similarAssets,
  resultCount,
  searchTerm,
  className,
}: AssetDetailsPageBodyProps) {
  const [sortBy, setSortBy] = useState("featured");

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: asset.title,
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
    <div
      className={cn(
        "flex w-full flex-col items-center gap-16 bg-white p-6",
        className,
      )}
    >
      {/* Main product section */}
      <div className="flex items-start gap-12 rounded-xl border-2 border-gray-200 p-12">
        {/* Left side - Image gallery */}
        <AssetImageGallery
          images={asset.images}
          className="flex shrink-0 flex-col items-start justify-center gap-5"
        />

        {/* Right side - Product information */}
        <ProductInfo
          title={asset.title}
          category={asset.category}
          price={asset.price}
          currency={asset.currency}
          description={asset.description}
          badges={asset.badges}
          specs={asset.specs}
          additionalDescription={asset.additionalDescription}
          additionalSpecs={asset.additionalSpecs}
          onShare={handleShare}
          onFavorite={handleFavorite}
          onPrimaryAction={handlePrimaryAction}
          onSecondaryAction={handleSecondaryAction}
        />
      </div>

      {/* Similar listings section */}
      <SimilarListings
        assets={similarAssets}
        resultCount={resultCount}
        searchTerm={searchTerm}
        sortBy={sortBy}
        onSortChange={setSortBy}
        className="flex w-full flex-col items-start gap-5"
      />
    </div>
  );
});
