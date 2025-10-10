import { observer } from "mobx-react-lite";
import { StandardTableWrap, StandardTableWrapProps } from "./StandardTableWrap";
import { TableBaseVariants } from "./TableBase";

interface CompactClientTableProps<T extends object>
  extends StandardTableWrapProps<T>,
    TableBaseVariants {
  title: string; // The title of the table
}

export const CompactClientTable = observer(
  <T extends object>(rawProps: CompactClientTableProps<T>) => {
    const {
      title,
      hideFilters = true,
      tableExport = false,
      hideColumnSelector = true,
    } = rawProps;
    return (
      <StandardTableWrap<T>
        {...rawProps}
        variant="compact"
        mode={"client"}
        title={title}
        tableExport={tableExport}
        hideFilters={hideFilters}
        hideColumnSelector={hideColumnSelector}
      />
    );
  },
);
