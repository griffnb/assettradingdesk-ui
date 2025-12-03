import { ServerService } from "@/common_lib/services/ServerService";
import { CategoryModel } from "@/models/models/category/model/CategoryModel";
import { ModelModel } from "@/models/models/model/model/ModelModel";
import { Store } from "@/models/store/Store";
import { CategoryDetails } from "@/ui/customer/categories/CategoryDetails";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { data } from "react-router";
import type { Route } from "./+types/index";

export const meta = ({ loaderData }: Route.MetaArgs) => {
  if (!loaderData?.category) {
    return [
      { title: "Category Not Found | Asset Trading Desk" },
      {
        name: "description",
        content: "The requested category could not be found.",
      },
    ];
  }

  const { category, models } = loaderData;
  const title = `${category.name} Equipment & Assets | Asset Trading Desk`;
  const description =
    category.description ||
    `Browse ${models.length} equipment models in the ${category.name} category. Find industrial assets, machinery, and detailed specifications on Asset Trading Desk.`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category.name,
    description: category.description || description,
    url: `https://assettradingdesk.com/categories/${category.slug}`,
    numberOfItems: models.length,
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
        name: "Categories",
        item: "https://assettradingdesk.com/categories",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: category.name,
        item: `https://assettradingdesk.com/categories/${category.slug}`,
      },
    ],
  };

  return [
    { title },
    { name: "description", content: description },
    {
      name: "keywords",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      content: `${category.name}, ${category.name} equipment, industrial equipment, used equipment, asset trading, ${models
        .map((m: any) => m.name)
        .slice(0, 5)
        .join(", ")}`,
    },
    {
      tagName: "link",
      rel: "canonical",
      href: `https://assettradingdesk.com/categories/${category.slug}`,
    },

    // Open Graph tags
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    {
      property: "og:url",
      content: `https://assettradingdesk.com/categories/${category.slug}`,
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
    throw data({ category: null, models: [] }, { status: 404 });
  }

  const categoryResp = await ServerService.callGet("category", "", {
    slug,
  });
  if (
    !categoryResp.success ||
    !categoryResp.data ||
    categoryResp.data.length === 0
  ) {
    throw data({ category: null, models: [] }, { status: 404 });
  }

  const categoryData = categoryResp.data[0];
  const modelsResp = await ServerService.callGet("model", "", {
    category_id: categoryData.id,
  });
  const modelsData =
    modelsResp.success && modelsResp.data ? modelsResp.data : [];

  return data({
    category: categoryData,
    models: modelsData,
  });
}

export default observer(({ loaderData }: Route.ComponentProps) => {
  const [category] = useState<CategoryModel>(() =>
    Store.category.load(loaderData.category),
  );
  const [models] = useState<ModelModel[]>(() =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    loaderData.models.map((modelData: any) => Store.model.load(modelData)),
  );

  return <CategoryDetails category={category} models={models} />;
});
