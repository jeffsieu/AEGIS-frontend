import { ComponentStory } from '@storybook/react';
import { PlannerDraftsPageWithProps } from './PlannerDraftsPage';
import dayjs from 'dayjs';
import { iterateDates } from '@utils/helpers/schedule';
import { AvailableQualifiedMember, Role } from '@typing';
import { ScheduleItemPropsWithoutCallback } from '@components/schedule/ScheduleItem/ScheduleItem';
import { createMockScheduleItems, MOCK_QUALIFIED_MEMBERS } from '@utils/mock-data/schedule';


const mockStartDate = dayjs('2022-04-01').toDate();
const mockEndDate = dayjs('2022-04-14').toDate();
const mockRoles = ['A1', 'A2', 'A3', 'A4', 'A5'];

export default {
  title: 'Planner/Drafts',
  component: PlannerDraftsPageWithProps,
};

const Template: ComponentStory<typeof PlannerDraftsPageWithProps> = (args) => {
  return <PlannerDraftsPageWithProps {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  startDate: mockStartDate,
  endDate: mockEndDate,
  roles: mockRoles,
  scheduleItemsByDay: createMockScheduleItems(mockStartDate, mockEndDate, mockRoles),
};
