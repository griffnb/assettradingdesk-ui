import { FacilityModel } from "@/models/models/facility/model/FacilityModel";
import { Store } from "@/models/store/Store";
import { AdminTitleBar } from "@/ui/admin/nav/AdminTitleBar";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { FacilityAssets } from "../components/details/FacilityAssets";
import { FacilityClients } from "../components/details/FacilityClients";
import { FacilityInfo } from "../components/details/FacilityInfo";
import { FacilityRequests } from "../components/details/FacilityRequests";

//interface FacilityDetailProps {}

export const FacilityDetails = observer(function FacilityDetails() {
  const [record, setRecord] = useState<FacilityModel | null>(null);
  // Use the useRouter hook to access the router object
  const params = useParams();
  // Access the dynamic id from the URL
  const { id } = params;

  useEffect(() => {
    if (!id) return;
    Store.facility.get(id as string).then((rec) => {
      if (!rec.data) return;
      setRecord(rec.data);
    });
  }, [id]);

  if (!record) return null;

  return (
    <>
      <AdminTitleBar objectURN={record.urn} title="Facility" />
      <FacilityInfo facility={record} />
      <FacilityClients facility={record} />
      <FacilityAssets facility={record} />
      <FacilityRequests facility={record} />
    </>
  );
});
