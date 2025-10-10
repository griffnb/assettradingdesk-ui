import { cn } from "@/utils/cn";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { observer } from "mobx-react-lite";
import { ReactNode, useState } from "react";
import CodeEdit from "../../form/CodeEdit";
import { IColumn, TableCellProps } from "../../types/columns";

export interface JSONCellColumn<T extends object> extends IColumn<T> {
  className?: string;
  buttonContents?: ReactNode | string;
}
interface JSONCellProps<T extends object> extends TableCellProps<T> {
  column: JSONCellColumn<T>;
  buttonContents?: ReactNode | string;
  cellValue?: ReactNode;
  jsonData?: any;
}

export const JSONCell = observer(
  <T extends object>(props: JSONCellProps<T>) => {
    const [isOpen, setIsOpen] = useState(false);

    const value = props.jsonData
      ? JSON.stringify(props.jsonData, null, 2)
      : JSON.stringify(props.record[props.column.field], null, 2);

    return (
      <div className="flex flex-row items-center gap-x-3">
        {props.cellValue}
        <button
          onClick={() => setIsOpen(true)}
          className={cn(
            `flex flex-row items-center gap-x-3 rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-sm`,
            props.column.className
          )}
        >
          {props.buttonContents
            ? props.buttonContents
            : props.column.buttonContents}
        </button>
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="relative z-popover"
        >
          <div className="fixed inset-0 flex size-full items-center justify-center bg-gray-500/50 p-4">
            <DialogPanel className="flex min-w-[70%] flex-col space-y-4 rounded-lg border bg-white p-5">
              <DialogTitle className="font-bold"></DialogTitle>
              <Description className="size-full overflow-auto">
                <CodeEdit
                  value={value}
                  onChange={() => {}}
                  language="javascript"
                  readOnly={true}
                />
              </Description>
            </DialogPanel>
          </div>
        </Dialog>
      </div>
    );
  }
);
