import { ManufacturerModel } from "@/models/models/manufacturer/model/ManufacturerModel";
import { ModelModel } from "@/models/models/model/model/ModelModel";
import { Store } from "@/models/store/Store";
import { LoadingSkeleton } from "@/ui/common/components/loading/LoadingSkeleton";
import { ManufacturerDetails } from "@/ui/customer/manufacturers/ManufacturerDetails";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { data, useParams } from "react-router";
import type { MetaFunction } from "react-router";

export const meta: MetaFunction<typeof loader> = ({ data: loaderData }) => {
  if (!loaderData?.manufacturer) {
    return [
      { title: "Manufacturer Not Found | Asset Trading Desk" },
      { name: "description", content: "The requested manufacturer could not be found." },
    ];
  }

  const { manufacturer, models } = loaderData;
  const title = `${manufacturer.name} - Asset Trading Desk`;
  const description = manufacturer.description || `Browse ${models.length} equipment models from ${manufacturer.name}. Find industrial assets and machinery on Asset Trading Desk.`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Brand",
    name: manufacturer.name,
    description: manufacturer.description,
    url: `https://assettradingdesk.com/manufacturers/${manufacturer.slug}`,
    numberOfProducts: models.length,
  };

  return [
    { title },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: `https://assettradingdesk.com/manufacturers/${manufacturer.slug}` },

    // Open Graph tags
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: `https://assettradingdesk.com/manufacturers/${manufacturer.slug}` },
    { property: "og:site_name", content: "Asset Trading Desk" },

    // Twitter Card tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },

    // JSON-LD structured data
    { tagName: "script", type: "application/ld+json", children: JSON.stringify(structuredData) },
  ];
};

export async function loader({ params }: { params: { slug: string } }) {
  const slug = params.slug;

  if (!slug) {
    throw data({ manufacturer: null, models: [] }, { status: 404 });
  }

  const manufacturerResp = await Store.manufacturer.query({ slug });
  if (!manufacturerResp.success || !manufacturerResp.data || manufacturerResp.data.length === 0) {
    throw data({ manufacturer: null, models: [] }, { status: 404 });
  }

  const manufacturer = manufacturerResp.data[0];

  const modelsResp = await Store.model.query({ manufacturer_id: manufacturer.id });
  const models = modelsResp.success && modelsResp.data ? modelsResp.data : [];

  return data({ manufacturer, models });
}

export default observer(() => {
  const params = useParams();
  const slug = params.slug;

  const [manufacturer, setManufacturer] = useState<ManufacturerModel | null>(null);
  const [models, setModels] = useState<ModelModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      setLoading(true);

      // Fetch manufacturer by slug
      const manufacturerResp = await Store.manufacturer.query({ slug });
      if (manufacturerResp.success && manufacturerResp.data && manufacturerResp.data.length > 0) {
        const manufacturerData = manufacturerResp.data[0];
        setManufacturer(manufacturerData);

        // Fetch models for this manufacturer
        const modelsResp = await Store.model.query({ manufacturer_id: manufacturerData.id });
        if (modelsResp.success && modelsResp.data) {
          setModels(modelsResp.data);
        }
      }

      setLoading(false);
    };

    fetchData();
  }, [slug]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (!manufacturer) {
    return <div className="p-8 text-center">Manufacturer not found</div>;
  }

  return <ManufacturerDetails manufacturer={manufacturer} models={models} />;
});
