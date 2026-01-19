import { Store } from "@/models/store/Store";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { NewMessagePanel } from "./NewMessagePanel";

const meta: Meta<typeof NewMessagePanel> = {
  title: "Customer/Components/Messages/V2/NewMessagePanel",
  component: NewMessagePanel,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    onSuccess: { action: "message sent successfully" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    account: Store.account.create({
      id: "test-account-123",
      email: "buyer@example.com",
      first_name: "John",
      last_name: "Buyer",
      organization_id: null,
    }),
    onSuccess: (opportunityId: string) => {
      console.log("Message sent successfully! Opportunity ID:", opportunityId);
    },
  },
};

export const WithCallback: Story = {
  args: {
    account: Store.account.create({
      id: "test-account-456",
      email: "buyer@example.com",
      first_name: "John",
      last_name: "Buyer",
      organization_id: null,
    }),
    onSuccess: (opportunityId: string) => {
      console.log("Navigating to opportunity:", opportunityId);
      alert(`Success! Created opportunity: ${opportunityId}`);
    },
  },
};

export const BuyerAccount: Story = {
  args: {
    account: Store.account.create({
      id: "buyer-789",
      email: "potential.buyer@company.com",
      first_name: "Jane",
      last_name: "Smith",
      organization_id: null,
    }),
    onSuccess: (opportunityId: string) => {
      console.log("New inquiry created:", opportunityId);
    },
  },
};
