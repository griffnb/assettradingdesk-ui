"use client";

import { RequestModel } from "@/models/models/request/model/RequestModel";
import { FormFieldText } from "@/ui/common/components/form/fields/FormFieldText";
import FormFieldTextArea from "@/ui/common/components/form/fields/FormFieldTextArea";
import { Button } from "@/ui/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/shadcn/ui/card";
import { isObjectValid } from "@/utils/validations";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";

interface NewRequestsProps {
  record: RequestModel;
  onSuccess?: (record: RequestModel) => void;
  onCancel?: () => void;
}

export const NewRequests = observer(function NewRequests(
  props: NewRequestsProps,
) {
  const saveAction = async () => {
    runInAction(async () => {
      const messages = isObjectValid<RequestModel>(props.record);
      if (messages.length > 0) {
        console.log(messages);
        return false;
      }
      const resp = await props.record.save();

      if (resp.success && props.onSuccess) {
        props.onSuccess(props.record);
      }
    });
  };

  const handleCancel = () => {
    props.record.rollback();
    if (props.onCancel) {
      props.onCancel();
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Create Your First Request</CardTitle>
        <CardDescription>
          Tell us what equipment you're looking for and we'll match you with
          sellers.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormFieldText
          record={props.record}
          field="description"
          type="text"
          label="Equipment Description"
          placeholder="What are you looking for?"
          className="space-y-2"
        />

        <FormFieldTextArea
          record={props.record}
          field="configuration_notes"
          label="Configuration Notes"
          placeholder="Describe specific configurations, requirements, or special considerations..."
          rows={5}
          className="space-y-2"
        />

        <div className="grid gap-4 md:grid-cols-2">
          <FormFieldText
            record={props.record}
            field="min_price"
            type="number"
            label="Minimum Price (USD)"
            placeholder="0"
            className="space-y-2 font-mono"
          />
          <FormFieldText
            record={props.record}
            field="max_price"
            type="number"
            label="Maximum Price (USD)"
            placeholder="0"
            className="space-y-2 font-mono"
          />
        </div>

        <FormFieldText
          record={props.record}
          field="time_frame"
          type="number"
          label="Time Frame (Days)"
          placeholder="90"
          className="space-y-2"
        />
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" onClick={handleCancel} className="flex-1">
          Cancel
        </Button>
        <Button onClick={saveAction} className="flex-1">
          Create Request
        </Button>
      </CardFooter>
    </Card>
  );
});
