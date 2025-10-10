import {
    Popover,
    PopoverButton,
    PopoverPanel,
    Transition,
} from "@headlessui/react";
import { observer } from "mobx-react-lite";
import { Fragment, useState } from "react";
import { Button } from "../buttons/Button";
import { CheckboxInput } from "../fields/CheckboxInput";
import { IGroup } from "../types/filters";
interface TableGroupsProps {
  groups: IGroup[];
  tableGroups: { [key: string]: string };
  applyTableGroups: (filters: { [key: string]: string }) => void;
}
const TableGroups = observer((props: TableGroupsProps) => {
  const [groupValues, setGroupValues] = useState<{
    [key: string]: string;
  }>(props.tableGroups);

  if (props.tableGroups != groupValues) {
    setGroupValues(props.tableGroups);
  }

  const toggleGroup = (group: IGroup) => {
    if (groupValues[group.group_value]) {
      delete groupValues[group.group_value];
    } else {
      groupValues[group.group_value] = "1";
    }
    setGroupValues({ ...groupValues });
  };

  const applyGroups = () => {
    props.applyTableGroups({ ...groupValues });
  };
  const clearGroups = () => {
    props.applyTableGroups({});
  };

  return (
    <Popover className="relative">
      <PopoverButton as={Button} variant="tertiary" size="md">
        <i className="fa fa-filter"></i>
        <span className="mx-2">Groups</span>
        <i className="fa-solid fa-chevron-down fa-sm ml-4"></i>
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
        <PopoverPanel className="absolute left-0 z-popover mt-3 w-[500px] divide-y divide-gray-100 rounded-lg border-2 border-gray-300 bg-white shadow-sm sm:px-0">
          {({ close }) => (
            <>
              <div className="flex items-center justify-between pl-4 text-gray-900">
                <h3 className="text-lg leading-5">Group</h3>
                <button
                  className="p-4"
                  onClick={() => {
                    close();
                  }}
                >
                  <i className="fa fa-close"></i>
                </button>
              </div>
              <div className="grid grid-cols-3 gap-y-2">
                {props.groups.map((group, index) =>
                  group.gap ? (
                    <div key={index} className="col-span-3 my-1 border-b px-3">
                      {group.label}
                    </div>
                  ) : (
                    <CheckboxInput
                      key={index}
                      value={groupValues[group.group_value] ? 1 : 0}
                      checkedValue={1}
                      uncheckedValue={0}
                      handleChange={() => {
                        toggleGroup(group);
                      }}
                      label={group.label}
                    />
                  ),
                )}
              </div>
              <div className="flex gap-x-2 p-4">
                <Button
                  variant="tertiary"
                  onClick={() => {
                    clearGroups();
                    close();
                  }}
                >
                  Clear
                  <i className="fa fa-close"></i>
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    applyGroups();
                    close();
                  }}
                >
                  Apply
                  <i className="fa fa-check-square"></i>
                </Button>
              </div>
            </>
          )}
        </PopoverPanel>
      </Transition>
    </Popover>
  );
});

export default TableGroups;
