import type { Settings } from "@/models/models/sage_product/SageProductBaseModel";
import { capitalize } from "@/utils/strings";
import type { BaseProps } from "../types/base";

const modules = import.meta.glob([
  "../**/defaults.{js,ts}",
  "../**/SiteDefaults.{js,ts}",
  `../**/*.astro`,
]);

const mappedAdIdUrls = [
  "m",
  "news/v1",
  "uais/v1",
  "404",
  "yt",
  "tv",
  "kit",
  "starter/kit",
];

const loader = async (
  variation: string,
  pageType: string,
  cvars: { [key: string]: any },
  productSettings: Settings,
  props: Partial<BaseProps<any>>,
  cvarsVariation?: string,
): Promise<any> => {
  const flowVariation = mappedAdIdUrls.includes(variation) && cvarsVariation ? cvarsVariation: variation
  if (!pageType || pageType == "") {
    pageType = "Landing";
  } else {
    pageType = capitalize(pageType);
  }

  const defaultsModule = (await modules[
    `../flows/${flowVariation}/defaults.ts`
  ]()) as any;

  const siteDefaultsModule = (await modules[
    `../defaults/SiteDefaults.ts`
  ]()) as any;

  const page = (await modules[
    `../flows/${flowVariation}/${pageType}.astro`
  ]()) as any;

  props.cvars = defaultsModule.flowDefaults(cvars);
  props.productSettings = siteDefaultsModule.SiteDefaults(productSettings);

  return page.default;
};

export default loader;
