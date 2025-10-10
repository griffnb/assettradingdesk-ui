import {
    Popover,
    PopoverButton,
    PopoverPanel,
    Transition,
} from "@headlessui/react";
import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { IColumn, TableCellProps } from "../../types/columns";
import { IField } from "../../types/filters";

interface ReportActionCellProps<T extends object> extends TableCellProps<T> {
  column: IColumn<T>;
}

const ReportActionCell = observer(
  <T extends object>(props: ReportActionCellProps<T>) => {
    const value = props.column.displayField
      ? (props.record[props.column.displayField as keyof T] as string)
      : (props.record[props.column.field as keyof T] as string);

    const addToFilters = () => {
      const currentFilters = props.tableState.tableFilters
        ? props.tableState.tableFilters
        : {};

      const filterKey: string | IField = props.column.filterValueField
        ? props.column.filterValueField
        : "";

      const targetFilter = props.column.filterTargetField
        ? props.column.filterTargetField
        : "";

      if (currentFilters[targetFilter]) {
        if (Array.isArray(currentFilters[targetFilter])) {
          const filterValues = currentFilters[targetFilter] as string[];
          filterValues.push(props.record[filterKey as keyof T] as string);
          currentFilters[targetFilter] = filterValues;
        } else {
          currentFilters[targetFilter] = [
            currentFilters[targetFilter] as string,
            props.record[filterKey as keyof T] as string,
          ];
        }
      } else {
        currentFilters[targetFilter] = [
          props.record[filterKey as keyof T] as string,
        ];
      }
    };

    const addAndApplyToFilters = () => {
      if (!props.tableState.applyTableFilters) {
        return;
      }
      const currentFilters = props.tableState.tableFilters
        ? props.tableState.tableFilters
        : {};

      const filterKey: string | IField = props.column.filterValueField
        ? props.column.filterValueField
        : "";

      const targetFilter = props.column.filterTargetField
        ? props.column.filterTargetField
        : "";

      if (currentFilters[targetFilter]) {
        if (Array.isArray(currentFilters[targetFilter])) {
          const filterValues = currentFilters[targetFilter] as string[];
          filterValues.push(props.record[filterKey as keyof T] as string);
          currentFilters[targetFilter] = filterValues;
        } else {
          currentFilters[targetFilter] = [
            currentFilters[targetFilter] as string,
            props.record[filterKey as keyof T] as string,
          ];
        }
      } else {
        currentFilters[targetFilter] = [
          props.record[filterKey as keyof T] as string,
        ];
      }
      props.tableState.applyTableFilters(currentFilters);
    };

    return (
      <>
        <Popover className="relative">
          {({ close }) => (
            <>
              <PopoverButton className="inline-flex text-nowrap border-b border-dotted border-blue-dark-500 text-left text-xs">
                {value}
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
                <PopoverPanel className="x-4 absolute left-0 z-popover w-44 divide-y rounded-lg border border-gray-200 bg-white font-normal shadow">
                  <ul className="py-0 text-left text-sm text-gray-700">
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={() => {
                          addToFilters();
                          close();
                        }}
                      >
                        Add To Filters
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={() => {
                          addAndApplyToFilters();
                          close();
                        }}
                      >
                        Add To Filters & Apply
                      </a>
                    </li>
                  </ul>
                </PopoverPanel>
              </Transition>
            </>
          )}
        </Popover>
      </>
    );
  },
);

export default ReportActionCell;
