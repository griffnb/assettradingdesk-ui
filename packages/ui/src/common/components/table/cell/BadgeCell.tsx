import { cn } from "@/utils/cn";
import { observer } from "mobx-react-lite";
import { Badge, BadgeColors } from "../../badge/Badge";
import { IColumn, TableCellProps } from "../../types/columns";

export interface BadgeCellProps<T extends object> extends TableCellProps<T> {
  column: IColumn<T>;
  extraText?: string;
}

export const BadgeCell = observer(
  <T extends object>(props: BadgeCellProps<T>) => {
    let value = "";
    if (props.column.displayField) {
      value = (props.record[props.column.displayField] as string) || "";
    } else {
      value = (props.record[props.column.field] as string) || "";
    }

    const colors = BadgeColors;

    const stringToNumber = (str: string): number => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      return Math.abs(hash);
    };
    return (
      <div
        className={cn(
          "flex max-w-48 flex-row flex-wrap gap-1",
          props.column.class,
        )}
      >
        <Badge
          color={colors[stringToNumber(value) % colors.length] as any}
          variant={"pillColor"}
          size={"sm"}
        >
          {value} {props.extraText}
        </Badge>
      </div>
    );
  },
);
