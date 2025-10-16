import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { AdminTitleBar } from "@/ui/admin/nav/AdminTitleBar";

import { IndustryForm  } from "@/admin/pods/industry/components/IndustryForm";
import { IndustryModel } from "@/models/models/industry/model/IndustryModel";

//interface IndustryNewProps {}

export const IndustryNew = observer(function IndustryNew() {
  const [record, setRecord] = useState<IndustryModel | null>(null);

  useEffect(() => {
    const rec = Store.industry.create();
    setRecord(rec);
  }, []);

  if (!record) return null;

    return (
    <>
      <AdminTitleBar title="New Industry" />
      <IndustryForm record={record} />;
    </>
  );
});
