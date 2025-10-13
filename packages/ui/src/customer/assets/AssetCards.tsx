import { AssetModel } from "@/models/models/asset/model/AssetModel";

import { TableState } from "@/models/store/state/TableState";
import { useVirtualization } from "@/ui/common/components/table/virtual/useVirtual";
import { observer } from "mobx-react";
import { useCallback, useEffect } from "react";
import { AssetCard } from "./AssetCard";

interface AssetCardsProps {
  rowClickAction?: (record: AssetModel, clearSelectedRowID: () => void) => void; // Function to call when a row is clicked
  tableState: TableState<AssetModel>;
}
export const AssetCards = observer(function AssetCards(props: AssetCardsProps) {
  const { tableState } = props;
  const loadMore = useCallback(() => {
    console.log("Load more being called");
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
    rows: Math.ceil(props.tableState.data.length / 3),
    rowHeight: 367,
    overscan: 5,
    loadMore,
    scrollDebounceMs: 5,
  });

  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0);
  }, [props.tableState.data]);

  const rowClickAction = (record: AssetModel) => {};

  return (
    <>
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className={`h-[calc(100svh-64px)] w-full overflow-y-auto border border-border-neutral-secondary`}
      >
        {props.tableState.data.length == 0 && !props.tableState.loading && (
          <div className="flex cursor-pointer self-stretch bg-white p-4">
            No results available.
          </div>
        )}
        {topPad > 0 && <div style={topSpacerStyle} />}
        <div className="grid grid-cols-3 gap-4 p-4">
          {visibleIndexes.flatMap((rowIndex) => {
            const startIndex = rowIndex * 3;
            const endIndex = startIndex + 3;
            const records = props.tableState.data.slice(
              startIndex,
              endIndex,
            ) as AssetModel[];
            return records.map((record) => (
              <AssetCard key={record.id} asset={record} />
            ));
          })}
        </div>
        {bottomPad > 0 && <div style={bottomSpacerStyle} />}
      </div>
    </>
  );
});
