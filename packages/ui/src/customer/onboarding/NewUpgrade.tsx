"use client";

import { Badge } from "@/ui/shadcn/ui/badge";
import { Button } from "@/ui/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/shadcn/ui/card";
import { CheckCircle } from "lucide-react";

interface NewUpgradeProps {
  onSelectFree?: () => void;
  onSelectSeller?: () => void;
}

export function NewUpgrade(props: NewUpgradeProps) {
  const freeTierFeatures = [
    "View all available assets",
    "Request quotes from sellers",
    "Message sellers directly",
    "Save favorite listings",
  ];

  const sellerTierFeatures = [
    "List and sell your equipment",
    "Manage your inventory",
    "Respond to buyer requests",
    "Access to seller analytics",
    "All Free Tier features included",
  ];

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Choose Your Plan</CardTitle>
        <CardDescription>
          Upgrade to start listing and selling your equipment.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Free Tier */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-xl">Free Tier</CardTitle>
              <CardDescription className="text-base font-semibold">
                $0/month
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Perfect for buyers looking to find and request assets.
              </p>
              <ul className="space-y-2">
                {freeTierFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-600" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full"
                onClick={props.onSelectFree}
              >
                Continue with Free
              </Button>
            </CardFooter>
          </Card>

          {/* Seller Tier */}
          <Card className="border-2 border-primary relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <Badge className="bg-primary text-primary-foreground">
                Recommended
              </Badge>
            </div>
            <CardHeader>
              <CardTitle className="text-xl">Seller Tier</CardTitle>
              <CardDescription className="text-base font-semibold">
                Contact for pricing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Ideal for sellers who want to list and sell their equipment.
              </p>
              <ul className="space-y-2">
                {sellerTierFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-600" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={props.onSelectSeller}>
                Upgrade to Seller
              </Button>
            </CardFooter>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
