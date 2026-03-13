import { MessageModel } from "@/models/models/message/model/MessageModel";
import { Store } from "@/models/store/Store";
import { BreadcrumbService } from "@/ui/admin/nav/BreadcrumbService";
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

  useEffect(() => {
    if (!record) return;
    BreadcrumbService.setSegments([
      { label: "Home", href: "/" },
      { label: "Messages", href: "/messages" },
      { label: record.label },
    ]);
  }, [record]);

  if (!record) return null;


  return (
    <>
      <MessageInfo message={record} />
    </>
  );
});
