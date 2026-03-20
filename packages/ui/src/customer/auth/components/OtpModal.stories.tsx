import { AuthStore } from "@/common_lib/authentication/auth_store/AuthStore";
import { ServerService } from "@/common_lib/services/ServerService";
import { AuthenticationType } from "@/models/models/authentication_method/_constants/type";
import type { Meta, StoryObj } from "@storybook/react-vite";
import dayjs from "dayjs";
import { OtpModal } from "./OtpModal";

const meta: Meta<typeof OtpModal> = {
  title: "Customer/Components/Auth/OtpModal",
  component: OtpModal,
  argTypes: {
    title: {
      control: "text",
      description: "Modal title text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

function defaultMocks() {
  // Mock any necessary auth endpoints if needed
}

export const EmailOTP: Story = {
  args: {
    authStore: new AuthStore({
      identifier: "user@example.com",
      selectedMethod: AuthenticationType.EMAIL_OTP,
      otp: "",
      expiresAt: dayjs().add(5, "minutes").unix(),
      challengeId: "challenge-123",
    }),
    title: "Verify your email",
    resendCode: () => {},
    onCodeEntered: () => {},
  },
  beforeEach: () => {
    ServerService.clearMocks();
    defaultMocks();
  },
};

export const PhoneOTP: Story = {
  args: {
    authStore: new AuthStore({
      identifier: "5551234567",
      selectedMethod: AuthenticationType.SMS_OTP,
      otp: "",
      expiresAt: dayjs().add(5, "minutes").unix(),
      challengeId: "challenge-456",
    }),

    title: "Verify Phone Number",
    resendCode: () => {},
    onCodeEntered: () => {},
  },
  beforeEach: () => {
    ServerService.clearMocks();
    defaultMocks();
  },
};
