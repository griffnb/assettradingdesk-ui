import { ModelModel } from "@/models/models/model/model/ModelModel";
import { Store } from "@/models/store/Store";
import { LoadingSkeleton } from "@/ui/common/components/loading/LoadingSkeleton";
import { ModelDetails } from "@/ui/customer/models/ModelDetails";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { data, useParams } from "react-router";
import type { MetaFunction } from "react-router";

export const meta: MetaFunction<typeof loader> = ({ data: loaderData }) => {
  if (!loaderData?.model) {
    return [
      { title: "Model Not Found | Asset Trading Desk" },
      { name: "description", content: "The requested model could not be found." },
    ];
  }

  const { model, assetCount } = loaderData;
  const title = `${model.manufacturer_name} ${model.name} | Asset Trading Desk`;
  const description = model.description || `Browse ${assetCount} available ${model.name} assets from ${model.manufacturer_name}. Find detailed specifications, pricing, and contact sellers.`;

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
      availability: assetCount > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
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
    { name: "keywords", content: `${model.name}, ${model.manufacturer_name}, ${model.category_name}, industrial equipment, used equipment, asset trading` },
    { tagName: "link", rel: "canonical", href: `https://assettradingdesk.com/models/${model.slug}` },

    // Open Graph tags
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "product" },
    { property: "og:url", content: `https://assettradingdesk.com/models/${model.slug}` },
    { property: "og:site_name", content: "Asset Trading Desk" },

    // Twitter Card tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },

    // JSON-LD structured data
    { tagName: "script", type: "application/ld+json", children: JSON.stringify(structuredData) },
    { tagName: "script", type: "application/ld+json", children: JSON.stringify(breadcrumbStructuredData) },
  ];
};

export async function loader({ params }: { params: { slug: string } }) {
  const slug = params.slug;

  if (!slug) {
    throw data({ model: null, assetCount: 0 }, { status: 404 });
  }

  const resp = await Store.model.query({ slug: slug, limit: "1" });

  if (!resp.success || !resp.data || resp.data.length === 0) {
    throw data({ model: null, assetCount: 0 }, { status: 404 });
  }

  const model = resp.data[0];
  const assetCount = model.asset_count || 0;

  return data({ model, assetCount });
}

export default observer(() => {
  const params = useParams();
  const slug = params.slug;

  const [model, setModel] = useState<ModelModel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    Store.model
      .query({ slug: slug, limit: "1" })
      .then((resp) => {
        if (resp.success && resp.data && resp.data.length > 0) {
          setModel(resp.data[0]);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (!model) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Model Not Found</h1>
          <p className="mt-2 text-gray-600">
            The model you are looking for does not exist.
          </p>
        </div>
      </div>
    );
  }

  return <ModelDetails model={model} />;
});
