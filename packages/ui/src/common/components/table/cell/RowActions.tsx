import { LayerService } from "@/common_lib/services/LayerService";
import { NotificationService } from "@/common_lib/services/NotificationService";
import { BaseModel } from "@/models/BaseModel";
import { StoreModel } from "@/models/store/StoreModel";
import { Status } from "@/models/types/constants";
import {
  ViewRecordModal,
  ViewRecordModalId,
} from "@/ui/admin/modal/ViewRecordModal";

import { cn } from "@/utils/cn";
import { equals } from "@/utils/numbers";
import { plural } from "@/utils/strings";
import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import copy from "copy-to-clipboard";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import React, { ReactNode } from "react";
import { useNavigate } from "react-router";
import { MenuOption } from "../../menu/MenuOption";
import { IColumn, TableCellProps } from "../../types/columns";

export interface RowActionsProps<T extends BaseModel>
  extends TableCellProps<T> {
  children?: ReactNode;
  column: RowActionColumn<T>;
  noChangelogs?: boolean;
}

// Define component slots as React functional components
export const RowActionsPreActions = observer(
  ({ children }: { children: ReactNode }) => <>{children}</>
);

export const RowActionsActions = observer(
  ({ children }: { children: ReactNode }) => <>{children}</>
);

export const RowActionsPostActions = observer(
  ({ children }: { children: ReactNode }) => <>{children}</>
);

export interface RowActionColumn<T extends StoreModel> extends IColumn<T> {
  statuses: Status[];
  edit?: string | ((record: T, reloadData: () => void) => void); // The component to render when the "Create New" button is clicked
  clone?: boolean;
  tags?: boolean;
  hideActions?: boolean;
  export?: boolean;
}

export const RowActions = observer(
  <T extends BaseModel>(props: RowActionsProps<T>) => {
    const nav = useNavigate();

    let statusClass = "";
    const statusObj = props.column.statuses.find((s) =>
      equals(s.id, props.record["status" as keyof T] as string | number)
    );
    if (statusObj) {
      statusClass = statusObj.class;
    }

    const setStatus = (status: Status) => {
      if (
        window.confirm(
          `Are you sure you want to set status to ${status.label}?`
        )
      ) {
        runInAction(() => {
          props.record.status = status.id;
          props.record.save();
        });
      }
    };

    const clone = async () => {
      if (!window.confirm("Are you sure you want to clone this?")) return;
      const clonedRecord = await props.record._store.queryRecord(
        `${props.record.id}/clone`,
        {}
      );
      if (clonedRecord.success) {
        nav(
          `/${plural(props.record._model_name)}/edit/${clonedRecord.data.id}`
        );
      }
    };

    const copyText = (text: string) => {
      // copy to clipboard as fallback
      const copyResult = copy(text);
      if (copyResult) {
        NotificationService.addSuccess(`Copied to your clipboard`);
      } else {
        NotificationService.addError(`Failed to copy`);
      }
    };

    const showEditButton = props.column.edit ? true : false;

    // Extract slot components from children
    const childArray = React.Children.toArray(props.children);
    const preActions = childArray.find(
      (child) =>
        React.isValidElement(child) && child.type === RowActionsPreActions
    );
    const actions = childArray.find(
      (child) => React.isValidElement(child) && child.type === RowActionsActions
    );
    const postActions = childArray.find(
      (child) =>
        React.isValidElement(child) && child.type === RowActionsPostActions
    );
    // Filter out slot components from the other children
    const otherChildren = childArray.filter((child) => {
      if (!React.isValidElement(child)) return true; // Keep non-elements
      if (typeof child.type === "string") return true; // Keep normal HTML elements

      if (child.type === RowActionsPreActions) {
        return false;
      }
      if (child.type === RowActionsActions) {
        return false;
      }
      if (child.type === RowActionsPostActions) {
        return false;
      }
      return true;
    });

    return (
      <Menu>
        <>
          <MenuButton
            className={cn([
              "cursor-pointer bg-white",
              "inline-flex items-center rounded-lg border border-transparent px-1.5 py-1 text-left text-xs hover:border-gray-300",
              "hover:shadow-sm",
            ])}
          >
            <i
              className={`${statusClass} mr-1 text-[12px]`}
              title={statusObj?.label}
            ></i>
            {statusObj?.label && (
              <span>{statusObj.short || statusObj.label}</span>
            )}
            <i className="fa-solid fa-chevron-down fa-sm ml-1"></i>
          </MenuButton>
          <MenuItems
            transition
            anchor="bottom start"
            className="z-popover mt-0 flex min-w-44 origin-top flex-col items-start divide-y rounded-md border border-gray-200 bg-white shadow transition duration-200 ease-out data-[closed]:-translate-y-1 data-[closed]:opacity-0"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {/* Pre-Actions Slot */}
            {preActions && <>{preActions}</>}

            {/* Actions Slot */}
            {actions ? (
              <>{actions}</>
            ) : (
              <>
                {!props.column.hideActions && (
                  <>
                    {props.column.statuses.map((status) => (
                      <MenuOption
                        key={status.id}
                        onClick={() => setStatus(status)}
                        prependIcon={<i className={`${status.class} mr-2`}></i>}
                      >
                        Set {status.label}
                      </MenuOption>
                    ))}
                  </>
                )}
                {otherChildren}
                {showEditButton && (
                  <>
                    {typeof props.column.edit === "string" ? (
                      <MenuOption
                        prependIcon={<i className="fa fa-pencil mr-2"></i>}
                        as={"a"}
                        href={props.column.edit + "/" + props.record.id}
                      >
                        Edit
                      </MenuOption>
                    ) : typeof props.column.edit === "function" ? (
                      <MenuOption
                        prependIcon={<i className="fa fa-pencil mr-2"></i>}
                        onClick={() => {
                          if (typeof props.column.edit === "function") {
                            props.column.edit(
                              props.record,
                              props.tableState.reloadData
                            );
                          }
                        }}
                      >
                        Edit
                      </MenuOption>
                    ) : null}
                  </>
                )}

                {props.column.clone && (
                  <MenuOption
                    prependIcon={<i className="fa fa-people-arrows mr-2"></i>}
                    onClick={clone}
                  >
                    Clone
                  </MenuOption>
                )}
              </>
            )}

            {/* Post-Actions Slot */}
            {postActions && <>{postActions}</>}
            {!props.noChangelogs && (
              <MenuOption
                prependIcon={<i className="fa fa-rotate-left mr-2"></i>}
                as={"a"}
                href={"/change_logs/?object_urn=" + props.record.urn}
              >
                Change Logs
              </MenuOption>
            )}

            <MenuOption
              prependIcon={<i className="fa fa-eye mr-2"></i>}
              onClick={() =>
                LayerService.add({
                  id: ViewRecordModalId,
                  component: ViewRecordModal,
                  props: { record: props.record },
                })
              }
            >
              View Record
            </MenuOption>
            <MenuOption
              onClick={() => copyText(props.record.id || "")}
              className="text-xs"
            >
              {props.record.id}
            </MenuOption>
            <MenuOption
              onClick={() => copyText(props.record.urn || "")}
              className="text-xs"
            >
              {props.record.urn}
            </MenuOption>
          </MenuItems>
        </>
      </Menu>
    );
  }
);
