import { TableState } from "@/models/store/state/TableState";
import {
    Popover,
    PopoverButton,
    PopoverPanel,
    Transition,
} from "@headlessui/react";
import { observer } from "mobx-react-lite";
import { Fragment, useRef, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Button } from "../../buttons/Button";
import { CheckboxInput } from "../../fields/CheckboxInput";
import { IColumn } from "../../types/columns";

interface ColumnSelectorProps<T extends object> {
  tableState: TableState<T>;
  position?: "left" | "right";
}
export const ColumnSelector = observer(
  <T extends object>(props: ColumnSelectorProps<T>) => {
    const { tableState } = props;
    const [sortedItems, setSortedItems] = useState([...tableState.columns]);

    const moveItem = (dragIndex: number, hoverIndex: number) => {
      const draggedItem = sortedItems[dragIndex] as IColumn<T>;
      const newSortedItems = [...sortedItems];
      newSortedItems.splice(dragIndex, 1);
      newSortedItems.splice(hoverIndex, 0, draggedItem);
      setSortedItems(newSortedItems);
    };

    const toggleColumn = (index: number) => {
      const col = sortedItems[index];
      if (!col) return;
      sortedItems[index] = Object.assign({}, col, { hidden: !col.hidden });
      setSortedItems([...sortedItems]);
    };

    const apply = () => {
      tableState.applyColumns(sortedItems);
    };

    const revert = () => {
      setSortedItems([...tableState.default_columns]);
      tableState.applyColumns(tableState.default_columns, true);
    };

    let position = "left-0";
    switch (props.position) {
      case "left":
        position = "left-0";
        break;
      case "right":
        position = "right-0";
        break;
    }

    return (
      <DndProvider backend={HTML5Backend}>
        <Popover className="relative">
          <PopoverButton as={Button} variant="tertiary" size="md">
            <i className="u u-columns-02 py-2 text-fg-neutral-quaternary"></i>
            <i className="fa-solid fa-chevron-down fa-sm text-fg-neutral-quaternary"></i>
          </PopoverButton>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <PopoverPanel
              className={`absolute divide-y px-4 ${position} z-popover mt-3 divide-gray-100 rounded-lg border-2 border-gray-300 bg-white shadow-sm sm:px-0`}
            >
              {({ close }) => (
                <div className="flex flex-col">
                  <ul className="space-y-1 p-3">
                    {sortedItems.map((column, index) =>
                      column.fixed ? (
                        <FixedItem
                          key={index}
                          column={column}
                          index={index}
                          moveItem={moveItem}
                          toggleColumn={toggleColumn}
                        />
                      ) : (
                        <ColumnItem
                          key={index}
                          column={column}
                          index={index}
                          moveItem={moveItem}
                          toggleColumn={toggleColumn}
                        />
                      ),
                    )}
                  </ul>
                  <div className="flex gap-x-2 p-2">
                    <Button
                      variant="tertiary"
                      onClick={() => {
                        revert();
                        close();
                      }}
                    >
                      Reset
                      <i className="fa fa-close"></i>
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => {
                        apply();
                        close();
                      }}
                    >
                      Apply
                      <i className="fa fa-check-square"></i>
                    </Button>
                  </div>
                </div>
              )}
            </PopoverPanel>
          </Transition>
        </Popover>
      </DndProvider>
    );
  },
);

interface ColumnItemProps<T extends object> {
  column: IColumn<T>;
  index: number;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
  toggleColumn: (index: number) => void;
}

const FixedItem = observer(<T extends object>(props: ColumnItemProps<T>) => {
  return (
    <li className="text-nowrap rounded-md border bg-gray-200 p-1">
      <div className="pl-9 text-sm leading-4">
        <label className="font-medium text-gray-700">
          {props.column.title}
        </label>
      </div>
    </li>
  );
});

const ColumnItem = observer(<T extends object>(props: ColumnItemProps<T>) => {
  const ref = useRef(null);
  //@eslint-disable-next-line
  const [, drag] = useDrag({
    type: "column",
    item: { index: props.index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  //@eslint-disable-next-line
  const [, drop] = useDrop({
    accept: "column",
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover: (item: any) => {
      const dragIndex = item.index;
      const hoverIndex = props.index;

      if (dragIndex === hoverIndex) {
        return;
      }

      props.moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <li
      ref={ref}
      className={`text-nowrap rounded-md border border-gray-300 p-1`}
      style={{ cursor: "move" }}
    >
      <CheckboxInput
        icon="fa fa-bars mr-2"
        value={props.column.hidden ? 0 : 1}
        placeholder={props.column.title}
        uncheckedValue={0}
        checkedValue={1}
        handleChange={() => {
          props.toggleColumn(props.index);
        }}
      />
    </li>
  );
});
