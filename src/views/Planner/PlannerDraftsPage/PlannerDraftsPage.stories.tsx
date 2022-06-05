import { ComponentStory } from '@storybook/react';
import { Provider } from 'react-redux';
import { PlannerDraftsPageWithoutStore } from './PlannerDraftsPage';
import { createDraftSlice, DraftState } from '@store/schedule/draft';
import dayjs from 'dayjs';
import { configureStore } from '@reduxjs/toolkit';
import { iterateDates } from '@utils/helpers/schedule';
import { AvailableQualifiedMember, Role } from '@types';
import { ScheduleItemPropsWithoutCallback } from '@components/schedule/ScheduleItem/ScheduleItem';
import { MOCK_QUALIFIED_MEMBERS } from '@utils/mock-data/schedule';

const createMockScheduleItems = (
  startDate: Date,
  endDate: Date,
  roles: Role[]
): ScheduleItemPropsWithoutCallback[][] => {
  const scheduleItemsByDay: ScheduleItemPropsWithoutCallback[][] = [];
  for (const [dayIndex, date] of [
    ...iterateDates(startDate, endDate),
  ].entries()) {
    const scheduleItemsForDate: ScheduleItemPropsWithoutCallback[] = [];
    scheduleItemsByDay.push(scheduleItemsForDate);
    for (const [roleIndex, role] of roles.entries()) {
      scheduleItemsForDate.push({
        isRequired: roleIndex <= 1 || dayIndex % 3 === 0,
        qualifiedMembers: MOCK_QUALIFIED_MEMBERS,
        assignedMember:
          (dayIndex + roleIndex) % 3 === 0
            ? MOCK_QUALIFIED_MEMBERS.find(
                (member): member is AvailableQualifiedMember =>
                  member.isAvailable
              )!
            : null,
      } as ScheduleItemPropsWithoutCallback);
    }
  }
  return scheduleItemsByDay;
};

const mockStartDate = dayjs('2022-04-01').toDate();
const mockEndDate = dayjs('2022-04-14').toDate();
const mockRoles = ['A1', 'A2', 'A3', 'A4', 'A5'];

export default {
  title: 'Planner/Drafts',
  component: PlannerDraftsPageWithoutStore,
};

const Template: ComponentStory<typeof PlannerDraftsPageWithoutStore> = (args) => {
  return <PlannerDraftsPageWithoutStore {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  startDate: mockStartDate,
  endDate: mockEndDate,
  roles: mockRoles,
  scheduleItemsByDay: createMockScheduleItems(mockStartDate, mockEndDate, mockRoles),
};
