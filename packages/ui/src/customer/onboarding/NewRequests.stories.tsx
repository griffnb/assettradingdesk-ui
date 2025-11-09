import { Store } from "@/models/store/Store";
import type { Meta, StoryObj } from "@storybook/react";
import { NewRequests } from "./NewRequests";

const meta: Meta<typeof NewRequests> = {
  title: "Customer/Components/Onboarding/NewRequests",
  component: NewRequests,
  argTypes: {
    onSuccess: {
      action: "success",
      description: "Called when request is successfully created",
    },
    onCancel: {
      action: "cancel",
      description: "Called when user cancels request creation",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const request = Store.request.create({
      description: "",
      configuration_notes: "",
      min_price: 0,
      max_price: 0,
      time_frame: 90,
    });

    return <NewRequests record={request} />;
  },
};

export const WithInitialData: Story = {
  render: () => {
    const request = Store.request.create({
      description: "High-precision CNC machining center",
      configuration_notes:
        "Must include automatic tool changer, coolant system, and chip conveyor. Prefer models with 5-axis capability.",
      min_price: 50000,
      max_price: 150000,
      time_frame: 60,
    });

    return <NewRequests record={request} />;
  },
};

export const BudgetRequest: Story = {
  render: () => {
    const request = Store.request.create({
      description: "Industrial 3D printer for prototyping",
      configuration_notes:
        "Looking for a reliable FDM printer with build volume of at least 300x300x400mm",
      min_price: 5000,
      max_price: 15000,
      time_frame: 30,
    });

    return <NewRequests record={request} />;
  },
};

export const HighValueRequest: Story = {
  render: () => {
    const request = Store.request.create({
      description: "Advanced semiconductor testing equipment",
      configuration_notes:
        "Require latest generation automated test equipment with high throughput capability, thermal control, and comprehensive software suite for IC validation.",
      min_price: 500000,
      max_price: 2000000,
      time_frame: 120,
    });

    return <NewRequests record={request} />;
  },
};
