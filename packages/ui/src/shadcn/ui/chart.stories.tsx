import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import * as Recharts from "recharts";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "./chart";

const meta: Meta<typeof ChartContainer> = {
  title: "Common/Components/Charts/ChartContainer",
  component: ChartContainer,
  argTypes: {
    id: {
      control: "text",
      description: "Unique identifier for the chart",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data for demonstration
const simpleData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 200 },
  { name: "Apr", value: 278 },
  { name: "May", value: 189 },
];

const multiSeriesData = [
  { month: "Jan", Sales: 4000, Expenses: 2400, Profit: 1600 },
  { month: "Feb", Sales: 3000, Expenses: 1398, Profit: 1602 },
  { month: "Mar", Sales: 2000, Expenses: 9800, Profit: -7800 },
  { month: "Apr", Sales: 2780, Expenses: 3908, Profit: -1128 },
  { month: "May", Sales: 1890, Expenses: 4800, Profit: -2910 },
];

const chartConfig = {
  value: {
    label: "Value",
    color: "#3B82F6",
  },
  Sales: {
    label: "Sales",
    color: "#10B981",
  },
  Expenses: {
    label: "Expenses",
    color: "#EF4444",
  },
  Profit: {
    label: "Profit",
    color: "#6366F1",
  },
} as const;

export const SimpleBarChart: Story = {
  render: () => (
    <ChartContainer config={chartConfig}>
      <Recharts.BarChart data={simpleData}>
        <Recharts.Bar dataKey="value" fill="var(--color-value)" />
        <Recharts.XAxis dataKey="name" />
        <Recharts.YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
      </Recharts.BarChart>
    </ChartContainer>
  ),
};

export const MultiSeriesLineChart: Story = {
  render: () => (
    <ChartContainer config={chartConfig}>
      <Recharts.LineChart data={multiSeriesData}>
        <Recharts.Line
          type="monotone"
          dataKey="Sales"
          stroke="var(--color-Sales)"
          strokeWidth={2}
        />
        <Recharts.Line
          type="monotone"
          dataKey="Expenses"
          stroke="var(--color-Expenses)"
          strokeWidth={2}
        />
        <Recharts.Line
          type="monotone"
          dataKey="Profit"
          stroke="var(--color-Profit)"
          strokeWidth={2}
        />
        <Recharts.XAxis dataKey="month" />
        <Recharts.YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
      </Recharts.LineChart>
    </ChartContainer>
  ),
};

export const CustomTooltipChart: Story = {
  render: () => (
    <ChartContainer config={chartConfig}>
      <Recharts.BarChart data={simpleData}>
        <Recharts.Bar dataKey="value" fill="var(--color-value)" />
        <Recharts.XAxis dataKey="name" />
        <Recharts.YAxis />
        <ChartTooltip
          content={
            <ChartTooltipContent
              hideIndicator={false}
              indicator="line"
              labelClassName="text-primary"
              labelFormatter={(value) => `Period: ${value}`}
            />
          }
        />
      </Recharts.BarChart>
    </ChartContainer>
  ),
};

export const ChartWithoutLegend: Story = {
  render: () => (
    <ChartContainer config={chartConfig}>
      <Recharts.LineChart data={multiSeriesData}>
        <Recharts.Line
          type="monotone"
          dataKey="Sales"
          stroke="var(--color-Sales)"
          strokeWidth={2}
        />
        <Recharts.XAxis dataKey="month" />
        <Recharts.YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
      </Recharts.LineChart>
    </ChartContainer>
  ),
};