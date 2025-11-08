"use client";

import { constants } from "@/models/constants";
import { AssetModel } from "@/models/models/asset/model/AssetModel";
import { FormFieldCheckbox } from "@/ui/common/components/form/fields/FormFieldCheckbox";
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
import { Separator } from "@/ui/shadcn/ui/separator";
import { isObjectValid } from "@/utils/validations";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";

interface AssetCreationFormProps {
  record: AssetModel;
  onSuccess?: (record: AssetModel) => void;
  onCancel?: () => void;
  onImageUpload?: (record: AssetModel) => void;
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
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>List an asset</CardTitle>
        <CardDescription>
          Provide technical details to help brokers match your equipment with
          qualified buyers.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <FormFieldText
              record={props.record}
              field="model_id"
              type="text"
              label="Model"
              placeholder="Search taxonomy…"
              className="space-y-2"
            />
            <FormFieldText
              record={props.record}
              field="manufacturer_name"
              type="text"
              label="Manufacturer"
              placeholder="Select OEM"
              className="space-y-2"
            />
            <FormFieldText
              record={props.record}
              field="year"
              type="number"
              label="Install year"
              placeholder="2020"
              className="space-y-2"
            />
            <FormFieldText
              record={props.record}
              field="location"
              type="text"
              label="Site location"
              placeholder="City, Country"
              className="space-y-2"
            />
            <FormFieldText
              record={props.record}
              field="price"
              type="number"
              label="Asking price (USD)"
              placeholder="0"
              className="space-y-2 font-mono"
            />
            <FormFieldText
              record={props.record}
              field="notes"
              type="text"
              label="Preferred payment structure"
              placeholder="e.g. 30 / 40 / 30 milestone"
              className="space-y-2"
            />
          </div>

          <FormFieldTextArea
            record={props.record}
            field="configuration_notes"
            label="Configuration notes"
            placeholder="List upgrades, beams, automation kits, retrofit work, service coverage, handoff requirements."
            rows={5}
            className="space-y-2"
          />

          <div className="grid gap-4 md:grid-cols-2">
            <FormFieldText
              record={props.record}
              field="description"
              type="text"
              label="Rigging & de-install window"
              placeholder="e.g. Q1 2026"
              className="space-y-2"
            />
            <FormFieldText
              record={props.record}
              field="serial_number"
              type="text"
              label="Power / facilities requirements"
              placeholder="Short summary"
              className="space-y-2"
            />
          </div>

          <div className="rounded-2xl border bg-muted/40 p-4">
            <p className="text-sm font-medium">Disclosures</p>
            <div className="mt-4 space-y-3 text-sm">
              <label className="flex items-center justify-between">
                <div>
                  <p>Active production tool</p>
                  <p className="text-muted-foreground">
                    Ship 10 weeks after deposit
                  </p>
                </div>
                <FormFieldCheckbox
                  record={props.record}
                  field="operational_status"
                  label=""
                  checkedValue={1}
                  uncheckedValue={0}
                  wrapVariant={null}
                />
              </label>
              <Separator />
              <label className="flex items-center justify-between">
                <div>
                  <p>OEM service transferable</p>
                  <p className="text-muted-foreground">
                    Signed consent on file
                  </p>
                </div>
                <FormFieldCheckbox
                  record={props.record}
                  field="install_status"
                  label=""
                  checkedValue={1}
                  uncheckedValue={0}
                  wrapVariant={null}
                />
              </label>
              <Separator />
              <label className="flex items-center justify-between">
                <div>
                  <p>Financing assistance needed</p>
                </div>
                <FormFieldCheckbox
                  record={props.record}
                  field="quantity"
                  label=""
                  checkedValue={1}
                  uncheckedValue={0}
                  wrapVariant={null}
                />
              </label>
            </div>
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
