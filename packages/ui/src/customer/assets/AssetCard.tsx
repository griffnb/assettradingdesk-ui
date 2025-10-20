import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { Badge } from "@/ui/shadcn/ui/badge";
import { Card, CardContent, CardFooter } from "@/ui/shadcn/ui/card";
import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import dayjs from "dayjs";
import { Image } from "lucide-react";
import { observer } from "mobx-react-lite";
import { ReactNode } from "react";
import { useNavigate } from "react-router";

const styleVariants = cva(
  "gap-2 overflow-hidden shadow-sm hover:bg-gray-50 cursor-pointer",
  {
    variants: {
      variant: {
        default: "",
        full: "py-0",
        custom: "",
      },
      size: {
        default: "h-[340px] w-[310px]",
        skinny: "h-[240px] w-[210px] flex-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const imageVariant = cva("relative h-52 w-full overflow-auto", {
  variants: {
    variant: {
      default: "",
      full: "p-0",
      custom: "",
    },
    size: {
      default: "",
      skinny: " max-h-[40%]",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface AssetCardProps extends VariantProps<typeof styleVariants> {
  asset: AssetModel;
  className?: string;
  onClick?: (asset: AssetModel) => void;
  badge?: ReactNode;
}
export const AssetCard = observer(function AssetCard(
  fullProps: AssetCardProps,
) {
  const { className, asset, variant, size, badge, onClick } = fullProps;
  const nav = useNavigate();

  const onClickHandler = () => {
    if (onClick) {
      onClick(asset);
    } else {
      nav(asset.publicLink);
    }
  };

  return (
    <Card
      className={cn(styleVariants({ variant, size, className }))}
      onClick={onClickHandler}
    >
      <CardContent className={cn(imageVariant({ variant, size }))}>
        <div className="relative size-full">
          <div className="absolute left-1 top-1">{badge}</div>
          <div className="absolute right-1 top-1">
            {/*
            <i className="fa-regular fa-heart" />
            <i className="fa-solid fa-heart border text-indigo-700" />
            */}
          </div>
          <img
            alt={asset.label}
            loading="lazy"
            decoding="async"
            data-nimg="1"
            className="size-full rounded border object-cover shadow-md"
            src={asset.mediumImage}
          />
          {asset.picture_count && asset.picture_count > 0 && (
            <div className="absolute bottom-1 right-1">
              <Badge className="bg-primary">
                <Image /> {asset.picture_count}
              </Badge>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full flex-col items-start justify-start gap-2 self-stretch">
          <div className="flex flex-col items-start justify-start self-stretch">
            <div className="justify-start self-stretch text-sm font-normal leading-tight text-muted-foreground">
              {asset.manufacturer_name}
            </div>
            <div className="justify-start self-stretch text-lg font-semibold leading-7 text-foreground">
              {asset.model_name}
            </div>
            <div className="justify-start self-stretch text-sm font-normal leading-tight text-muted-foreground">
              {asset.category_name}
            </div>
          </div>
          {asset.price > 0 && (
            <div className="justify-start self-stretch text-lg font-semibold leading-7 text-foreground">
              ${(asset.price / 100).toFixed(2)}
            </div>
          )}
          <div className="flex flex-row justify-between self-stretch text-sm font-normal leading-tight text-muted-foreground">
            <div className="flex flex-col self-stretch">
              <span className="font-semibold">Vintage</span>
              <span>{asset.year > 0 ? asset.year : "Unknown"}</span>
            </div>
            <div className="flex flex-col self-stretch">
              <span className="font-semibold">Last Verified</span>
              <span>
                {dayjs().diff(asset.verified_at_ts, "day") > 30
                  ? "More than 30"
                  : dayjs().diff(asset.verified_at_ts, "day")}{" "}
                days
              </span>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
});
