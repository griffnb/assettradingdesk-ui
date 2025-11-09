import { Store } from "@/models/store/Store";
import type { Meta, StoryObj } from "@storybook/react";
import { NewOrganization } from "./NewOrganization";

const meta: Meta<typeof NewOrganization> = {
  title: "Customer/Components/Onboarding/NewOrganization",
  component: NewOrganization,
  argTypes: {
    onSuccess: {
      action: "success",
      description: "Callback when organization is created successfully",
    },
    onCancel: {
      action: "cancel",
      description: "Callback when user cancels",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const organization = Store.organization.create({
      name: "",
      external_id: "",
    });

    return (
      <NewOrganization
        record={organization}
        onSuccess={(record) => console.log("Created:", record)}
        onCancel={() => console.log("Cancelled")}
      />
    );
  },
};

export const WithPrefilledData: Story = {
  render: () => {
    const organization = Store.organization.create({
      name: "Acme Corporation",
      external_id: "ACME-001",
    });

    return (
      <NewOrganization
        record={organization}
        onSuccess={(record) => console.log("Created:", record)}
        onCancel={() => console.log("Cancelled")}
      />
    );
  },
};
