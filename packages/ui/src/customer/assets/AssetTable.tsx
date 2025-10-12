import { AiToolModel } from "@/models/models/ai_tool/model/AiToolModel";
import { TableState, TableStateProps } from "@/models/store/state/TableState";
import { SideFilters } from "@/ui/common/components/table/filtering/SideFilters";
import { cn } from "@/utils/cn";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { ToolsCards } from "./ToolsCards";

export interface AssetTableProps extends TableStateProps<AiToolModel> {
  className?: string;
}

export const AssetTable = observer(function AssetTable(
  rawProps: AssetTableProps,
) {
  const { className, ...props } = rawProps;
  const [tableState] = useState<TableState<AiToolModel>>(
    () => new TableState<AiToolModel>(props),
  );

  useEffect(() => {
    if (props.appliedFilters) {
      tableState.applyRouteFilters(props.appliedFilters);
    }
  }, [props.appliedFilters]);

  return (
    <div
      className={cn("bg-gray-modern-800 flex flex-row items-start", className)}
    >
      <SideFilters tableState={tableState} />
      <ToolsCards tableState={tableState} />
    </div>
  );
});
