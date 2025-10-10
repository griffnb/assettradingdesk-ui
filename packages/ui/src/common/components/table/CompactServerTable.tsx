import { observer } from "mobx-react-lite";
import { ReactNode } from "react";

import { StandardTableWrap, StandardTableWrapProps } from "./StandardTableWrap";

interface CompactServerTableProps<T extends object>
  extends StandardTableWrapProps<T> {
  title: string | ReactNode; // The title of the table
}

export const CompactServerTable = observer(
  <T extends object>(rawProps: CompactServerTableProps<T>) => {
    const {
      title,
      tableSearch = false,
      hideStatus = false,
      hideFilters = true,
      tableExport = false,
      hideColumnSelector = true,
    } = rawProps;

    return (
      <StandardTableWrap<T>
        {...rawProps}
        variant="compact"
        title={title}
        hideStatus={hideStatus}
        hideColumnSelector={hideColumnSelector}
        hideFilters={hideFilters}
        tableExport={tableExport}
        tableSearch={tableSearch}
      />
    );
  },
);
