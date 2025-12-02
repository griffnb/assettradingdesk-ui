import { DownloadService } from "@/common_lib/services/DownloadService";
import type { Meta, StoryObj } from "@storybook/react-vite";
import DownloadNotification from "./DownloadNotification";

const meta = {
  title: "Common/DownloadNotification",
  component: DownloadNotification,
  argTypes: {
    show: { control: "boolean" },
    isProcessing: { control: "boolean" },
  },
} satisfies Meta<typeof DownloadNotification>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Processing: Story = {
  args: {
    show: true,
    isProcessing: true,
  },
  render: (args) => {
    DownloadService.showNotification = true;
    DownloadService.downloadReady = false;
    return <DownloadNotification {...args} />;
  },
};

export const Completed: Story = {
  args: {
    show: true,
    isProcessing: false,
  },
  render: (args) => {
    DownloadService.showNotification = true;
    DownloadService.downloadReady = true;
    return <DownloadNotification {...args} />;
  },
};
