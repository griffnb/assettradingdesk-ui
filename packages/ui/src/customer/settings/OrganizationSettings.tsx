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
import { observer } from "mobx-react-lite";
import { useState } from "react";

interface OrganizationSettingsProps {
  record: OrganizationModel;
}

export const OrganizationSettings = observer(function OrganizationSettings({
  record,
}: OrganizationSettingsProps) {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await record.save();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Organization Settings</CardTitle>
        <CardDescription>
          Manage your organization&apos;s profile and settings.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormFieldText
          record={record}
          field="name"
          type="text"
          label="Organization Name"
          placeholder="Enter organization name"
        />
        <FormFieldText
          record={record}
          field="billing_email"
          type="email"
          label="Billing Email"
          placeholder="Enter billing email"
        />
        {/* TODO: Add a better component for array of strings */}
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Whitelisted Domains
          </label>
          <div className="text-sm text-muted-foreground">
            Comma separated list of domains (e.g. example.com, test.com)
          </div>
          <textarea
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={record.email_domains.join(", ")}
            onChange={(e) => {
              record.email_domains = e.target.value
                .split(",")
                .map((s) => s.trim())
                .filter((s) => s.length > 0);
            }}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </CardFooter>
    </Card>
  );
});
