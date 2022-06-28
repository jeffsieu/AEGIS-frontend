import { ComponentStory } from '@storybook/react';
import ScheduleRowHeaders from './ScheduleRowHeaders';

export default {
  title: 'Schedule/Schedule Row Headers',
  component: ScheduleRowHeaders,
  argTypes: {
    roleNames: {
      control: 'array',
      type: {
        required: true,
      },
    },
  },
};

const Template: ComponentStory<typeof ScheduleRowHeaders> = (args) => (
  <ScheduleRowHeaders {...args} />
);

export const Default = Template.bind({});

Default.args = {
  roleInstances: ['A1', 'A2', 'A3', 'B1', 'B2', 'B3'].map((name) => ({
    name,
    description: '',
  })),
};
