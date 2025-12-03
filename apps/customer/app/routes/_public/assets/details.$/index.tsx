import { ServerService } from "@/common_lib/services/ServerService";
import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { Store } from "@/models/store/Store";
import { AssetDetails } from "@/ui/customer/assets/details/AssetDetails";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import type { MetaFunction } from "react-router";
import { data } from "react-router";
import { Route } from "./+types";

export const meta: MetaFunction<typeof loader> = ({ loaderData }) => {
  if (!loaderData?.asset) {
    return [
      { title: "Asset Not Found | Asset Trading Desk" },
      {
        name: "description",
        content: "The requested asset could not be found.",
      },
    ];
  }

  const { asset } = loaderData;
  const title = `${asset.manufacturer_name} ${asset.model_name} | Asset Trading Desk`;
  const description =
    asset.description ||
    `${asset.manufacturer_name} ${asset.model_name} available for sale. ${asset.year ? `Year: ${asset.year}. ` : ""}${asset.price ? `Price: $${asset.price.toLocaleString()}` : "Contact for pricing"}`;
  const imageUrl =
    asset.largeImage && !asset.largeImage.includes("placeholder.png")
      ? asset.largeImage
      : undefined;
  const url = `https://assettradingdesk.com${asset.publicLink}`;

  // Generate JSON-LD structured data for Product schema
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${asset.manufacturer_name} ${asset.model_name}`,
    description:
      asset.description || `${asset.manufacturer_name} ${asset.model_name}`,
    brand: {
      "@type": "Brand",
      name: asset.manufacturer_name || "",
    },
    category: asset.category_name || "Industrial Equipment",
    ...(asset.price && {
      offers: {
        "@type": "Offer",
        price: asset.price,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        itemCondition: "https://schema.org/UsedCondition",
        url: url,
      },
    }),
    ...(imageUrl && {
      image: imageUrl,
    }),
    ...(asset.year && {
      productionDate: asset.year.toString(),
    }),
  };

  return [
    { title },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: url },

    // Open Graph tags
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "product" },
    { property: "og:url", content: url },
    ...(imageUrl ? [{ property: "og:image", content: imageUrl }] : []),
    { property: "og:site_name", content: "Asset Trading Desk" },

    // Twitter Card tags
    {
      name: "twitter:card",
      content: imageUrl ? "summary_large_image" : "summary",
    },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    ...(imageUrl ? [{ name: "twitter:image", content: imageUrl }] : []),

    // Product specific tags
    ...(asset.price
      ? [{ property: "product:price:amount", content: asset.price.toString() }]
      : []),
    { property: "product:price:currency", content: "USD" },
    { property: "product:condition", content: "used" },

    // JSON-LD structured data
    {
      tagName: "script",
      type: "application/ld+json",
      children: JSON.stringify(structuredData),
    },
  ];
};

export async function loader({ params }: { params: { "*": string } }) {
  const paramParts = params["*"]?.split("/") || [];
  const id = paramParts[paramParts.length - 1];

  if (!id) {
    throw data({ asset: null }, { status: 404 });
  }

  const resp = await ServerService.callGet("asset", id);

  if (!resp.success || !resp.data) {
    throw data({ asset: null }, { status: 404 });
  }

  return data({ asset: resp.data as AssetModel });
}

export default observer(({ loaderData }: Route.ComponentProps) => {
  //const params = useParams();
  //
  //const paramParts = params["*"]?.split("/") || [];

  //const id = paramParts[paramParts.length - 1];
  console.log("Loader Data:", loaderData.asset);
  const [asset] = useState<AssetModel>(Store.asset.load(loaderData.asset));

  return <AssetDetails asset={asset} />;
});
