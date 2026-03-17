import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { BreadcrumbService } from "@/ui/admin/nav/BreadcrumbService";

import { MessageForm  } from "@/admin/pods/message/components/MessageForm";
import { MessageModel } from "@/models/models/message/model/MessageModel";

//interface MessageNewProps {}

export const MessageNew = observer(function MessageNew() {
  const [record, setRecord] = useState<MessageModel | null>(null);

  useEffect(() => {
    const rec = Store.message.create();
    setRecord(rec);
  }, []);

  useEffect(() => {
    BreadcrumbService.setSegments([
      { label: "Home", href: "/" },
      { label: "Messages", href: "/messages" },
      { label: "New" },
    ]);
  }, []);

  if (!record) return null;
    return (
    <>
      <MessageForm record={record} />
    </>
  );
});
