import { CategoriesIndex } from "@/customer/pods/categories/CategoriesIndex";
import { Store } from "@/models/store/Store";
import type { MetaFunction } from "react-router";
import { data } from "react-router";

export const meta: MetaFunction<typeof loader> = ({ data: loaderData }) => {
  const categories = loaderData?.categories || [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    itemListElement: categories.map((category: any, index: number) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CollectionPage",
        name: category.name,
        description:
          category.description ||
          `Browse ${category.name} equipment on Asset Trading Desk`,
        url: `https://assettradingdesk.com/categories/${category.slug}`,
      },
    })),
  };

  return [
    { title: "Equipment Categories | Asset Trading Desk" },
    {
      name: "description",
      content:
        "Browse industrial equipment by category. Find used machinery, processing equipment, and industrial assets organized by type.",
    },
    {
      name: "keywords",
      content:
        "industrial equipment categories, used machinery, processing equipment, manufacturing equipment, asset categories",
    },
    {
      tagName: "link",
      rel: "canonical",
      href: "https://assettradingdesk.com/categories",
    },
    {
      property: "og:title",
      content: "Equipment Categories | Asset Trading Desk",
    },
    {
      property: "og:description",
      content:
        "Browse industrial equipment by category. Find used machinery, processing equipment, and industrial assets organized by type.",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:url",
      content: "https://assettradingdesk.com/categories",
    },
    {
      property: "og:site_name",
      content: "Asset Trading Desk",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: "Equipment Categories | Asset Trading Desk",
    },
    {
      name: "twitter:description",
      content:
        "Browse industrial equipment by category. Find used machinery, processing equipment, and industrial assets organized by type.",
    },
    // JSON-LD structured data
    {
      tagName: "script",
      type: "application/ld+json",
      children: JSON.stringify(jsonLd),
    },
  ];
};

export async function loader() {
  const response = await Store.category.query({
    limit: "500",
    sort: "name",
  });

  const categories = response.success && response.data ? response.data : [];

  return data({ categories });
}

export default function index() {
  return <CategoriesIndex />;
}
