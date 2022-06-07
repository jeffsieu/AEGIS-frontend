import { ComponentStory } from "@storybook/react";
import RequestForm from "./RequestForm";
import { Decorators } from "@utils/storybook/decorators";

export default {
  title: "Requests/Request Form",
  component: RequestForm,
  decorators: [Decorators.dateLocalizationProvider],
};

const Template: ComponentStory<typeof RequestForm> = (args) => (
  <RequestForm {...args} />
);

export const Default = Template.bind({});
Default.args = {};
