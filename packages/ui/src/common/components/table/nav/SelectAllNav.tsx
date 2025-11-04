import { TableState } from "@/models/store/state/TableState";
import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Button } from "../../buttons/Button";
import { MassAction } from "../../types/mass-actions";
import { ActionComponents } from "../ActionComponents";
import MassActions from "./MassActions";

const styleVariants = cva("", {
  variants: {
    variant: {
      compact:
        "border-b mr-auto flex items-center justify-between px-6 py-3 w-full",
      default:
        "border-b mr-auto flex items-center justify-between px-6 py-3 w-full",
      custom: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface SelectAllNavProps<T extends object>
  extends VariantProps<typeof styleVariants> {
  massActions?: MassAction<T>[]; // a component name

  tableState: TableState<T>;
  actionComponents?: MassAction<T>[]; // The action components to display

  className?: string;
}

/**
 *
 * ## SelectAllNav Slots
 *
 * @slot {"table-selectall-nav"} data-slot="table-selectall-nav"
 * @slot {"table-selectall-nav-action-components"} data-slot="table-selectall-nav-action-components"
 * @slot {"table-selectall-nav-left"} data-slot="table-selectall-nav-left"
 * @slot {"table-selectall-nav-right"} data-slot="table-selectall-nav-right"
 *
 *
 *
 */

export const SelectAllNav = observer(
  <T extends object>(rawProps: SelectAllNavProps<T>) => {
    const { variant, className, massActions, actionComponents, tableState } =
      rawProps;
    const [allRows, setAllRows] = useState(false);

    useEffect(() => {
      if (allRows) {
        tableState.checkAll();
      } else if (Object.keys(tableState.checked_row_ids).length > 0) {
        tableState.uncheckAll();
      }
    }, [allRows]);

    useEffect(() => {
      if (!tableState.allChecked) {
        setAllRows(false);
      }
    }, [tableState.allChecked]);

    if (Object.keys(tableState.checked_row_ids).length === 0 && !allRows) {
      return null;
    }

    const selectedCount = allRows
      ? tableState.totalCount
      : Object.keys(tableState.checked_row_ids).length;

    return (
      <div
        className={cn(styleVariants({ variant, className }))}
        data-slot="table-selectall-nav"
      >
        <div
          className="mt-0 flex w-full flex-row items-center justify-start gap-x-2 text-sm font-medium text-gray-700"
          data-slot="table-selectall-nav-left"
        >
          <div className="flex flex-row items-center justify-center rounded-lg bg-fg-brand-primary px-4 py-2 font-semibold text-white">
            {selectedCount} Selected{" "}
            <i
              onClick={() => {
                tableState.uncheckAll();
                setAllRows(false);
              }}
              className="fa fa-close ml-2 cursor-pointer"
            ></i>
          </div>
          {!allRows && (
            <Button
              className="rounded-lg border border-border-brand-tertiary py-2 text-text-brand-primary"
              variant={"custom"}
              onClick={() => setAllRows(true)}
            >
              Select All
            </Button>
          )}
          <div className="ml-auto"></div>
          {massActions && (
            <MassActions
              options={{
                allRows: allRows,
                tableState: tableState,
              }}
              massActions={massActions}
            />
          )}

          {actionComponents && (
            <ActionComponents
              actions={actionComponents}
              allRows={allRows}
              tableState={tableState}
            />
          )}
        </div>
        <div
          className="flex flex-row items-center gap-x-2"
          data-slot="table-selectall-nav-right"
        ></div>
      </div>
    );
  },
);
