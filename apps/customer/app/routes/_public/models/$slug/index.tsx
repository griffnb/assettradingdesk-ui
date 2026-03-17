import { ServerService } from "@/common_lib/services/ServerService";
import { ModelModel } from "@/models/models/model/model/ModelModel";
import { Store } from "@/models/store/Store";
import { ModelDetails } from "@/ui/customer/models/ModelDetails";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { data } from "react-router";
import type { Route } from "./+types/index";

export const meta = ({ loaderData }: Route.MetaArgs) => {
  if (!loaderData?.model) {
    return [
      { title: "Model Not Found | Asset Trading Desk" },
      {
        name: "description",
        content: "The requested model could not be found.",
      },
    ];
  }

  const { model, assetCount } = loaderData;
  const title = `${model.manufacturer_name} ${model.name} | Asset Trading Desk`;
  const description =
    model.description ||
    `Browse ${assetCount} available ${model.name} assets from ${model.manufacturer_name}. Find detailed specifications, pricing, and contact sellers.`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${model.manufacturer_name} ${model.name}`,
    description: description,
    brand: {
      "@type": "Brand",
      name: model.manufacturer_name || "",
    },
    category: model.category_name || "",
    manufacturer: {
      "@type": "Organization",
      name: model.manufacturer_name || "",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      offerCount: assetCount,
      availability:
        assetCount > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
  };

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://assettradingdesk.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Assets",
        item: "https://assettradingdesk.com/assets",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: model.category_name || "Category",
        item: `https://assettradingdesk.com/assets?category_id=${model.category_id}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: model.manufacturer_name || "Manufacturer",
        item: `https://assettradingdesk.com/manufacturers/${model.manufacturer_slug}`,
      },
      {
        "@type": "ListItem",
        position: 5,
        name: model.name,
        item: `https://assettradingdesk.com/models/${model.slug}`,
      },
    ],
  };

  return [
    { title },
    { name: "description", content: description },
    {
      name: "keywords",
      content: `${model.name}, ${model.manufacturer_name}, ${model.category_name}, industrial equipment, used equipment, asset trading`,
    },
    {
      tagName: "link",
      rel: "canonical",
      href: `https://assettradingdesk.com/models/${model.slug}`,
    },

    // Open Graph tags
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "product" },
    {
      property: "og:url",
      content: `https://assettradingdesk.com/models/${model.slug}`,
    },
    { property: "og:site_name", content: "Asset Trading Desk" },

    // Twitter Card tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },

    // JSON-LD structured data
    {
      tagName: "script",
      type: "application/ld+json",
      children: JSON.stringify(structuredData),
    },
    {
      tagName: "script",
      type: "application/ld+json",
      children: JSON.stringify(breadcrumbStructuredData),
    },
  ];
};

export async function loader({ params }: Route.LoaderArgs) {
  const slug = params.slug;

  if (!slug) {
    throw data({ model: null, assetCount: 0 }, { status: 404 });
  }

  const resp = await ServerService.callGet("model", "", {
    slug: slug,
    limit: "1",
  });

  if (!resp.success || !resp.data || resp.data.length === 0) {
    throw data({ model: null, assetCount: 0 }, { status: 404 });
  }

  const modelData = resp.data[0];
  const assetCount = modelData.asset_count || 0;

  return data({ model: modelData, assetCount });
}

export default observer(({ loaderData }: Route.ComponentProps) => {
  const [model] = useState<ModelModel>(() =>
    Store.model.load(loaderData.model),
  );

  return <ModelDetails model={model} />;
});
