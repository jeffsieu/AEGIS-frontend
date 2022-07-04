import { ComponentStory } from '@storybook/react';
import ScheduleCallsignFilter from './ScheduleCallsignFilter';

export default {
  title: 'Schedule/Schedule Callsign Filter',
  component: ScheduleCallsignFilter,
};

const Template: ComponentStory<typeof ScheduleCallsignFilter> = () => <ScheduleCallsignFilter/>;

export const Default = Template.bind({});
