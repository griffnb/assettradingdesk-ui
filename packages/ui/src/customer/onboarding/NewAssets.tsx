"use client";

import { constants } from "@/models/constants";
import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { FormFieldSelect } from "@/ui/common/components/form/fields/FormFieldSelect";
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

interface NewAssetsProps {
  record: AssetModel;
  onSuccess?: (record: AssetModel) => void;
  onCancel?: () => void;
}

export const NewAssets = observer(function NewAssets(props: NewAssetsProps) {
  const saveAction = async () => {
    runInAction(async () => {
      const messages = isObjectValid<AssetModel>(props.record);
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
        <CardTitle>List Your First Asset</CardTitle>
        <CardDescription>
          Add equipment to your inventory to connect with potential buyers.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <FormFieldText
            record={props.record}
            field="description"
            type="text"
            label="Description"
            placeholder="Brief description of the asset"
            className="space-y-2"
          />
          <FormFieldText
            record={props.record}
            field="location"
            type="text"
            label="Location"
            placeholder="City, State/Country"
            className="space-y-2"
          />
          <FormFieldText
            record={props.record}
            field="year"
            type="number"
            label="Year"
            placeholder="2020"
            className="space-y-2"
          />
          <FormFieldText
            record={props.record}
            field="price"
            type="number"
            label="Price (USD)"
            placeholder="0"
            className="space-y-2 font-mono"
          />
          <FormFieldText
            record={props.record}
            field="quantity"
            type="number"
            label="Quantity"
            placeholder="1"
            className="space-y-2"
          />
        </div>

        <FormFieldTextArea
          record={props.record}
          field="configuration_notes"
          label="Configuration notes"
          placeholder="Enter any relevant configuration details, specifications, or notes about the asset"
          rows={4}
          className="space-y-2"
        />

        <div className="grid gap-4 md:grid-cols-2">
          <FormFieldSelect
            record={props.record}
            field="install_status"
            label="Installation status"
            options={constants.asset.install_status}
          />
          <FormFieldSelect
            record={props.record}
            field="operational_status"
            label="Operational status"
            options={constants.asset.operational_status}
          />
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" onClick={handleCancel} className="flex-1">
          Cancel
        </Button>
        <Button onClick={saveAction} className="flex-1">
          Save Asset
        </Button>
      </CardFooter>
    </Card>
  );
});
