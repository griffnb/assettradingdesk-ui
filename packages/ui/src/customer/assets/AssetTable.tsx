import useMediaQuery, { BREAKPOINTS } from "@/common_lib/hooks/useMediaQuery";
import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { TableState, TableStateProps } from "@/models/store/state/TableState";
import { cn } from "@/utils/cn";

import { LayerService } from "@/common_lib/services/LayerService";
import { Button } from "@/ui/shadcn/ui/button";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { AssetCards } from "./AssetCards";
import { filters } from "./filters";
import { SideFilterPanel, SideFilterPanelId } from "./SideFilterPanel";
import { SideFilters } from "./SideFilters";

export interface AssetTableProps
  extends Omit<TableStateProps<AssetModel>, "columns" | "modelType"> {
  className?: string;
}

export const AssetTable = observer(function AssetTable(
  rawProps: AssetTableProps,
) {
  const { className, ...props } = rawProps;
  const { isMediaQuery: isSmallDesktop, ready } = useMediaQuery(BREAKPOINTS.MD);

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

  const onFilterClick = () => {
    LayerService.add({
      id: SideFilterPanelId,
      component: SideFilterPanel,
      props: { tableState },
    });
  };

  if (!ready) return null;

  return (
    <div className={cn("flex flex-row items-start", className)}>
      {!isSmallDesktop && <SideFilters tableState={tableState} />}
      <AssetCards
        tableState={tableState}
        filterButton={
          <Button
            variant="outline"
            className="mx-auto w-10/12 md:hidden"
            onClick={onFilterClick}
          >
            Filters
          </Button>
        }
      />
    </div>
  );
});
