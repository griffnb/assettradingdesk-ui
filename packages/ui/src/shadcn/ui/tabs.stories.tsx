import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";
import { UserIcon, SettingsIcon, CreditCardIcon } from "lucide-react";

const meta: Meta<typeof Tabs> = {
  title: "Common/Components/UI/Tabs",
  component: Tabs,
  subcomponents: {
    TabsList,
    TabsTrigger,
    TabsContent,
  },
  argTypes: {
    // No additional argTypes needed as the component uses spread props
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="team">Team</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        Manage your account settings.
      </TabsContent>
      <TabsContent value="password">
        Change your password here.
      </TabsContent>
      <TabsContent value="team">
        Manage your team members.
      </TabsContent>
    </Tabs>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Tabs defaultValue="user">
      <TabsList>
        <TabsTrigger value="user">
          <UserIcon className="size-4" />
          User
        </TabsTrigger>
        <TabsTrigger value="settings">
          <SettingsIcon className="size-4" />
          Settings
        </TabsTrigger>
        <TabsTrigger value="billing">
          <CreditCardIcon className="size-4" />
          Billing
        </TabsTrigger>
      </TabsList>
      <TabsContent value="user">
        User profile and information.
      </TabsContent>
      <TabsContent value="settings">
        Application settings and preferences.
      </TabsContent>
      <TabsContent value="billing">
        Billing and subscription details.
      </TabsContent>
    </Tabs>
  ),
};

export const DisabledTab: Story = {
  render: () => (
    <Tabs defaultValue="active">
      <TabsList>
        <TabsTrigger value="active">Active Tab</TabsTrigger>
        <TabsTrigger value="disabled" disabled>Disabled Tab</TabsTrigger>
        <TabsTrigger value="another">Another Tab</TabsTrigger>
      </TabsList>
      <TabsContent value="active">
        This is the active tab content.
      </TabsContent>
      <TabsContent value="disabled">
        This content should not be visible.
      </TabsContent>
      <TabsContent value="another">
        Another tab's content.
      </TabsContent>
    </Tabs>
  ),
};