import { ComponentStory } from '@storybook/react';
import { PlannerPublishedPageWithProps } from './PlannerPublishedPage';
import dayjs from 'dayjs';
import { createMockScheduleItems } from '@utils/mock-data/schedule';

export default {
  title: 'Planner/Published',
  component: PlannerPublishedPageWithProps,
};

const Template: ComponentStory<typeof PlannerPublishedPageWithProps> = (args) => (
  <PlannerPublishedPageWithProps {...args} />
);

const mockStartDate = dayjs('2022-04-01').toDate();
const mockEndDate = dayjs('2022-04-14').toDate();
const mockRoles = ['A1', 'A2', 'A3', 'A4', 'A5'];

export const Default = Template.bind({});
Default.args = {
  schedules: [
    {
      startDate: mockStartDate,
      endDate: mockEndDate,
      roles: mockRoles,
      scheduleItemsByDay: createMockScheduleItems(mockStartDate, mockEndDate, mockRoles),
    },
  ]
};