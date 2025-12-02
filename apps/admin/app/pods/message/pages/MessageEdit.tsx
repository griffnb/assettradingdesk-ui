import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

import { MessageForm } from "@/admin/pods/message/components/MessageForm";
import { MessageModel } from "@/models/models/message/model/MessageModel";
import { AdminTitleBar } from "@/ui/admin/nav/AdminTitleBar";

//interface MessageEditProps {}

export const MessageEdit = observer(function MessageEdit() {
  const [record, setRecord] = useState<MessageModel | null>(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (!id) return;
    Store.message.get(id as string).then(
      (rec) => {
        if(!rec.data) return;
        setRecord(rec.data);
      },
    );
  }, [id]);

  if (!record) return null;

  return (
    <>
      <AdminTitleBar title="Edit Message" objectURN={record.urn} />
      <MessageForm record={record} />
    </>
  );
});
