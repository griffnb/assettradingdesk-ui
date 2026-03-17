import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { BreadcrumbService } from "@/ui/admin/nav/BreadcrumbService";

import { IndustryForm  } from "@/admin/pods/industry/components/IndustryForm";
import { IndustryModel } from "@/models/models/industry/model/IndustryModel";

//interface IndustryNewProps {}

export const IndustryNew = observer(function IndustryNew() {
  const [record, setRecord] = useState<IndustryModel | null>(null);

  useEffect(() => {
    const rec = Store.industry.create();
    setRecord(rec);
  }, []);

  useEffect(() => {
    BreadcrumbService.setSegments([
      { label: "Home", href: "/" },
      { label: "Industries", href: "/industries" },
      { label: "New" },
    ]);
  }, []);

  if (!record) return null;
    return (
    <>
      <IndustryForm record={record} />;
    </>
  );
});
