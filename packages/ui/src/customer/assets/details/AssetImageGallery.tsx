import { AssetModel } from "@/models/models/asset/model/AssetModel";
import ZoomableImage from "@/ui/common/components/image/ZoomableImage";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/ui/shadcn/ui/carousel";
import { cn } from "@/utils/cn";
import { observer } from "mobx-react-lite";

export interface AssetImageGalleryProps {
  asset: AssetModel;
  className?: string;
}

export const AssetImageGallery = observer(function AssetImageGallery({
  asset,
  className,
}: AssetImageGalleryProps) {
  // Default placeholder if no images
  const displayImages = asset.images(true);

  return (
    <div className={cn("flex max-w-[500px] flex-col gap-5", className)}>
      {/* Main large image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl">
        <ZoomableImage
          src={asset.largeImage}
          largeSrc={asset.largeImage}
          className="size-full rounded-xl object-cover"
        />
      </div>

      <Carousel className="mx-auto max-w-[500px]">
        <CarouselContent>
          {displayImages.map((image, index) => (
            <CarouselItem
              className="max-h-[100px] basis-1/3 overflow-hidden"
              key={index}
            >
              <ZoomableImage
                src={image.mediumImage}
                largeSrc={image.largeImage}
                className="h-[100px] w-full rounded-xl object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-9 bg-primary text-white hover:bg-primary/80" />
        <CarouselNext className="-right-9 bg-primary text-white hover:bg-primary/80" />
      </Carousel>
    </div>
  );
});
