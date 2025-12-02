import { ManufacturersIndex } from "@/customer/pods/manufacturers/ManufacturersIndex";

export function meta() {
  return [
    { title: "Equipment Manufacturers | Asset Trading Desk" },
    {
      name: "description",
      content: "Browse industrial equipment by manufacturer. Find used and refurbished machinery from trusted brands on Asset Trading Desk."
    },
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
  ];
}

export default function index() {
  return <ManufacturersIndex />;
}
