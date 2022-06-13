import { ComponentStory } from '@storybook/react';
import { PlannerSchedulesPageWithProps } from './PlannerSchedulesPage';
import dayjs from 'dayjs';
import { createMockScheduleItems } from '@utils/mock-data/schedule';
import { Decorators } from '@utils/storybook/decorators';
import { Backend } from '@typing/backend';

export default {
  title: 'Planner/Published Schedules',
  component: PlannerSchedulesPageWithProps,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [Decorators.plannerContainerDecorator],
};

const Template: ComponentStory<typeof PlannerSchedulesPageWithProps> = (
  args
) => <PlannerSchedulesPageWithProps {...args} />;

const mockSchedules: Backend.Schedule[] = Array.from({ length: 3 }, (_, i) => {
  const startDate = dayjs('2022-01-01').month(i).toDate();
  const endDate = dayjs('2022-01-14').month(i).toDate();
  const roles = ['A1', 'A2', 'A3', 'A4', 'A5'].map((name) => ({ name }));
  return {
    startDate,
    endDate,
    roles,
    scheduleItemsByDay: createMockScheduleItems(startDate, endDate, roles),
    month: dayjs(startDate).format('YYYY-MM'),
    isPublished: true,
    duties: [],
  };
}).reverse();

export const Default = Template.bind({});
Default.args = {
  schedules: mockSchedules,
};
