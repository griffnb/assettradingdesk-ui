import {
    Popover,
    PopoverButton,
    PopoverPanel,
    Transition,
} from "@headlessui/react";
import { observer } from "mobx-react-lite";
import { Fragment, useState } from "react";
import { Button } from "../buttons/Button";
import { TextInput } from "../fields/TextInput";
import { IMathFilter } from "../types/filters";
interface TableMathFiltersProps {
  mathFilters: IMathFilter[];
  tableMathFilters: { [key: string]: string };
  applyTableMathFilters: (mathFilters: { [key: string]: string }) => void;
}
const TableMathFilters = observer((props: TableMathFiltersProps) => {
  const [filterValues, setFilterValues] = useState<{
    [key: string]: string;
  }>(props.tableMathFilters);

  if (props.tableMathFilters != filterValues) {
    setFilterValues(props.tableMathFilters);
  }

  const setFilterValue = (filter: IMathFilter, value: string | undefined) => {
    if (value === undefined) {
      delete filterValues[filter.field];
    } else {
      filterValues[filter.field] = value.toString();
    }
    setFilterValues({ ...filterValues });
  };

  const applyFilters = () => {
    props.applyTableMathFilters({ ...filterValues });
  };
  const clearFilters = () => {
    props.applyTableMathFilters({});
  };

  return (
    <Popover className="relative">
      <PopoverButton as={Button} variant="tertiary" size="md">
        <i className="fa fa-filter"></i>
        <span className="mx-2">Math Filters</span>
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
        <PopoverPanel className="absolute left-0 z-popover mt-3 min-w-[700px] divide-y divide-gray-100 rounded-lg border-2 border-gray-300 bg-white shadow-sm sm:px-0">
          {({ close }) => (
            <>
              <div className="flex items-center justify-between pl-4 text-gray-900">
                <h3 className="text-lg leading-5">Math Filter</h3>
                <h3 className="text-xs leading-5">{`Standard Math Values: <5 >5 <=5 | BETWEEN: 5<>10 |  NOT BETWEEN: 5><10`}</h3>
                <button
                  className="p-4"
                  onClick={() => {
                    close();
                  }}
                >
                  <i className="fa fa-close"></i>
                </button>
              </div>
              <div className="grid grid-cols-4 gap-3 px-4 py-2">
                {props.mathFilters.map((filter, index) => (
                  <div key={index}>
                    {filter.label}
                    <TextInput
                      {...filter}
                      value={filterValues[filter.field] as string}
                      handleChange={(value: string) => {
                        setFilterValue(filter, value);
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex gap-x-2 p-4">
                <Button
                  variant="tertiary"
                  onClick={() => {
                    clearFilters();
                    close();
                  }}
                >
                  Clear
                  <i className="fa fa-close"></i>
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    applyFilters();
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

export default TableMathFilters;
