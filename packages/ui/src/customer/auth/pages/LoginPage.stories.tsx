import { ServerService } from "@/common_lib/services/ServerService";
import { addMock } from "@/models/mocks/helpers";
import { AuthenticationType } from "@/models/models/authentication_method/_constants/type";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { LoginPage } from "./LoginPage";

const meta: Meta<typeof LoginPage> = {
  title: "Customer/Components/auth/LoginPage",
  component: LoginPage,
  argTypes: {
    onLoginSuccess: {
      action: "login success",
      description: "Callback when login is successful",
    },
  },
  render: (args) => (
    <div className="h-dvh">
      <div className="group flex h-full overflow-x-hidden">
        <div className="relative flex h-full flex-1 flex-col overflow-auto bg-gray-100">
          <LoginPage {...args} />
        </div>
      </div>
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof meta>;

function defaultMocks() {
  // Mock authentication methods lookup
  addMock<{ methods: AuthenticationType[] }>(
    "/auth/methods",
    "POST",
    {
      methods: [
        AuthenticationType.PASSWORD,
        AuthenticationType.SMS_OTP,
        AuthenticationType.EMAIL_OTP,
        AuthenticationType.PASSKEY,
      ],
    },
    { email: "user@example.com" },
  );

  // Mock authentication initiation
  addMock<{ session_token?: string; required_2fa?: boolean }>(
    "/auth/initiate",
    "POST",
    {
      session_token: undefined,
      required_2fa: false,
    },
  );

  // Mock authentication verification
  addMock<{ session_token: string }>("/auth/verify", "POST", {
    session_token: "mock-session-token-123",
  });

  // Mock passkey authentication
  addMock<{ session_token: string }>("/auth/passkey", "POST", {
    session_token: "mock-passkey-session-token-456",
  });
}

export const WithoutOrg: Story = {
  args: {
    onLoginSuccess: () => console.log("Login successful!"),
  },
  beforeEach: () => {
    ServerService.clearMocks();
    defaultMocks();
    // Mock org without logo
  },
};

export const WithOrg: Story = {
  args: {
    onLoginSuccess: () => console.log("Login successful!"),
  },
  beforeEach: () => {
    ServerService.clearMocks();
    defaultMocks();
    // Mock org with logo

    addMock<{ methods: AuthenticationType[] }>("/auth/methods", "POST", {
      methods: [AuthenticationType.PASSWORD],
    });
  },
};

export const WithMFA: Story = {
  args: {
    onLoginSuccess: () => console.log("Login successful with MFA!"),
  },
  beforeEach: () => {
    ServerService.clearMocks();
    defaultMocks();

    // Override initiate mock to require 2FA
    addMock<{ session_token?: string; required_2fa?: boolean }>(
      "/auth/initiate",
      "POST",
      {
        session_token: undefined,
        required_2fa: true,
      },
    );
  },
};

export const PasswordOnly: Story = {
  args: {
    onLoginSuccess: () => console.log("Login successful!"),
  },
  beforeEach: () => {
    ServerService.clearMocks();
    defaultMocks();

    // Mock only password authentication
    addMock<{ methods: AuthenticationType[] }>(
      "/auth/methods",
      "POST",
      {
        methods: [AuthenticationType.PASSWORD],
      },
      { email: "user@example.com" },
    );
  },
};

export const MultipleAuthMethods: Story = {
  args: {
    onLoginSuccess: () => console.log("Login successful!"),
  },
  beforeEach: () => {
    ServerService.clearMocks();
    defaultMocks();

    // Mock multiple authentication methods
    addMock<{ methods: AuthenticationType[] }>(
      "/auth/methods",
      "POST",
      {
        methods: [
          AuthenticationType.PASSWORD,
          AuthenticationType.SMS_OTP,
          AuthenticationType.EMAIL_OTP,
          AuthenticationType.PASSKEY,
        ],
      },
      { email: "user@example.com" },
    );
  },
};

// Interactive story showing the full flow
export const InteractiveFlow: Story = {
  render: observer(() => {
    const [loginSuccess, setLoginSuccess] = useState(false);

    if (loginSuccess) {
      return (
        <div className="flex h-screen items-center justify-center">
          <div className="rounded-lg bg-green-100 p-8 text-center">
            <h2 className="text-2xl font-bold text-green-800">
              Login Successful!
            </h2>
            <button
              className="mt-4 rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
              onClick={() => setLoginSuccess(false)}
            >
              Reset
            </button>
          </div>
        </div>
      );
    }

    return (
      <LoginPage
        onLoginSuccess={() => {
          console.log("Login successful in interactive story!");
          setLoginSuccess(true);
        }}
      />
    );
  }),
  beforeEach: () => {
    ServerService.clearMocks();
    defaultMocks();
  },
};
