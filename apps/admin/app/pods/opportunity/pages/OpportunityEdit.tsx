import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

import { OpportunityForm } from "@/admin/pods/opportunity/components/OpportunityForm";
import { OpportunityModel } from "@/models/models/opportunity/model/OpportunityModel";
import { BreadcrumbService } from "@/ui/admin/nav/BreadcrumbService";

//interface OpportunityEditProps {}

export const OpportunityEdit = observer(function OpportunityEdit() {
  const [record, setRecord] = useState<OpportunityModel | null>(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (!id) return;
    Store.opportunity.get(id as string).then(
      (rec) => {
        if(!rec.data) return;
        setRecord(rec.data);
      },
    );
  }, [id]);

  useEffect(() => {
    if (!record) return;
    BreadcrumbService.setSegments([
      { label: "Home", href: "/" },
      { label: "Opportunities", href: "/opportunities" },
      { label: record.label, href: record.link("details") },
      { label: "Edit" },
    ]);
  }, [record]);

  if (!record) return null;


  return (
    <>
      <OpportunityForm record={record} />;
    </>
  );
});
