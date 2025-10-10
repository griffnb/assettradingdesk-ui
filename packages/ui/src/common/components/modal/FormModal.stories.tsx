import type { Meta, StoryObj } from "@storybook/react";
import { FormModal } from "./FormModal";

const meta = {
  title: "Common/Modal/FormModal",
  component: FormModal,
  argTypes: {
    title: { control: "text" },
    titleIcon: { control: "text" },
    saveHandler: { action: "saved" },
    saveLabel: { control: "text" },
    saveIcon: { control: "text" },
    showSave: { control: "boolean" },
    cancelLabel: { control: "text" },
    showCancel: { control: "boolean" },
    children: { control: "text" },
  },
} satisfies Meta<typeof FormModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "default-modal",
    title: "Default Modal",
    showSave: true,
    showCancel: true,
    saveLabel: "Save",
    cancelLabel: "Cancel",
    children: "This is the content of the modal.",
  },
};

export const WithTitleIcon: Story = {
  args: {
    id: "title-icon-modal",
    title: "Modal with Title Icon",
    titleIcon: "fa fa-info-circle",
    showSave: true,
    showCancel: true,
    saveLabel: "Save",
    cancelLabel: "Cancel",
    children: "This is the content of the modal.",
  },
};
