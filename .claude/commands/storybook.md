Generate a storybook file for the attached component. If any of the args expect a model do Store.{snake_case_model i.e. account or organization not account_model}.create({data_fields_here})

If the component looks like it needs to update based on state like a form component or something that should change, be sure to wrap it in a render with the state

Follow this pattern for the story:
```tsx
import { Store } from "@/models/store/Store";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { XXX } from "./XXX";

const meta: Meta<typeof XXX> = {
title: "{Customer or Common or Admin}/{Pretty file path}/XXX",
component: XXX,
argTypes: {
// Types Here
},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
args: {
// args
},
};
```

// Variations of the component that make sense

- Be sure to not add your own variants into the component itself, the goal is to ONLY create the storybook file.
- Do not create any mock services
- You do not need to wrap with state handling unless asked.
- You do not need variations that are not explicitly understood from the types of properties, i.e. className is not explicit
- You do not need to use the modal service to display.
- You do not need to handle loading states unless asked

## MOCKING

If the component makes server calls through store or through services, be sure to add mocks to the ServerService like this to intercept them

 ```js
   * Add a mock for testing purposes
   * @param config Mock configuration
   * @example
   * // Simple mock without params
   * ServerService.addMock<ExpectedResponseType>({
   *   method: 'POST',
   *   path: '/api/users/save',
   *   response: { success: true, data: { id: '123' } }
   * });
   *
   * // Mock with exact param matching
   * ServerService.addMock<ExpectedResponseType>({
   *   method: 'GET',
   *   path: '/api/users/list',
   *   params: { status: 'active' },
   *   response: { success: true, data: [...] }
   * });
   *
   * // Mock with custom matcher function
   * ServerService.addMock<ExpectedResponseType>({
   *   method: 'GET',
   *   path: '/api/users',
   *   matcher: (params) => params.limit === '10',
   *   response: { success: true, data: [...] }
   * });
   *
   * // One-time mock
   * ServerService.addMock<ExpectedResponseType>({
   *   method: 'POST',
   *   path: '/api/users/save',
   *   response: { success: true, data: { id: '123' } },
   *   once: true
   * });
   */
```