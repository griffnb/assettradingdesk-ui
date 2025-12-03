import { ServerService } from "@/common_lib/services/ServerService";
import { ManufacturerModel } from "@/models/models/manufacturer/model/ManufacturerModel";
import { ModelModel } from "@/models/models/model/model/ModelModel";
import { Store } from "@/models/store/Store";
import { ManufacturerDetails } from "@/ui/customer/manufacturers/ManufacturerDetails";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { data } from "react-router";
import type { Route } from "./+types/index";

export const meta = ({ loaderData }: Route.MetaArgs) => {
  if (!loaderData?.manufacturer) {
    return [
      { title: "Manufacturer Not Found | Asset Trading Desk" },
      {
        name: "description",
        content: "The requested manufacturer could not be found.",
      },
    ];
  }

  const { manufacturer, models } = loaderData;
  const title = `${manufacturer.name} - Asset Trading Desk`;
  const description =
    manufacturer.description ||
    `Browse ${models.length} equipment models from ${manufacturer.name}. Find industrial assets and machinery on Asset Trading Desk.`;

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
    {
      tagName: "link",
      rel: "canonical",
      href: `https://assettradingdesk.com/manufacturers/${manufacturer.slug}`,
    },

    // Open Graph tags
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    {
      property: "og:url",
      content: `https://assettradingdesk.com/manufacturers/${manufacturer.slug}`,
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
  ];
};

export async function loader({ params }: Route.LoaderArgs) {
  const slug = params.slug;

  if (!slug) {
    throw data({ manufacturer: null, models: [] }, { status: 404 });
  }

  const manufacturerResp = await ServerService.callGet("manufacturer", "", {
    slug,
  });
  if (
    !manufacturerResp.success ||
    !manufacturerResp.data ||
    manufacturerResp.data.length === 0
  ) {
    throw data({ manufacturer: null, models: [] }, { status: 404 });
  }

  const manufacturerData = manufacturerResp.data[0];
  const modelsResp = await ServerService.callGet("model", "", {
    manufacturer_id: manufacturerData.id,
  });
  const modelsData =
    modelsResp.success && modelsResp.data ? modelsResp.data : [];

  return data({
    manufacturer: manufacturerData,
    models: modelsData,
  });
}

export default observer(({ loaderData }: Route.ComponentProps) => {
  const [manufacturer] = useState<ManufacturerModel>(() =>
    Store.manufacturer.load(loaderData.manufacturer),
  );
  const [models] = useState<ModelModel[]>(() =>
    loaderData.models.map((modelData: any) => Store.model.load(modelData)),
  );

  return <ManufacturerDetails manufacturer={manufacturer} models={models} />;
});
