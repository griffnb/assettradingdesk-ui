"use client";

import { OrganizationModel } from "@/models/models/organization/model/OrganizationModel";
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

interface OrganizationBillingProps {
  record: OrganizationModel;
}

export const OrganizationBilling = observer(function OrganizationBilling({
  record,
}: OrganizationBillingProps) {
  const handleUpgrade = () => {
    console.log("Upgrade plan clicked");
  };

  const handleDowngrade = () => {
    console.log("Downgrade plan clicked");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing & Subscription</CardTitle>
        <CardDescription>
          Manage your subscription plan and billing details.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Current Plan</p>
              <p className="text-sm text-muted-foreground">
                {record.plan_id ? "Pro Plan" : "Free Plan"}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleDowngrade}>
                Downgrade
              </Button>
              <Button onClick={handleUpgrade}>Upgrade</Button>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        For enterprise inquiries, please contact support.
      </CardFooter>
    </Card>
  );
});
