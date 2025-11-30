"use client";

import { OrganizationModel } from "@/models/models/organization/model/OrganizationModel";
import { Button } from "@/ui/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/shadcn/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/shadcn/ui/table";
import { observer } from "mobx-react-lite";

interface OrganizationAccountsProps {
  record: OrganizationModel;
}

export const OrganizationAccounts = observer(function OrganizationAccounts({
  record,
}: OrganizationAccountsProps) {
  const handleInvite = () => {
    console.log("Invite user clicked");
  };

  const handleRemove = (userId: string) => {
    console.log("Remove user clicked", userId);
  };

  // Stubbed data for now
  const accounts = [
    { id: "1", name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", role: "Member" },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Accounts</CardTitle>
          <CardDescription>
            Manage users who have access to this organization.
          </CardDescription>
        </div>
        <Button onClick={handleInvite}>Invite User</Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts.map((account) => (
              <TableRow key={account.id}>
                <TableCell className="font-medium">{account.name}</TableCell>
                <TableCell>{account.email}</TableCell>
                <TableCell>{account.role}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleRemove(account.id)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
});
