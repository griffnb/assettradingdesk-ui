import { Store } from "@/models/store/Store";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { RequestThreadsList } from "./RequestThreadsList";

const meta: Meta<typeof RequestThreadsList> = {
  title: "Customer/Components/Messages/V2/RequestThreadsList",
  component: RequestThreadsList,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    activeOpportunityId: {
      description: "The currently active opportunity ID",
      control: "text",
    },
    setActiveOpportunity: {
      description: "Callback function to set the active opportunity",
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
        <RequestThreadsList
          activeOpportunityId={activeOpportunityId}
          setActiveOpportunity={setActiveOpportunityId}
          reloadedAt={reloadedAt}
          account={mockAccount}
        />
      </div>
    );
  },
};

export const Loading: Story = {
  render: () => {
    const [activeOpportunityId, setActiveOpportunityId] = useState<
      string | null
    >(null);
    const [reloadedAt] = useState(new Date());

    return (
      <div className="h-[600px] w-[440px]">
        <RequestThreadsList
          activeOpportunityId={activeOpportunityId}
          setActiveOpportunity={setActiveOpportunityId}
          reloadedAt={reloadedAt}
          account={mockAccount}
        />
      </div>
    );
  },
};

export const WithActiveThread: Story = {
  render: () => {
    const [activeOpportunityId, setActiveOpportunityId] = useState<
      string | null
    >("opp-1");
    const [reloadedAt] = useState(new Date());

    return (
      <div className="h-[600px] w-[440px]">
        <RequestThreadsList
          activeOpportunityId={activeOpportunityId}
          setActiveOpportunity={setActiveOpportunityId}
          reloadedAt={reloadedAt}
          account={mockAccount}
        />
      </div>
    );
  },
};

export const FullHeight: Story = {
  render: () => {
    const [activeOpportunityId, setActiveOpportunityId] = useState<
      string | null
    >(null);
    const [reloadedAt] = useState(new Date());

    return (
      <div className="h-screen w-[440px]">
        <RequestThreadsList
          activeOpportunityId={activeOpportunityId}
          setActiveOpportunity={setActiveOpportunityId}
          reloadedAt={reloadedAt}
          account={mockAccount}
        />
      </div>
    );
  },
};
