import { ScheduleItemPropsWithoutCallback } from '@components/schedule/ScheduleItem/ScheduleItem';
import { AvailableQualifiedMember, QualifiedMember, Role } from '@typing';
import { iterateDates } from '@utils/helpers/schedule';

export const MOCK_QUALIFIED_MEMBERS: QualifiedMember[] = [
  {
    dutyCount: 1,
    callsign: 'Alpha',
    isAvailable: true,
  },
  {
    dutyCount: 2,
    callsign: 'Bravo',
    isAvailable: true,
  },
  {
    dutyCount: 10,
    callsign: 'Charlie',
    isAvailable: false,
    unavailableReasons: [{text:'Too Busy', dateSubmitted: null, isLate: false, type: null}],
  },
];

export const createMockScheduleItems = (
  startDate: Date,
  endDate: Date,
  roles: Role[]
): ScheduleItemPropsWithoutCallback[][] => {
  const scheduleItemsByDay: ScheduleItemPropsWithoutCallback[][] = [];
  for (const [dayIndex] of [...iterateDates(startDate, endDate)].entries()) {
    const scheduleItemsForDate: ScheduleItemPropsWithoutCallback[] = [];
    scheduleItemsByDay.push(scheduleItemsForDate);
    for (const [roleIndex] of roles.entries()) {
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
