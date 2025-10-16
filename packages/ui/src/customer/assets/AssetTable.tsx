import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { TableState, TableStateProps } from "@/models/store/state/TableState";
import { cn } from "@/utils/cn";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { AssetCards } from "./AssetCards";
import { SideFilters } from "./SideFilters";
import { filters } from "./filters";

export interface AssetTableProps
  extends Omit<TableStateProps<AssetModel>, "columns" | "modelType"> {
  className?: string;
}

export const AssetTable = observer(function AssetTable(
  rawProps: AssetTableProps,
) {
  const { className, ...props } = rawProps;
  const [tableState] = useState<TableState<AssetModel>>(
    () =>
      new TableState<AssetModel>({
        ...props,
        columns: [],
        modelType: "asset",
        infiniteScroll: true,
        filters: filters,
      }),
  );

  useEffect(() => {
    if (props.appliedFilters) {
      tableState.applyRouteFilters(props.appliedFilters);
    }
  }, [props.appliedFilters]);

  return (
    <div className={cn("flex flex-row items-start", className)}>
      <SideFilters tableState={tableState} />
      <AssetCards tableState={tableState} />
    </div>
  );
});
