"use client";

import { OrganizationModel } from "@/models/models/organization/model/OrganizationModel";
import { FormFieldText } from "@/ui/common/components/form/fields/FormFieldText";
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

interface NewOrganizationProps {
  record: OrganizationModel;
  onSuccess?: (record: OrganizationModel) => void;
  onCancel?: () => void;
}

export const NewOrganization = observer(function NewOrganization(
  props: NewOrganizationProps,
) {
  const saveAction = async () => {
    runInAction(async () => {
      const messages = isObjectValid<OrganizationModel>(props.record);
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
        <CardTitle>Create Your Organization</CardTitle>
        <CardDescription>
          Set up your organization to manage assets and requests.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormFieldText
          record={props.record}
          field="name"
          type="text"
          label="Organization Name"
          placeholder="Enter organization name"
          className="space-y-2"
        />
        <FormFieldText
          record={props.record}
          field="external_id"
          type="text"
          label="External ID"
          placeholder="Enter external identifier"
          className="space-y-2"
        />
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" onClick={handleCancel} className="flex-1">
          Cancel
        </Button>
        <Button onClick={saveAction} className="flex-1">
          Create Organization
        </Button>
      </CardFooter>
    </Card>
  );
});
