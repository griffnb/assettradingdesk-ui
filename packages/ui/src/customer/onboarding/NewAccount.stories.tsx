import { Store } from "@/models/store/Store";
import type { Meta, StoryObj } from "@storybook/react";
import { NewAccount } from "./NewAccount";

const meta: Meta<typeof NewAccount> = {
  title: "Customer/Components/Onboarding/NewAccount",
  component: NewAccount,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const account = Store.account.create({
      first_name: "",
      middle_name: "",
      last_name: "",
      email: null,
    });

    return (
      <NewAccount
        record={account}
        onSuccess={(record) => {
          console.log("Account created:", record);
        }}
        onCancel={() => {
          console.log("Account creation cancelled");
        }}
      />
    );
  },
};

export const WithPrefilledData: Story = {
  render: () => {
    const account = Store.account.create({
      first_name: "John",
      middle_name: "Michael",
      last_name: "Doe",
      email: "john.doe@example.com",
    });

    return (
      <NewAccount
        record={account}
        onSuccess={(record) => {
          console.log("Account created:", record);
        }}
        onCancel={() => {
          console.log("Account creation cancelled");
        }}
      />
    );
  },
};

export const WithoutMiddleName: Story = {
  render: () => {
    const account = Store.account.create({
      first_name: "Jane",
      middle_name: "",
      last_name: "Smith",
      email: "jane.smith@example.com",
    });

    return (
      <NewAccount
        record={account}
        onSuccess={(record) => {
          console.log("Account created:", record);
        }}
        onCancel={() => {
          console.log("Account creation cancelled");
        }}
      />
    );
  },
};
