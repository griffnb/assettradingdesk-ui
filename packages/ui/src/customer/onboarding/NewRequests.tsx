"use client";

import { RequestModel } from "@/models/models/request/model/RequestModel";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/ui/shadcn/ui/card";
import { observer } from "mobx-react-lite";
import { CustomerRequestForm } from "../requests/CustomerRequestForm";

interface NewRequestsProps {
  record: RequestModel;
  onSuccess: (record: RequestModel) => void;
  onCancel: () => void;
}

export const NewRequests = observer(function NewRequests(
  props: NewRequestsProps,
) {
  

  return (
    <Card className="shadow-lg w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Create Your First Request</CardTitle>
      </CardHeader>
      <CardContent >
        <div className="flex max-h-[75dvh] flex-col overflow-auto">

      
       <CustomerRequestForm record={props.record} 
       onSuccess={props.onSuccess}
        onCancel={props.onCancel}
       />
       </div>
      </CardContent>
      
    </Card>
  );
});
