import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { BreadcrumbService } from "@/ui/admin/nav/BreadcrumbService";
import { OpportunityModel } from "@/models/models/opportunity/model/OpportunityModel";
import { OpportunityInfo } from "../components/details/OpportunityInfo";

//interface OpportunityDetailProps {}

export const OpportunityDetails = observer(function OpportunityDetails() {
  const [record, setRecord] = useState<OpportunityModel | null>(null);
  // Use the useRouter hook to access the router object
  const params = useParams();
  // Access the dynamic id from the URL
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
      { label: record.label },
    ]);
  }, [record]);

  if (!record) return null;


  return (
    <>
      <OpportunityInfo opportunity={record} />
    </>
  );
});
