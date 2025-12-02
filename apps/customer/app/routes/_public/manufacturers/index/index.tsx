import { ManufacturersIndex } from "@/customer/pods/manufacturers/ManufacturersIndex";
import { Store } from "@/models/store/Store";
import { data } from "react-router";
import type { MetaFunction } from "react-router";

export const meta: MetaFunction<typeof loader> = ({ data: loaderData }) => {
  const manufacturers = loaderData?.manufacturers || [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": manufacturers.map((manufacturer: any, index: number) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Brand",
        "name": manufacturer.name,
        "description": manufacturer.description || `Browse ${manufacturer.name} equipment on Asset Trading Desk`,
        "url": `https://assettradingdesk.com/manufacturers/${manufacturer.slug}`,
      }
    }))
  };

  return [
    { title: "Equipment Manufacturers | Asset Trading Desk" },
    {
      name: "description",
      content: "Browse industrial equipment by manufacturer. Find used and refurbished machinery from trusted brands on Asset Trading Desk."
    },
    { tagName: "link", rel: "canonical", href: "https://assettradingdesk.com/manufacturers" },
    {
      property: "og:title",
      content: "Equipment Manufacturers | Asset Trading Desk"
    },
    {
      property: "og:description",
      content: "Browse industrial equipment by manufacturer. Find used and refurbished machinery from trusted brands."
    },
    {
      property: "og:type",
      content: "website"
    },
    {
      property: "og:url",
      content: "https://assettradingdesk.com/manufacturers"
    },
    {
      property: "og:site_name",
      content: "Asset Trading Desk"
    },
    {
      name: "twitter:card",
      content: "summary_large_image"
    },
    {
      name: "twitter:title",
      content: "Equipment Manufacturers | Asset Trading Desk"
    },
    {
      name: "twitter:description",
      content: "Browse industrial equipment by manufacturer. Find used and refurbished machinery from trusted brands."
    },
    // JSON-LD structured data
    { tagName: "script", type: "application/ld+json", children: JSON.stringify(jsonLd) },
  ];
};

export async function loader() {
  const response = await Store.manufacturer.query({
    limit: "500",
    sort: "name",
  });

  const manufacturers = response.success && response.data ? response.data : [];

  return data({ manufacturers });
}

export default function index() {
  return <ManufacturersIndex />;
}
