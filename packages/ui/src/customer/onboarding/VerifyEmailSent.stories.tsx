import type { Meta, StoryObj } from "@storybook/react";
import { VerifyEmailSent } from "./VerifyEmailSent";

const meta: Meta<typeof VerifyEmailSent> = {
  title: "Customer/Components/Onboarding/VerifyEmailSent",
  component: VerifyEmailSent,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
