import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { AdminTitleBar } from "@/ui/admin/nav/AdminTitleBar";
import { AssetFileModel } from "@/models/models/asset_file/model/AssetFileModel";

//interface AssetFileDetailProps {}

export const AssetFileDetails = observer(function AssetFileDetails() {
  const [record, setRecord] = useState<AssetFileModel | null>(null);
  // Use the useRouter hook to access the router object
  const params = useParams();
  // Access the dynamic id from the URL
  const { id } = params;

  useEffect(() => {
    if (!id) return;
    Store.asset_file.get(id as string).then(
      (rec) => {
        if(!rec.data) return;
        setRecord(rec.data);
      },
    );
  }, [id]);

  if (!record) return null;

  return (
    <>
      <AdminTitleBar
        objectURN={record.urn}
        title="AssetFile" />
    </>
  );
});
