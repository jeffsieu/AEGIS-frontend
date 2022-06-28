import { ComponentStory } from '@storybook/react';
import ScheduleRowHeader from './ScheduleRowHeader';

export default {
  title: 'Schedule/Schedule Row Header',
  component: ScheduleRowHeader,
  argTypes: {
    roleName: {
      control: 'text',
      type: {
        required: true,
      },
    },
  },
};

const Template: ComponentStory<typeof ScheduleRowHeader> = (args) => (
  <ScheduleRowHeader {...args} />
);

export const Default = Template.bind({});
Default.args = {
  roleInstance: {
    description: '',
    name: 'A1',
  },
};
