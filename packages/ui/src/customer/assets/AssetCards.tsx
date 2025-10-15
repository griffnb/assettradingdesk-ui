import { AssetModel } from "@/models/models/asset/model/AssetModel";

import { TableState } from "@/models/store/state/TableState";
import { LoadingSkeleton } from "@/ui/common/components/loading/LoadingSkeleton";
import { useVirtualization } from "@/ui/common/components/table/virtual/useVirtual";
import { useGridCount } from "@/ui/hooks/useGridCount";
import { observer } from "mobx-react";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router";
import { AssetCard } from "./AssetCard";

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
    nav(`/assets/details/${record.id}`);
  };

  return (
    <>
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className={`h-[calc(100svh-64px)] w-full overflow-y-auto border p-4`}
      >
        {props.tableState.data.length == 0 && !props.tableState.loading && (
          <div className="flex cursor-pointer self-stretch bg-white p-4">
            No assets Found
          </div>
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
        {props.tableState.loading ||
          (props.tableState.isLoadingMore && <LoadingSkeleton />)}
      </div>
    </>
  );
});
