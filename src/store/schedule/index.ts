import {
  RequiredScheduleItemProps,
  ScheduleItemProps,
  ScheduleItemPropsWithoutCallback,
} from '@components/schedule/ScheduleItem/ScheduleItem';
import { createNextState, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@store';
import { AvailableQualifiedMember, QualifiedMember, Role } from '@types';
import { iterateDates } from '@utils/helpers/schedule';

export type DraftState = {
  startDate: Date;
  endDate: Date;
  roles: Role[];
  scheduleItems: {
    [key: string]: {
      [key: Role]: ScheduleItemPropsWithoutCallback;
    };
  };
};

export type AssignPayload = {
  date: Date;
  role: Role;
  member: AvailableQualifiedMember | null;
};

export const createDraftSlice = (initialState: DraftState) => {
  return createSlice({
    name: 'draftScheduleItems',
    initialState: initialState,
    reducers: {
      assign: (state: DraftState, action: PayloadAction<AssignPayload>) => {
        const { date, role, member } = action.payload;
        console.log(date.toDateString(), role, member);
        console.log(state.scheduleItems);
        const roleMap = state.scheduleItems[date.toDateString()]!;

        if (!roleMap[role].isRequired) {
          throw new Error('Cannot assign to a non-required role');
        }
        (
          roleMap[role] as Omit<RequiredScheduleItemProps, 'onMemberSelected'>
        ).assignedMember = member;
        state.scheduleItems[date.toDateString()] = roleMap;
      },
    },
  });
};

export const draftSlice = createDraftSlice({
  startDate: new Date(),
  endDate: new Date(),
  roles: ['A1'],
  scheduleItems: {},
});

export const { assign } = draftSlice.actions;

export const getScheduleItemsByDay = (
  state: RootState
): ScheduleItemPropsWithoutCallback[][] => {
  const startDate = state.draft.startDate;
  const endDate = state.draft.endDate;
  const roles = state.draft.roles;
  const scheduleItemsByDay: ScheduleItemPropsWithoutCallback[][] = [];

  for (const date of iterateDates(startDate, endDate)) {
    const scheduleItemsForDate: ScheduleItemPropsWithoutCallback[] = [];
    const scheduleItemsMap = state.draft.scheduleItems[date.toDateString()];
    for (const role of roles) {
      const scheduleItem = scheduleItemsMap?.[role];
      if (scheduleItem) {
        scheduleItemsForDate.push(scheduleItem);
      } else {
        scheduleItemsForDate.push({ isRequired: false });
      }
    }
    scheduleItemsByDay.push(scheduleItemsForDate);
  }

  return scheduleItemsByDay;
};

export default draftSlice.reducer;
