"use client";

import { OrganizationModel } from "@/models/models/organization/model/OrganizationModel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/shadcn/ui/tabs";
import { observer } from "mobx-react-lite";
import { OrganizationAccounts } from "./OrganizationAccounts";
import { OrganizationBilling } from "./OrganizationBilling";
import { OrganizationSettings } from "./OrganizationSettings";

interface OrganizationManagementProps {
  record: OrganizationModel;
}

export const OrganizationManagement = observer(function OrganizationManagement({
  record,
}: OrganizationManagementProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Organization Management</h3>
        <p className="text-sm text-muted-foreground">
          Manage your organization settings, team members, and billing.
        </p>
      </div>
      <Tabs defaultValue="settings" className="space-y-4">
        <TabsList>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="accounts">Accounts</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>
        <TabsContent value="settings" className="space-y-4">
          <OrganizationSettings record={record} />
        </TabsContent>
        <TabsContent value="accounts" className="space-y-4">
          <OrganizationAccounts record={record} />
        </TabsContent>
        <TabsContent value="billing" className="space-y-4">
          <OrganizationBilling record={record} />
        </TabsContent>
      </Tabs>
    </div>
  );
});
