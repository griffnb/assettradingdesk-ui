import { observer } from "mobx-react-lite";
import {
  CtaSection,
  ExclusiveListings,
  HeroSection,
  ManufacturerLogos,
  ProductCards,
} from "./components";

export const HomeV2 = observer(function HomeV2() {
  return (
    <div className="min-h-screen bg-neutral-100">
      {/* Hero Section with search and stats */}
      <HeroSection />

      {/* Manufacturer Logos Section */}
      <ManufacturerLogos />

      {/* Hot Products Section */}
      <ProductCards />

      {/* Exclusive Listings Section */}
      <ExclusiveListings />

      {/* Call to Action Section */}
      <CtaSection />
    </div>
  );
});
