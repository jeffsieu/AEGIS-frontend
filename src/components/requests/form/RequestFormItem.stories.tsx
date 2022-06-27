import { ComponentStory } from '@storybook/react';
import RequestFormItem from './RequestFormItem';
import { Decorators } from '@utils/storybook/decorators';

export default {
  title: 'Requests/Request Form Item',
  component: RequestFormItem,
  decorators: [Decorators.dateLocalizationProvider],
};

const Template: ComponentStory<typeof RequestFormItem> = (args) => (
  <RequestFormItem {...args} />
);

export const Default = Template.bind({});
Default.args = {
  index: 0,
  requestPeriod: {
    startDate: null,
    endDate: null,
    member: null,
    reason: '',
    type: null,
  },
};

export const Prompt = Template.bind({});
Prompt.args = {
  index: 0,
  requestPeriod: {
    startDate: null,
    endDate: null,
    member: null,
    reason: '',
    type: null,
  },
  isPromptItem: true,
};
