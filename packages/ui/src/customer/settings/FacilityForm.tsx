"use client";

import { isObjectValid } from "@/common_lib/utils/validations";
import { FacilityModel } from "@/models/models/facility/model/FacilityModel";
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
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";

interface FacilityFormProps {
  record: FacilityModel;
  onSuccess?: (record: FacilityModel) => void;
  onCancel?: () => void;
}

export const FacilityForm = observer(function FacilityForm(
  props: FacilityFormProps,
) {
  const saveAction = async () => {
    runInAction(async () => {
      const messages = isObjectValid<FacilityModel>(props.record);
      if (messages.length > 0) {
        console.log(messages);
        return false;
      }
      const resp = await props.record.save();

      if (resp.success) {
        if (props.onSuccess) {
          props.onSuccess(props.record);
        }
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
    <Card className="flex flex-1 overflow-auto rounded-none bg-gradient-to-br from-gray-50 to-white shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">
          {props.record.id ? "Edit Facility" : "Create Facility"}
        </CardTitle>
        <CardDescription>
          Manage facility information for your organization.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <FormFieldText
                record={props.record}
                field="name"
                type="text"
                label="Facility Name"
                placeholder="Fab 10"
              />

              <FormFieldText
                record={props.record}
                field="country"
                type="text"
                label="Country"
                placeholder="United States"
              />

              <FormFieldText
                record={props.record}
                field="phone"
                type="text"
                label="Phone"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Address</h3>
              <div className="grid gap-4">
                <FormFieldText
                  record={props.record.address}
                  field="raw_address"
                  type="text"
                  label="Street Address"
                  placeholder="123 Main St"
                />

                <div className="grid gap-4 md:grid-cols-3">
                  <FormFieldText
                    record={props.record.address}
                    field="city"
                    type="text"
                    label="City"
                    placeholder="San Francisco"
                  />

                  <FormFieldText
                    record={props.record.address}
                    field="state"
                    type="text"
                    label="State"
                    placeholder="CA"
                  />

                  <FormFieldText
                    record={props.record.address}
                    field="zip"
                    type="text"
                    label="Zip Code"
                    placeholder="94105"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Details</CardTitle>
                <CardDescription>
                  Additional information about the facility.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormFieldTextArea
                  record={props.record}
                  field="description"
                  label="Description"
                  placeholder="Facility details and notes..."
                  rows={5}
                  className="space-y-2"
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
                  {props.record.id ? "Update Facility" : "Create Facility"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});
