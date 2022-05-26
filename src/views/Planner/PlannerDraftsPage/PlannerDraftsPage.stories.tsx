import { ComponentStory } from '@storybook/react';
import { Provider } from 'react-redux';
import PlannerDraftsPage from './PlannerDraftsPage';
import { createDraftSlice, DraftState } from '@store/schedule';
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
): DraftState['scheduleItems'] => {
  const scheduleItems: DraftState['scheduleItems'] = {};
  for (const [dayIndex, date] of [
    ...iterateDates(startDate, endDate),
  ].entries()) {
    const map: DraftState['scheduleItems'][string] = {};
    scheduleItems[date.toDateString()] = map;
    for (const [roleIndex, role] of roles.entries()) {
      map[role] = {
        isRequired: roleIndex <= 1 || dayIndex % 3 === 0,
        qualifiedMembers: MOCK_QUALIFIED_MEMBERS,
        assignedMember:
          (dayIndex + roleIndex) % 3 === 0
            ? MOCK_QUALIFIED_MEMBERS.find(
                (member): member is AvailableQualifiedMember =>
                  member.isAvailable
              )!
            : null,
      } as ScheduleItemPropsWithoutCallback;
    }
  }
  return scheduleItems;
};

const mockStartDate = dayjs('2022-04-01').toDate();
const mockEndDate = dayjs('2022-04-14').toDate();
const mockRoles = ['A1', 'A2', 'A3', 'A4', 'A5'];

const mockDraftSlice = createDraftSlice({
  startDate: mockStartDate,
  endDate: mockEndDate,
  roles: mockRoles,
  scheduleItems: createMockScheduleItems(mockStartDate, mockEndDate, mockRoles),
});

export default {
  title: 'Planner/Drafts',
  component: PlannerDraftsPage,
  decorators: [
    (Story: any) => {
      return (
        <Provider
          store={configureStore({
            reducer: {
              draft: mockDraftSlice.reducer,
            },
          })}
        >
          <Story />
        </Provider>
      );
    },
  ],
};

const Template: ComponentStory<typeof PlannerDraftsPage> = (args) => {
  return <PlannerDraftsPage {...args} />;
};

export const Default = Template.bind({});
// Default.args = {
//   role: 'A1',
// };
