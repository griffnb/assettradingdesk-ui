import { Store } from "@/models/store/Store";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

import { MessageForm } from "@/admin/pods/message/components/MessageForm";
import { MessageModel } from "@/models/models/message/model/MessageModel";
import { BreadcrumbService } from "@/ui/admin/nav/BreadcrumbService";

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

  useEffect(() => {
    if (!record) return;
    BreadcrumbService.setSegments([
      { label: "Home", href: "/" },
      { label: "Messages", href: "/messages" },
      { label: record.label, href: record.link("details") },
      { label: "Edit" },
    ]);
  }, [record]);

  if (!record) return null;


  return (
    <>
      <MessageForm record={record} />
    </>
  );
});
