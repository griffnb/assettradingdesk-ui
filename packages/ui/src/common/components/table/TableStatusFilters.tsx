import { TableState } from "@/models/store/state/TableState";
import { Status } from "@/models/types/constants";
import { cn } from "@/utils/cn";
import { equals, inArray } from "@/utils/numbers";
import {
    Popover,
    PopoverButton,
    PopoverPanel,
    Transition,
} from "@headlessui/react";
import { cva } from "class-variance-authority";
import { observer } from "mobx-react-lite";
import { Fragment, useEffect, useState } from "react";
import { Button } from "../buttons/Button";
import { CheckboxInput } from "../fields/CheckboxInput";

interface TableStatusFiltersProps<T extends object> {
  statuses?: Status[];
  tableState: TableState<T>;
  variant?: "default" | "compact" | "custom" | null;
}

const popoverPanelVariants = cva(
  "absolute left-0 z-popover mt-3 min-w-44 divide-y divide-gray-100 rounded-lg border-2 border-gray-300 bg-white shadow-sm sm:px-0",
  {
    variants: {
      variant: {
        default: "",
        compact: "-translate-x-1/2",
        custom: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
export const TableStatusFilters = observer(
  <T extends object>(rawProps: TableStatusFiltersProps<T>) => {
    const { tableState, ...props } = rawProps;
    const [statusIDs, setStatusIDs] = useState<number[]>([]);

    useEffect(() => {
      setStatusIDs(tableState.statusFilters);
    }, [tableState.statusFilters]);

    const toggleStatus: (status: number) => void = (status: number) => {
      const newStatusFilters = inArray(statusIDs, status)
        ? statusIDs.filter((s) => !equals(s, status))
        : [...statusIDs, status];
      setStatusIDs(newStatusFilters);
    };

    const applyStatusFilters = (statuses?: number[]) => {
      if (statuses) {
        setStatusIDs(statuses);
        tableState.applyStatusFilters(statuses);
        return;
      }

      tableState.applyStatusFilters([...statusIDs]);
    };

    return (
      <Popover className="relative">
        <PopoverButton
          as={Button}
          variant="tertiary"
          size="md"
          className="py-2"
        >
          <span className="mr-2">Status</span>
          <i className="fa-solid fa-chevron-down fa-sm ml-1"></i>
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
            className={cn(popoverPanelVariants({ variant: props.variant }))}
          >
            {({ close }) => (
              <>
                <div className="divide-y text-nowrap text-sm text-gray-700">
                  {props.statuses?.map((status, index) => (
                    <div key={index} className="cursor-pointer p-2">
                      <CheckboxInput
                        icon={status.class}
                        value={inArray(statusIDs, status.id) ? status.id : 0}
                        placeholder={status.label}
                        uncheckedValue={0}
                        checkedValue={status.id}
                        handleChange={() => {
                          toggleStatus(status.id);
                        }}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col">
                  <Button
                    variant="tertiary"
                    className="w-full rounded-none border-x-0"
                    onClick={() => {
                      setStatusIDs(
                        props.statuses?.map((status) => status.id) || [],
                      );
                    }}
                    appendIcon={<i className="fa fa-check-square"></i>}
                  >
                    Check All
                  </Button>
                  <div className="flex flex-row gap-x-3 p-3">
                    <Button
                      variant="primary"
                      className="w-full"
                      onClick={() => {
                        applyStatusFilters();
                        close();
                      }}
                      appendIcon={<i className="fa fa-check-square"></i>}
                    >
                      Apply
                    </Button>
                    <Button
                      variant="tertiary"
                      className="w-full"
                      onClick={() => {
                        setStatusIDs([]);
                      }}
                    >
                      Clear
                    </Button>
                  </div>
                </div>
              </>
            )}
          </PopoverPanel>
        </Transition>
      </Popover>
    );
  },
);
