import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { observer } from "mobx-react";
import { HTMLAttributes } from "react";
import { Link } from "react-router";

const styleVariants = cva("", {
  variants: {
    variant: {
      default:
        "border rounded-lg shadow-sm overflow-hidden flex flex-col bg-gray-50",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

/**
 * A Sample Component
 *
 * @example
 * [&_*[data-slot='my-slot']]:mx-auto
 *
 * @slot {"my-slot"} data-slot="my-slot"
 */

export interface AiToolCardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof styleVariants> {
  asset: AssetModel;
}
export const AssetCard = observer(function AssetCard(
  fullProps: AiToolCardProps,
) {
  const { className, variant, asset, ...props } = fullProps;
  return (
    <div className={cn(styleVariants({ variant, className }))}>
      <div className="p-4 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded">
              <img
                alt={asset.label}
                loading="lazy"
                width="40"
                height="40"
                decoding="async"
                data-nimg="1"
                className="h-full w-full rounded object-contain"
                src={asset.meta_data.logo}
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-neutral-primary">
                {ai_tool.name}
              </h3>
              <p className="text-xs text-text-neutral-secondary">
                {ai_tool.meta_data.tagline}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-grow p-4 pb-2 pt-2">
        <p className="line-clamp-3 text-sm text-text-neutral-secondary">
          {ai_tool.description}
        </p>
      </div>
      <div className="mt-auto flex justify-between border-t border-border-neutral-secondary p-4">
        <div className="flex space-x-2">
          <button className="inline-flex h-8 w-8 items-center justify-center whitespace-normal break-words rounded-md text-sm font-medium text-gray-300 ring-offset-background transition-all duration-300 hover:bg-[#262626] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-heart h-4 w-4"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
            </svg>
            <span className="sr-only">Like</span>
          </button>
          <button className="inline-flex h-8 w-8 items-center justify-center whitespace-normal break-words rounded-md text-sm font-medium text-gray-300 ring-offset-background transition-all duration-300 hover:bg-[#262626] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-bookmark h-4 w-4"
            >
              <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
            </svg>
            <span className="sr-only">Bookmark</span>
          </button>
        </div>
        <div className="flex space-x-2">
          <Link
            className="inline-flex h-9 items-center justify-center whitespace-normal break-words rounded-md border border-[#333333] bg-[#262626] px-3 text-sm font-medium text-white ring-offset-background transition-all duration-300 hover:bg-[#333333] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            to={"/ai_tools/details/" + ai_tool.id}
          >
            Details
          </Link>
          <Link
            to={ai_tool.affiliate_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center justify-center whitespace-normal break-words rounded-md bg-[#00FFB2] px-3 text-sm font-medium text-[#141414] ring-offset-background transition-all duration-300 hover:bg-[#00FFB2]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            Visit
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-external-link ml-2 h-4 w-4"
            >
              <path d="M15 3h6v6"></path>
              <path d="M10 14 21 3"></path>
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
});
