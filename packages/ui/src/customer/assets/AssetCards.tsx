import { AssetModel } from "@/models/models/asset/model/AssetModel";

import { TableState } from "@/models/store/state/TableState";
import { LoadingSkeleton } from "@/ui/common/components/loading/LoadingSkeleton";
import { useVirtualization } from "@/ui/common/components/table/virtual/useVirtual";
import { useGridCount } from "@/ui/hooks/useGridCount";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/shadcn/ui/select";
import { Skeleton } from "@/ui/shadcn/ui/skeleton";
import { observer } from "mobx-react-lite";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router";
import { AssetCard } from "./AssetCard";
import { NoResults } from "./NoResults";

interface AssetCardsProps {
  rowClickAction?: (record: AssetModel, clearSelectedRowID: () => void) => void; // Function to call when a row is clicked
  tableState: TableState<AssetModel>;
}
export const AssetCards = observer(function AssetCards(props: AssetCardsProps) {
  const { tableState } = props;
  const { ref, count } = useGridCount<HTMLDivElement>();

  const nav = useNavigate();

  const loadMore = useCallback(() => {
    if (tableState.totalCount > tableState.data.length && !tableState.loading) {
      tableState.loadMoreData();
    }
  }, [tableState]);

  const {
    scrollRef,
    onScroll,
    topPad,
    topSpacerStyle,
    bottomPad,
    bottomSpacerStyle,
    visibleIndexes,
  } = useVirtualization({
    rows: Math.ceil(props.tableState.data.length / count),
    rowHeight: 364,
    overscan: 10,
    loadMore,
    scrollDebounceMs: 5,
  });

  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0);
  }, [props.tableState.data]);

  const rowClickAction = (record: AssetModel) => {
    nav(record.publicLink);
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="mt-2 flex flex-row items-center justify-between gap-4 self-stretch px-6">
        <div className="text-lg">
          <span className="font-semibold">
            Showing {props.tableState.totalCount}
          </span>
          <span> results</span>
        </div>
        <Select
          onValueChange={(value) => {
            if (value === "_") {
              value = "";
            }
            props.tableState.applyOrder(value);
          }}
          value={props.tableState.order || "_"}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="_">Sort By Best Match</SelectItem>
            <SelectItem value="verified_at_ts desc">
              Sort By Last Verified
            </SelectItem>
            <SelectItem value="picture_count desc">
              Sort By Picture Count
            </SelectItem>
            <SelectItem value="price asc">Sort By Price Low/High</SelectItem>
            <SelectItem value="price desc">Sort By Price High/Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className={`h-[calc(100svh-64px)] w-full overflow-y-auto border p-4`}
      >
        {props.tableState.loading ? (
          <div className="absolute grid w-full grid-cols-[repeat(auto-fit,_minmax(320px,_320px))] gap-4">
            <Skeleton className="h-[340px] w-[320px] rounded-xl" />
            <Skeleton className="h-[340px] w-[320px] rounded-xl" />
            <Skeleton className="h-[340px] w-[320px] rounded-xl" />
          </div>
        ) : (
          <>
            {props.tableState.data.length == 0 && !props.tableState.loading && (
              <NoResults
                clearFilters={() => {
                  tableState.applyTableFilters({
                    status: "100",
                    limit: "100",
                    pictures: "1",
                  });
                }}
              />
            )}
            {topPad > 0 && <div style={topSpacerStyle} />}
            <div
              className="grid grid-cols-[repeat(auto-fit,_minmax(320px,_320px))] gap-4"
              ref={ref}
            >
              {visibleIndexes.flatMap((rowIndex) => {
                const startIndex = rowIndex * count;
                const endIndex = startIndex + count;
                const records = props.tableState.data.slice(
                  startIndex,
                  endIndex,
                ) as AssetModel[];
                return records.map((record) => (
                  <AssetCard
                    key={record.id}
                    asset={record}
                    onClick={rowClickAction}
                  />
                ));
              })}
            </div>
            {bottomPad > 0 && <div style={bottomSpacerStyle} />}
            {props.tableState.isLoadingMore && <LoadingSkeleton />}
          </>
        )}
      </div>
    </div>
  );
});
