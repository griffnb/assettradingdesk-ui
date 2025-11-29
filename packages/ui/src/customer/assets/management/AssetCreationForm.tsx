"use client";

import { constants } from "@/models/constants";
import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { ModelModel } from "@/models/models/model/model/ModelModel";
import { FormFieldModelSearchSelect } from "@/ui/common/components/form/fields/FormFieldModelSearchSelect";
import { FormFieldSelect } from "@/ui/common/components/form/fields/FormFieldSelect";
import { FormFieldText } from "@/ui/common/components/form/fields/FormFieldText";
import { FormFieldTextArea } from "@/ui/common/components/form/fields/FormFieldTextArea";
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
import { AssetImageUploader } from "./AssetImageUploader";

interface AssetCreationFormProps {
  record: AssetModel;
  onSuccess?: (record: AssetModel) => void;
  onCancel?: () => void;
}

export const AssetCreationForm = observer(function AssetCreationForm(
  props: AssetCreationFormProps,
) {
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
    <Card className="shadow-lg rounded-none flex flex-1 overflow-auto bg-gradient-to-br from-gray-50 to-white">
      <CardHeader>
        <CardTitle className="text-2xl">List an asset</CardTitle>
        <CardDescription>
          Provide technical details to help brokers match your equipment with
          qualified buyers.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <FormFieldModelSearchSelect<AssetModel,ModelModel>
              record={props.record}
              field="model_id"
              modelName="model"
              modelDisplayField="label"
              modelSearchParam={"q"}
              modelSearchFilters={{"disabled":"0"}}
              label="Model"
              placeholder="Search model…"
            />
            
            <FormFieldText
              record={props.record}
              field="year"
              type="number"
              label="Model Year"
              placeholder="2020"
            />
            <FormFieldText
              record={props.record}
              field="location"
              type="text"
              label="Site location"
              placeholder="City, Country"
              
            />
            <FormFieldText
              record={props.record}
              field="serial_number"
              type="text"
              label="Serial Number"
              placeholder="Serial Number"
              
            />
            
          </div>
          
          <FormFieldTextArea
            record={props.record}
            field="description"
            label="Description"
            placeholder="Condition / usage notes / maintenance history / etc."
            rows={5}
            className="space-y-2"
          />
          <FormFieldTextArea
            record={props.record}
            field="configuration_notes"
            label="Configuration notes"
            placeholder="Chambers / voltage / accessories / gases /  etc..."
            rows={5}
            className="space-y-2"
          />

          <div className="grid gap-4 md:grid-cols-2">
            
            
            <FormFieldSelect
              record={props.record}
              field="install_status"
              label="Install Status"
              options={constants.asset.install_status}
            />
            <FormFieldSelect
              record={props.record}
              field="operational_status"
              label="Operational Status"
              options={constants.asset.operational_status}
            />
            <AssetImageUploader asset={props.record} />
          </div>
        </div>

        <div className="space-y-6">
          <Card className="border-dashed bg-muted/30">
            <CardHeader>
              <CardTitle>Media upload</CardTitle>
              <CardDescription>
                Upload photos, BOM PDFs, service logs after creating the asset.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-muted-foreground/30 bg-background/80 p-6 text-center text-sm text-muted-foreground">
                <p>Available after asset creation</p>
                <p className="mt-2 text-xs">Max 5GB · auto-blur serials</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Asset details</CardTitle>
              <CardDescription>
                Additional specifications and status.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormFieldText
                record={props.record}
                prepend="$"
                field="price"
                type="number"
                label="Asking price (USD)"
                placeholder="0"
              />
              <FormFieldText
                record={props.record}
                field="quantity"
                type="number"
                label="Quantity"
                placeholder="1"
              />
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button onClick={saveAction} className="flex-1">
                Create Asset
              </Button>
            </CardFooter>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
});
