import { ModelModel } from "@/models/models/model/model/ModelModel";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

export interface ModelSEOProps {
  model: ModelModel;
  assetCount: number;
}

export const ModelSEO = observer(function ModelSEO({
  model,
  assetCount,
}: ModelSEOProps) {
  useEffect(() => {
    const title = `${model.manufacturer_name} ${model.name} | Asset Trading Desk`;
    const description =
      model.description ||
      `Browse ${assetCount} available ${model.name} assets from ${model.manufacturer_name}. Find detailed specifications, pricing, and contact sellers.`;

    document.title = title;

    const updateMetaTag = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute("name", name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    const updatePropertyTag = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute("property", property);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    updateMetaTag("description", description);
    updateMetaTag(
      "keywords",
      `${model.name}, ${model.manufacturer_name}, ${model.category_name}, industrial equipment, used equipment, asset trading`,
    );

    updatePropertyTag("og:title", title);
    updatePropertyTag("og:description", description);
    updatePropertyTag("og:type", "product");
    updatePropertyTag("og:url", window.location.href);

    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);

    const canonicalLink =
      document.querySelector('link[rel="canonical"]') ||
      document.createElement("link");
    canonicalLink.setAttribute("rel", "canonical");
    canonicalLink.setAttribute("href", window.location.href);
    if (!document.querySelector('link[rel="canonical"]')) {
      document.head.appendChild(canonicalLink);
    }

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

    let scriptTag = document.querySelector(
      'script[type="application/ld+json"]',
    );
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.setAttribute("type", "application/ld+json");
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);

    const breadcrumbStructuredData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: window.location.origin,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Assets",
          item: `${window.location.origin}/assets`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: model.category_name || "Category",
          item: `${window.location.origin}/assets?category_id=${model.category_id}`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: model.manufacturer_name || "Manufacturer",
          item: `${window.location.origin}/assets?manufacturer_id=${model.manufacturer_id}`,
        },
        {
          "@type": "ListItem",
          position: 5,
          name: model.name,
          item: window.location.href,
        },
      ],
    };

    let breadcrumbScriptTag = document.querySelector(
      'script[data-breadcrumb="true"]',
    );
    if (!breadcrumbScriptTag) {
      breadcrumbScriptTag = document.createElement("script");
      breadcrumbScriptTag.setAttribute("type", "application/ld+json");
      breadcrumbScriptTag.setAttribute("data-breadcrumb", "true");
      document.head.appendChild(breadcrumbScriptTag);
    }
    breadcrumbScriptTag.textContent = JSON.stringify(breadcrumbStructuredData);

    return () => {
      document.title = "Asset Trading Desk";
    };
  }, [model, assetCount]);

  return null;
});
