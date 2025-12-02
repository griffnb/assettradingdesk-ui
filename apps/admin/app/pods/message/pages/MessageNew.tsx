import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { AdminTitleBar } from "@/ui/admin/nav/AdminTitleBar";

import { MessageForm  } from "@/admin/pods/message/components/MessageForm";
import { MessageModel } from "@/models/models/message/model/MessageModel";

//interface MessageNewProps {}

export const MessageNew = observer(function MessageNew() {
  const [record, setRecord] = useState<MessageModel | null>(null);

  useEffect(() => {
    const rec = Store.message.create();
    setRecord(rec);
  }, []);

  if (!record) return null;

    return (
    <>
      <AdminTitleBar title="New Message" />
      <MessageForm record={record} />
    </>
  );
});
