import {
  CtaSection,
  ExclusiveListings,
  HeroSection,
  ManufacturerLogos,
  ProductCards,
} from "@/ui/customer/home";
import { observer } from "mobx-react-lite";

export const Home = observer(function Home() {
  return (
    <div className="flex flex-col bg-neutral-100">
      {/* Hero Section with search and stats */}
      <HeroSection />

      {/* Manufacturer Logos Section */}
      <ManufacturerLogos />
      <div className="flex w-full flex-col bg-white">
        <div className="mx-auto flex w-full flex-col md:max-w-[1500px]">
          {/* Hot Products Section */}
          <ProductCards />

          {/* Exclusive Listings Section */}
          <ExclusiveListings />

          {/* Call to Action Section */}
        </div>
      </div>
      <CtaSection />
    </div>
  );
});
