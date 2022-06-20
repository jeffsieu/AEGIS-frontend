import { ComponentStory } from '@storybook/react';
import ScheduleHeader from './ScheduleHeader';

export default {
  title: 'Schedule/Schedule Header',
  component: ScheduleHeader,
  argTypes: {
    startDate: {
      control: 'date',
      type: {
        required: true,
      },
    },
    endDate: {
      control: 'date',
      type: {
        required: true,
      },
    },
    progress: {
      control: 'number',
      type: {
        required: true,
      },
    },
    isPublished: {
      control: 'boolean',
      type: {
        required: true,
      },
    },
  },
};

const Template: ComponentStory<typeof ScheduleHeader> = ({
  startDate,
  endDate,
  ...restArgs
}) => (
  <ScheduleHeader
    startDate={new Date(startDate)}
    endDate={new Date(endDate)}
    {...restArgs}
  />
);

export const Default = Template.bind({});
Default.args = {
  startDate: new Date(2020, 3, 1),
  endDate: new Date(2020, 3, 14),
  progress: 40,
  isPublished: false,
};
