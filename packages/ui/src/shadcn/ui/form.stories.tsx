import { zodResolver } from "@hookform/resolvers/zod";
import type { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "./button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";

const meta: Meta<typeof Form> = {
  title: "Common/Components/UI/Form",
  component: Form,
  argTypes: {
    // Form-specific controls can be added here if needed
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Form validation schema
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.email({
    message: "Please enter a valid email address.",
  }),
});

export const Default: Story = {
  render: () => {
    // Form hook
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema as any),
      defaultValues: {
        username: "",
        email: "",
      },
    });

    // Form submission handler
    function onSubmit(values: z.infer<typeof formSchema>) {
      // Form submission logic
      console.log(values);
    }

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-md space-y-8"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your username" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormDescription>
                  We will never share your email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    );
  },
};

export const WithValidationErrors: Story = {
  render: () => {
    // Form hook with pre-filled invalid data
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema as any),
      defaultValues: {
        username: "a", // Too short to pass validation
        email: "invalidemail", // Invalid email format
      },
    });

    // Form submission handler
    function onSubmit(values: z.infer<typeof formSchema>) {
      console.log(values);
    }

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-md space-y-8"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your username" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormDescription>
                  We will never share your email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    // Form hook
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema as any),
      defaultValues: {
        username: "johndoe",
        email: "john@example.com",
      },
    });

    return (
      <Form {...form}>
        <form className="max-w-md space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your username"
                    {...field}
                    disabled
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} disabled />
                </FormControl>
                <FormDescription>
                  We will never share your email.
                </FormDescription>
              </FormItem>
            )}
          />

          <Button type="submit" disabled>
            Submit
          </Button>
        </form>
      </Form>
    );
  },
};
