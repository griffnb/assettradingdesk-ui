import { Store } from "@/models/store/Store";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SetupOrganization } from "./SetupOrganization";

const meta: Meta<typeof SetupOrganization> = {
  title: "Customer/Components/Onboarding/SetupOrganization",
  component: SetupOrganization,
  argTypes: {
    onSuccess: {
      action: "success",
      description: "Callback when organization is created successfully",
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
      <SetupOrganization
        record={organization}
        onSuccess={(record) => console.log("Created:", record)}
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
      <SetupOrganization
        record={organization}
        onSuccess={(record) => console.log("Created:", record)}
      />
    );
  },
};
