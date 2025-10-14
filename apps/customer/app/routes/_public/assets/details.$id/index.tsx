import { observer } from "mobx-react-lite";
import { useParams } from "react-router";
import { AssetDetailsPageBody } from "./components";

export default observer(() => {
  const { id } = useParams();

  // Mock data - replace with actual data fetching
  const mockAsset = {
    id: id || "1",
    title: "Canon FPA-2000 i1 Stepper",
    category: "Stepper",
    price: 10000.0,
    currency: "USD",
    description:
      "Morem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.Morem ipsum dolor sit amet, consectetur adipiscing elit.",
    images: [
      "https://placehold.co/590x590?text=Canon+FPA-2000",
      "https://placehold.co/270x270?text=View+2",
      "https://placehold.co/270x270?text=View+3",
      "https://placehold.co/270x270?text=View+4",
      "https://placehold.co/270x270?text=View+5",
    ],
    badges: ["Badge", "Badge"],
    specs: [
      { label: "Manufacturer", value: "Canon" },
      { label: "Model", value: "FPA-2000 i1" },
      { label: "Type", value: "Stepper" },
      { label: "Year", value: "2000" },
    ],
    additionalDescription:
      "Morem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.Morem ipsum dolor sit amet, consectetur adipiscing elit.",
    additionalSpecs: [
      { label: "Condition", value: "Excellent" },
      { label: "Location", value: "California" },
      { label: "Availability", value: "Available" },
      { label: "Warranty", value: "6 Months" },
    ],
  };

  const mockSimilarAssets = Array.from({ length: 5 }, (_, i) => ({
    id: `similar-${i + 1}`,
    label: "Canon FPA-2000 i1 Stepper",
    category_name: "Stepper",
    price: 1000000, // Price in cents
    asset_files: [
      {
        meta_data: {
          medium_image: "https://placehold.co/400x400?text=Similar+Asset",
        },
      },
    ],
  }));

  return (
    <AssetDetailsPageBody
      asset={mockAsset}
      similarAssets={mockSimilarAssets}
      resultCount={86}
      searchTerm="Lithography"
    />
  );
});
