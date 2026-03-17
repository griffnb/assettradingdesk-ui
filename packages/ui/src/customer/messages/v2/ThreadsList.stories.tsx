import { Store } from "@/models/store/Store";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { ThreadsList } from "./ThreadsList";

const meta: Meta<typeof ThreadsList> = {
  title: "Customer/Components/Messages/V2/ThreadsList",
  component: ThreadsList,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    threadId: {
      description: "ID of the active thread",
    },
    setActiveThread: {
      description: "Callback function to set the active thread",
    },
    reloadedAt: {
      description: "Date timestamp to trigger reload",
    },
    account: {
      description: "AccountModel instance for the buyer",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Create mock account
const mockAccount = Store.account.create({
  id: "buyer-123",
  email: "buyer@example.com",
  first_name: "John",
  last_name: "Buyer",
});

export const Default: Story = {
  render: () => {
    const [activeOpportunityId, setActiveOpportunityId] = useState<
      string | null
    >(null);
    const [reloadedAt] = useState(new Date());

    return (
      <div className="h-[600px] w-[440px]">
        <ThreadsList
          threadId={activeOpportunityId}
          setActiveThread={setActiveOpportunityId}
          reloadedAt={reloadedAt}
          account={mockAccount}
        />
      </div>
    );
  },
};
