import { useAccount } from "@/common_lib/authentication/useAccount";
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
  const { account } = useAccount();
  const isAuthenticated = !!account;

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
    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      console.log("Redirecting to login...");
      // TODO: Implement redirect to login
    }
  };

  const handleSecondaryAction = () => {
    // TODO: Implement secondary action (e.g., request quote)
    console.log("Secondary action clicked for asset:", asset.id);
  };

  const hasManufacturerDescription = asset.manufacturer_description && asset.manufacturer_description.trim().length > 0;
  const hasModelDescription = asset.model_description && asset.model_description.trim().length > 0;
  const hasSeoContent = hasManufacturerDescription || hasModelDescription;

  // Generate JSON-LD structured data for Product schema
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${asset.manufacturer_name} ${asset.model_name}`,
    "description": asset.description || `${asset.manufacturer_name} ${asset.model_name}`,
    "brand": {
      "@type": "Brand",
      "name": asset.manufacturer_name || "",
    },
    "category": asset.category_name || "Industrial Equipment",
    ...(asset.price && {
      "offers": {
        "@type": "Offer",
        "price": asset.price,
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/UsedCondition",
        "url": `https://assettradingdesk.com${asset.publicLink}`,
      },
    }),
    ...(asset.largeImage && !asset.largeImage.includes("placeholder.png") && {
      "image": asset.largeImage,
    }),
    ...(asset.year && {
      "productionDate": asset.year.toString(),
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
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
            isAuthenticated={isAuthenticated}
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

        {/* SEO Content Section */}
        {hasSeoContent && (
          <section className="flex w-full flex-col items-start gap-6 rounded-xl border-2 border-gray-200 p-6 md:p-12">
            <h2 className="text-2xl font-bold text-gray-900">
              About {asset.manufacturer_name} {asset.model_name}
            </h2>

            {hasManufacturerDescription && (
              <div className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold text-gray-800">
                  About {asset.manufacturer_name}
                </h3>
                <p className="text-base leading-relaxed text-gray-700">
                  {asset.manufacturer_description}
                </p>
              </div>
            )}

            {hasModelDescription && (
              <div className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold text-gray-800">
                  About the {asset.model_name} Model
                </h3>
                <p className="text-base leading-relaxed text-gray-700">
                  {asset.model_description}
                </p>
              </div>
            )}
          </section>
        )}
      </div>
    </>
  );
});
