import { TableState } from "@/models/store/state/TableState";
import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { observer } from "mobx-react-lite";
import { Button } from "../buttons/Button";
import { MassAction, MassActionProps } from "../types/mass-actions";

interface ActionComponentsProps<T extends object> extends MassActionProps<T> {
  actions: MassAction<T>[];
  tableState: TableState<T>;
}

export const ActionComponents = observer(
  <T extends object>(props: ActionComponentsProps<T>) => {
    const { actions } = props;
    return (
      <>
        {actions && actions.length > 0 && (
          <Menu>
            <MenuButton
              as={Button}
              variant="custom"
              className="bg-fg-neutral-tertiary py-2 text-white"
              size="md"
            >
              <span className="ml-2">Actions</span>
              <i className="fa fa-chevron-down"></i>
            </MenuButton>
            <MenuItems
              transition
              anchor="bottom end"
              className="z-popover flex min-w-44 origin-top flex-col items-start rounded-md border border-gray-200 bg-white shadow transition duration-200 ease-out data-[closed]:-translate-y-1 data-[closed]:opacity-0"
            >
              <div className="flex flex-col items-center justify-start gap-y-2">
                {actions.map((component, index) => (
                  <div
                    key={index}
                    className="flex flex-row items-center self-stretch"
                  >
                    {component({
                      allRows: props.allRows,
                      tableState: props.tableState,
                    })}
                  </div>
                ))}
              </div>
            </MenuItems>
          </Menu>
        )}
      </>
    );
  },
);
