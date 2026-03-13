"use client";

import { isObjectValid } from "@/common_lib/utils/validations";
import { constants } from "@/models/constants";
import { OrganizationModel } from "@/models/models/organization/model/OrganizationModel";
import { FormFieldSelect } from "@/ui/common/components/form/fields/FormFieldSelect";
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
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";

interface SetupOrganizationProps {
  record: OrganizationModel;
  onSuccess?: (record: OrganizationModel) => void;
}

export const SetupOrganization = observer(function SetupOrganization(
  props: SetupOrganizationProps,
) {
  const saveAction = async () => {
    runInAction(async () => {
      const messages = isObjectValid<OrganizationModel>(props.record);
      if (messages.length > 0) {
        return false;
      }
      const resp = await props.record.save({ setup: "true" });

      if (resp.success && props.onSuccess) {
        props.onSuccess(props.record);
      }
    });
  };

  return (
    <Card className="w-full max-w-2xl shadow-lg">
      <CardHeader className="border-b pb-4">
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
        <FormFieldSelect
          record={props.record}
          field="organization_type"
          label="Organization Type"
          placeholder="Select organization type"
          className="space-y-2"
          options={constants.organization.organization_type}
        />
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button onClick={saveAction} className="flex-1">
          Create Organization
        </Button>
      </CardFooter>
    </Card>
  );
});
