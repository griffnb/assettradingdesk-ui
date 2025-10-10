import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { Button } from "../../buttons/Button";
import { MassAction, MassActionProps } from "../../types/mass-actions";

interface MassActionsProps<T extends object> {
  options: MassActionProps<T>;
  massActions: MassAction<T>[];
}

export const MassActionItemClass = "block px-4 py-2 hover:bg-gray-100";

const MassActions = observer(<T extends object>(props: MassActionsProps<T>) => {
  return (
    <Menu>
      <MenuButton as="div">
        <Button
          className="bg-fg-neutral-secondary py-2 text-white"
          variant="custom"
          size="md"
          appendIcon={<i className="fa fa-chevron-down"></i>}
        >
          Mass Actions
        </Button>
      </MenuButton>
      <MenuItems
        transition
        anchor="bottom start"
        className="z-popover mt-1 flex min-w-44 origin-top flex-col items-start divide-y rounded-md border border-gray-200 bg-white shadow transition duration-200 ease-out data-[closed]:-translate-y-1 data-[closed]:opacity-0"
      >
        {props.massActions.map((action, index) => {
          return <Fragment key={index}>{action(props.options)}</Fragment>;
        })}
      </MenuItems>
    </Menu>
  );
});

export default MassActions;
