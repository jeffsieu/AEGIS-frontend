import { ComponentStory } from '@storybook/react';
import ScheduleColumnHeader from './ScheduleColumnHeader';

export default {
  title: 'Schedule/Schedule Column Header',
  component: ScheduleColumnHeader,
  argTypes: {
    date: {
      control: 'date',
      type: {
        required: true,
      },
    },
  },
};

const Template: ComponentStory<typeof ScheduleColumnHeader> = ({
  date,
  ...restArgs
}) => <ScheduleColumnHeader date={new Date(date)} {...restArgs} />;

export const Default = Template.bind({});
Default.args = {
  date: new Date('2020-01-01'),
};
