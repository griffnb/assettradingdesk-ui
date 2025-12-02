import { AssetModel } from "@/models/models/asset/model/AssetModel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/ui/shadcn/ui/carousel";
import { cn } from "@/utils/cn";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Lightbox } from "yet-another-react-lightbox";
import { Counter, Thumbnails, Zoom } from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";

export interface AssetImageGalleryProps {
  asset: AssetModel;
  className?: string;
}

export const AssetImageGallery = observer(function AssetImageGallery({
  asset,
  className,
}: AssetImageGalleryProps) {
  // Default placeholder if no images
  const smallImages = asset.images(true);
  const primaryImage = asset.largeImage;
  const allImages = asset.images();
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <div className={cn("flex flex-col gap-5 md:max-w-[500px]", className)}>
      {/* Main large image */}
      <div className="relative hidden aspect-square w-full overflow-hidden rounded-xl md:block">
        <img
          src={primaryImage}
          className="size-full rounded-xl object-cover"
          alt={"Asset Large Image"}
          onClick={() => {
            setIndex(0);
            setOpen(true);
          }}
        />
      </div>

      {smallImages.length > 0 && (
        <Carousel className="mx-auto w-full md:w-[500px]">
          <CarouselContent>
            {smallImages.map((image, index) => (
              <CarouselItem
                className="max-h-[300px] basis-full overflow-hidden md:max-h-[100px] md:basis-1/3"
                key={index}
              >
                <img
                  src={image.mediumImage}
                  className="h-[300px] w-full rounded-xl object-cover md:h-[100px]"
                  onClick={() => {
                    setIndex(index + 1);
                    setOpen(true);
                  }}
                  alt={"Asset Image"}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          {smallImages.length > 3 && (
            <>
              <CarouselPrevious className="-left-9 bg-primary text-white hover:bg-primary/80" />
              <CarouselNext className="-right-9 bg-primary text-white hover:bg-primary/80" />
            </>
          )}
        </Carousel>
      )}

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        plugins={[Zoom, Thumbnails, Counter]}
        index={index}
        zoom={{ maxZoomPixelRatio: 5 }}
        slides={allImages.map((asset) => {
          return { src: asset.largeImage };
        })}
      />
    </div>
  );
});
