import { cn } from "@/utils/cn";
import { observer } from "mobx-react-lite";
import { useState } from "react";

export interface AssetImageGalleryProps {
  images: string[];
  className?: string;
}

export const AssetImageGallery = observer(function AssetImageGallery({
  images,
  className,
}: AssetImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Default placeholder if no images
  const displayImages =
    images.length > 0
      ? images
      : [
          "https://placehold.co/590x590?text=No+Image",
          "https://placehold.co/270x270?text=No+Image",
          "https://placehold.co/270x270?text=No+Image",
          "https://placehold.co/270x270?text=No+Image",
          "https://placehold.co/270x270?text=No+Image",
        ];

  return (
    <div className={cn("flex flex-col gap-5", className)}>
      {/* Main large image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl">
        <img
          src={displayImages[selectedImageIndex]}
          alt="Asset main view"
          className="size-full object-cover"
        />
      </div>

      {/* Thumbnail grid */}
      <div className="grid grid-cols-2 gap-5">
        {displayImages.slice(1, 5).map((image, index) => (
          <button
            key={index + 1}
            onClick={() => setSelectedImageIndex(index + 1)}
            className={cn(
              "relative aspect-square overflow-hidden rounded-xl transition-all",
              "hover:ring-2 hover:ring-gray-300",
              selectedImageIndex === index + 1 && "ring-2 ring-gray-600",
            )}
          >
            <img
              src={image}
              alt={`Asset view ${index + 2}`}
              className="size-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
});
