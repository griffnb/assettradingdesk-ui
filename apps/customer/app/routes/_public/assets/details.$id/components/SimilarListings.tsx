import { AssetCard } from "@/ui/customer/assets/AssetCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/shadcn/ui/select";
import { cn } from "@/utils/cn";
import { observer } from "mobx-react-lite";

export interface SimilarListingsProps {
  assets: any[]; // TODO: Replace with proper AssetModel type
  resultCount: number;
  searchTerm: string;
  sortBy: string;
  onSortChange: (value: string) => void;
  className?: string;
}

export const SimilarListings = observer(function SimilarListings({
  assets,
  resultCount,
  searchTerm,
  sortBy,
  onSortChange,
  className,
}: SimilarListingsProps) {
  return (
    <div className={cn("flex w-full flex-col items-start gap-5", className)}>
      {/* Header with results count and sort dropdown */}
      <div className="flex w-full items-center justify-between">
        <p className="h-[38px] whitespace-pre-wrap text-lg font-semibold leading-7 text-gray-700">
          <span>Showing {resultCount} </span>
          <span className="font-normal">results for {searchTerm}</span>
        </p>
        <div className="flex w-[326px] flex-col items-start gap-3">
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="h-9 border-gray-200 bg-white shadow-sm">
              <SelectValue placeholder="Sort by: Featured" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Sort by: Featured</SelectItem>
              <SelectItem value="price-low">
                Sort by: Price (Low to High)
              </SelectItem>
              <SelectItem value="price-high">
                Sort by: Price (High to Low)
              </SelectItem>
              <SelectItem value="newest">Sort by: Newest</SelectItem>
              <SelectItem value="oldest">Sort by: Oldest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Asset cards grid */}
      <div className="flex w-full flex-wrap items-center justify-center gap-5">
        {assets.map((asset, index) => (
          <AssetCard
            key={asset.id || index}
            asset={asset}
            className="min-w-[260px] max-w-80 flex-1"
          />
        ))}
      </div>
    </div>
  );
});
