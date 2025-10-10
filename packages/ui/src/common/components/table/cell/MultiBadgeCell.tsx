import { cn } from "@/utils/cn";
import { observer } from "mobx-react-lite";
import { Badge, BadgeColors } from "../../badge/Badge";
import { IColumn, TableCellProps } from "../../types/columns";

export interface MultiBadgeCellProps<T extends object>
  extends TableCellProps<T> {
  column: IColumn<T>;
  values?: string[];
}

export const MultiBadgeCell = observer(
  <T extends object>(props: MultiBadgeCellProps<T>) => {
    const values =
      props.values || (props.record[props.column.field] as string[]);
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
        {values.map((val, index) => (
          <Badge
            key={index}
            color={colors[stringToNumber(val) % colors.length] as any}
            variant={"pillColor"}
            size={"sm"}
          >
            {val}
          </Badge>
        ))}
      </div>
    );
  },
);
