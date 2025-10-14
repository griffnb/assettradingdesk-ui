import { Badge } from "@/ui/shadcn/ui/badge";
import { Button } from "@/ui/shadcn/ui/button";
import { Separator } from "@/ui/shadcn/ui/separator";
import { cn } from "@/utils/cn";
import { Heart, Share2 } from "lucide-react";
import { observer } from "mobx-react-lite";
import { ProductActions } from "./ProductActions";
import { ProductSpecs } from "./ProductSpecs";

export interface ProductInfoProps {
  title: string;
  category: string;
  price: number;
  currency?: string;
  description: string;
  badges?: string[];
  specs: { label: string; value: string }[];
  additionalDescription?: string;
  additionalSpecs?: { label: string; value: string }[];
  onShare?: () => void;
  onFavorite?: () => void;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  className?: string;
}

export const ProductInfo = observer(function ProductInfo({
  title,
  category,
  price,
  currency = "USD",
  description,
  badges = [],
  specs,
  additionalDescription,
  additionalSpecs = [],
  onShare,
  onFavorite,
  onPrimaryAction,
  onSecondaryAction,
  className,
}: ProductInfoProps) {
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  return (
    <div
      className={cn("flex w-[600px] max-w-[600px] flex-col gap-6", className)}
    >
      {/* Header with title, category, badges, and action buttons */}
      <div className="flex w-full items-center gap-2">
        <div className="flex min-w-0 flex-1 flex-col items-start gap-1">
          <p className="w-full min-w-full whitespace-pre-wrap text-sm font-semibold leading-5 text-gray-500">
            {category}
          </p>
          <p className="w-full min-w-full whitespace-pre-wrap text-[30px] font-bold leading-9 text-gray-700">
            {title}
          </p>
          <div className="flex items-start gap-2">
            {badges.map((badge, index) => (
              <Badge
                key={index}
                variant={index === 0 ? "default" : "secondary"}
              >
                {badge}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onShare}
            className="h-8 w-8"
          >
            <Share2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onFavorite}
            className="h-8 w-8"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Price, description, and specs */}
      <div className="flex w-[563px] flex-col items-start gap-4">
        <p className="w-full whitespace-pre-wrap text-[30px] font-bold leading-9 text-gray-700">
          {formatPrice(price)}
        </p>
        <p className="w-full whitespace-pre-wrap text-lg font-medium leading-7 text-gray-500">
          {description}
        </p>
        <ProductSpecs specs={specs} />
      </div>

      {/* Action buttons */}
      <ProductActions
        onPrimaryAction={onPrimaryAction}
        onSecondaryAction={onSecondaryAction}
      />

      {/* Additional section if provided */}
      {(additionalDescription || additionalSpecs.length > 0) && (
        <>
          <Separator className="w-full" />
          {additionalDescription && (
            <p className="w-full whitespace-pre-wrap text-lg font-medium leading-7 text-gray-500">
              {additionalDescription}
            </p>
          )}
          {additionalSpecs.length > 0 && (
            <ProductSpecs specs={additionalSpecs} />
          )}
        </>
      )}
    </div>
  );
});
