import { MessageModel } from "@/models/models/message/model/MessageModel";
import { Store } from "@/models/store/Store";
import { AdminTitleBar } from "@/ui/admin/nav/AdminTitleBar";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { MessageInfo } from "../components/details/MessageInfo";

//interface MessageDetailProps {}

export const MessageDetails = observer(function MessageDetails() {
  const [record, setRecord] = useState<MessageModel | null>(null);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    Store.message.get(id as string).then((rec) => {
      if (!rec.data) return;
      setRecord(rec.data);
    });
  }, [id]);

  if (!record) return null;

  return (
    <>
      <AdminTitleBar objectURN={record.urn} title="Message" />
      <MessageInfo message={record} />
    </>
  );
});
