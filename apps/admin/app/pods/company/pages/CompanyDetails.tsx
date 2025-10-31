import { CompanyModel } from "@/models/models/company/model/CompanyModel";
import { Store } from "@/models/store/Store";
import { AdminTitleBar } from "@/ui/admin/nav/AdminTitleBar";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { CompanyAssets } from "../components/details/CompanyAssets";
import { CompanyClients } from "../components/details/CompanyClients";
import { CompanyFacilities } from "../components/details/CompanyFacilities";
import { CompanyInfo } from "../components/details/CompanyInfo";
import { CompanyRequests } from "../components/details/CompanyRequests";

//interface CompanyDetailProps {}

export const CompanyDetails = observer(function CompanyDetails() {
  const [record, setRecord] = useState<CompanyModel | null>(null);
  // Use the useRouter hook to access the router object
  const params = useParams();
  // Access the dynamic id from the URL
  const { id } = params;

  useEffect(() => {
    if (!id) return;
    Store.company.get(id as string).then((rec) => {
      if (!rec.data) return;
      setRecord(rec.data);
    });
  }, [id]);

  if (!record) return null;

  return (
    <>
      <AdminTitleBar objectURN={record.urn} title="Company" />
      <CompanyInfo company={record} />
      <CompanyClients company={record} />
      <CompanyFacilities company={record} />
      <CompanyAssets company={record} />
      <CompanyRequests company={record} />
    </>
  );
});
