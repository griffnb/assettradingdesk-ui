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
    <div className={cn("flex flex-col gap-5 md:max-w-[500px]", className)}>
      {/* Main large image */}
      <div className="relative hidden aspect-square w-full overflow-hidden rounded-xl md:block">
        <ZoomableImage
          src={asset.largeImage}
          largeSrc={asset.largeImage}
          className="size-full rounded-xl object-cover"
        />
      </div>

      {displayImages.length > 0 && (
        <Carousel className="mx-auto w-full md:w-[500px]">
          <CarouselContent>
            {displayImages.map((image, index) => (
              <CarouselItem
                className="max-h-[300px] basis-full overflow-hidden md:max-h-[100px] md:basis-1/3"
                key={index}
              >
                <ZoomableImage
                  src={image.mediumImage}
                  largeSrc={image.largeImage}
                  className="h-[300px] w-full rounded-xl object-cover md:h-[100px]"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          {displayImages.length > 3 && (
            <>
              <CarouselPrevious className="-left-9 bg-primary text-white hover:bg-primary/80" />
              <CarouselNext className="-right-9 bg-primary text-white hover:bg-primary/80" />
            </>
          )}
        </Carousel>
      )}
    </div>
  );
});
