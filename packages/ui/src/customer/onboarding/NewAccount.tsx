"use client";

import { AccountModel } from "@/models/models/account/model/AccountModel";
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

interface NewAccountProps {
  record: AccountModel;
  onSuccess?: (record: AccountModel) => void;
  onCancel?: () => void;
}

export const NewAccount = observer(function NewAccount(props: NewAccountProps) {
  const saveAction = async () => {
    runInAction(async () => {
      const messages = isObjectValid<AccountModel>(props.record);
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
        <CardTitle>Create Your Account</CardTitle>
        <CardDescription>
          Let's start by setting up your account information.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormFieldText
          record={props.record}
          field="first_name"
          type="text"
          label="First Name"
          placeholder="Enter your first name"
          className="space-y-2"
        />
        <FormFieldText
          record={props.record}
          field="middle_name"
          type="text"
          label="Middle Name"
          placeholder="Enter your middle name (optional)"
          className="space-y-2"
        />
        <FormFieldText
          record={props.record}
          field="last_name"
          type="text"
          label="Last Name"
          placeholder="Enter your last name"
          className="space-y-2"
        />
        <FormFieldText
          record={props.record}
          field="email"
          type="email"
          label="Email"
          placeholder="Enter your email address"
          className="space-y-2"
        />
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" onClick={handleCancel} className="flex-1">
          Cancel
        </Button>
        <Button onClick={saveAction} className="flex-1">
          Create Account
        </Button>
      </CardFooter>
    </Card>
  );
});
