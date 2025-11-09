import type { Meta, StoryObj } from "@storybook/react";
import { SignupForm } from "./SignupForm";

const meta: Meta<typeof SignupForm> = {
  title: "Customer/Components/Onboarding/SignupForm",
  component: SignupForm,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return <SignupForm />;
  },
};
