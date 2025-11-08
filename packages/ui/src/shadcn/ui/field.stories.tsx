import type { Meta, StoryObj } from "@storybook/react";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "./field";
import { Input } from "./input";

const meta: Meta = {
  title: "Common/Components/UI/Field",
  component: Field,
  argTypes: {
    orientation: {
      control: "select",
      options: ["vertical", "horizontal", "responsive"],
      description: "Layout orientation of the field",
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => (
    <Field {...args}>
      <FieldLabel>Email Address</FieldLabel>
      <FieldContent>
        <Input placeholder="Enter your email" />
      </FieldContent>
    </Field>
  ),
};

export const WithDescription: Story = {
  render: (args) => (
    <Field {...args}>
      <FieldLabel>Password</FieldLabel>
      <FieldContent>
        <Input type="password" placeholder="Enter your password" />
        <FieldDescription>
          Must be at least 8 characters long and include a special character
        </FieldDescription>
      </FieldContent>
    </Field>
  ),
};

export const WithError: Story = {
  render: (args) => (
    <Field {...args} data-invalid="true">
      <FieldLabel>Username</FieldLabel>
      <FieldContent>
        <Input placeholder="Choose a username" />
        <FieldError
          errors={[
            { message: "Username must be at least 3 characters" },
            { message: "Username cannot contain special characters" }
          ]}
        />
      </FieldContent>
    </Field>
  ),
};

export const Horizontal: Story = {
  render: (args) => (
    <Field orientation="horizontal" {...args}>
      <FieldLabel>Notifications</FieldLabel>
      <FieldContent>
        <Input type="checkbox" />
        <FieldDescription>
          Receive email notifications about account updates
        </FieldDescription>
      </FieldContent>
    </Field>
  ),
};

export const Responsive: Story = {
  render: (args) => (
    <Field orientation="responsive" {...args}>
      <FieldLabel>Contact Preference</FieldLabel>
      <FieldContent>
        <Input type="radio" /> Email
        <Input type="radio" /> Phone
      </FieldContent>
    </Field>
  ),
};

export const FieldGroupExample: Story = {
  render: () => (
    <FieldGroup>
      <Field>
        <FieldLabel>First Name</FieldLabel>
        <FieldContent>
          <Input placeholder="Enter first name" />
        </FieldContent>
      </Field>
      <Field>
        <FieldLabel>Last Name</FieldLabel>
        <FieldContent>
          <Input placeholder="Enter last name" />
        </FieldContent>
      </Field>
      <FieldSeparator>Optional</FieldSeparator>
      <Field>
        <FieldLabel>Middle Name</FieldLabel>
        <FieldContent>
          <Input placeholder="Enter middle name" />
          <FieldDescription>
            Optional field for additional identification
          </FieldDescription>
        </FieldContent>
      </Field>
    </FieldGroup>
  ),
};

export const ComplexFieldSet: Story = {
  render: () => (
    <FieldSet>
      <FieldLegend>Personal Information</FieldLegend>
      <FieldGroup>
        <Field>
          <FieldLabel>Full Name</FieldLabel>
          <FieldContent>
            <Input placeholder="Enter your full name" />
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel>Email</FieldLabel>
          <FieldContent>
            <Input type="email" placeholder="Enter your email" />
            <FieldError errors={[{ message: "Invalid email format" }]} />
          </FieldContent>
        </Field>
      </FieldGroup>
      <FieldSeparator>Contact Details</FieldSeparator>
      <FieldGroup>
        <Field orientation="horizontal">
          <FieldLabel>Phone</FieldLabel>
          <FieldContent>
            <Input type="tel" placeholder="Enter phone number" />
          </FieldContent>
        </Field>
      </FieldGroup>
    </FieldSet>
  ),
};