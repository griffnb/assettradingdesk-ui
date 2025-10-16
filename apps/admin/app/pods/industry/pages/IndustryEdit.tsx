import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

import { IndustryForm } from "@/admin/pods/industry/components/IndustryForm";
import { IndustryModel } from "@/models/models/industry/model/IndustryModel";
import { AdminTitleBar } from "@/ui/admin/nav/AdminTitleBar";

//interface IndustryEditProps {}

export const IndustryEdit = observer(function IndustryEdit() {
  const [record, setRecord] = useState<IndustryModel | null>(null);
  const params = useParams();
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

  if (!record) return null;

  return (
    <>
      <AdminTitleBar title="Edit Industry" objectURN={record.urn} />
      <IndustryForm record={record} />;
    </>
  );
});
