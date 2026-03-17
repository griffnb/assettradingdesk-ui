import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { BreadcrumbService } from "@/ui/admin/nav/BreadcrumbService";
import { IndustryModel } from "@/models/models/industry/model/IndustryModel";

//interface IndustryDetailProps {}

export const IndustryDetails = observer(function IndustryDetails() {
  const [record, setRecord] = useState<IndustryModel | null>(null);
  // Use the useRouter hook to access the router object
  const params = useParams();
  // Access the dynamic id from the URL
  const { id } = params;

  useEffect(() => {
    if (!id) return;
    Store.industry.get(id as string).then(
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
      { label: "Industries", href: "/industries" },
      { label: record.label },
    ]);
  }, [record]);

  if (!record) return null;


  return (
    <>
          </>
  );
});
