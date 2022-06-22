import { ScheduleItemPropsWithoutCallback } from '@components/schedule/ScheduleItem/ScheduleItem';
import { ScheduleTableProps } from '@components/schedule/ScheduleTable/ScheduleTable';
import { AvailableQualifiedMember, QualifiedMember } from '@typing';
import { Backend } from '@typing/backend';
import dayjs from 'dayjs';

export function toShortenedDateString(date: Date): string {
  return date.toLocaleDateString('en-SG', {
    month: 'short',
    day: 'numeric',
  });
}

export function toShortenedDayOfWeekString(date: Date): string {
  return date.toLocaleDateString('en-SG', {
    weekday: 'short',
  });
}

export function toShortenedMonthString(date: Date): string {
  return date.toLocaleDateString('en-SG', {
    month: 'short',
  });
}

export function toLongMonthString(date: Date): string {
  return date.toLocaleDateString('en-SG', {
    month: 'long',
  });
}

export function* iterateDates(
  startDate: Date,
  endDate: Date
): IterableIterator<Date> {
  for (
    let currentDate = startDate;
    currentDate <= endDate;
    currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000)
  ) {
    yield currentDate;
  }
}

export const getScheduleItemsByDay = (
  startDate: Date,
  endDate: Date,
  roles: Backend.Entry<Backend.Role>[],
  duties: Backend.Duty[],
  members: Backend.Entry<Backend.Member>[],
  memberAvailabilities: Backend.Entry<Backend.MemberWithAvailability>[]
): ScheduleItemPropsWithoutCallback[][] => {
  const scheduleItemsByDay: ScheduleItemPropsWithoutCallback[][] = [];
  const scheduleItems: Record<
    string,
    Record<string, ScheduleItemPropsWithoutCallback>
  > = {};

  const dutyCounts: Map<number, number> = new Map();
  for (const duty of duties) {
    if (duty.memberId === undefined) {
      continue;
    }
    const dutyCount = dutyCounts.get(duty.memberId);
    if (dutyCount) {
      dutyCounts.set(duty.memberId, dutyCount + 1);
    } else {
      dutyCounts.set(duty.memberId, 1);
    }
  }

  for (const duty of duties) {
    const role = roles.find((r) => r.id === duty.roleId)!;
    const dateString = dayjs(duty.date).startOf('day').format('YYYY-MM-DD');

    scheduleItems[dateString] = {
      ...scheduleItems[dateString],
      [role.name]: {
        isRequired: true,
        assignedMember: duty.memberId
          ? ({
              isAvailable: true,
              ...members.find((m) => m.id === duty.memberId)!,
              dutyCount:
                duty.memberId !== undefined
                  ? dutyCounts.get(duty.memberId) || 0
                  : 0,
            } as AvailableQualifiedMember)
          : null,
        qualifiedMembers: memberAvailabilities
          .filter(({ roles }) => {
            return roles.some((r) => r.id === role.id);
          })
          .map((member) => {
            const memberRequests = member.requests.filter((request) => {
              return !(
                dayjs(request.endDate).isBefore(duty.date, 'day') ||
                dayjs(request.startDate).isAfter(duty.date, 'day')
              );
            });
            if (memberRequests.length === 0) {
              return {
                ...member,
                isAvailable: true,
                unavailableReasons: [],
                dutyCount: dutyCounts.get(member.id) || 0,
              };
            } else {
              return {
                ...member,
                isAvailable: false,
                unavailableReasons: memberRequests.map(
                  (request) => `Request: ${request.reason}`
                ),
                dutyCount: dutyCounts.get(member.id) || 0,
              };
            }
          }),
      },
    };
  }

  for (const date of iterateDates(startDate, endDate)) {
    const scheduleItemsForDate: ScheduleItemPropsWithoutCallback[] = [];
    const scheduleItemsMap = scheduleItems[dayjs(date).format('YYYY-MM-DD')];
    const scheduledMemberCounts = new Map<string, number>();

    for (const role of roles) {
      const scheduleItem = scheduleItemsMap?.[role.name];
      if (scheduleItem) {
        scheduleItemsForDate.push(scheduleItem);
        if (scheduleItem.assignedMember) {
          scheduledMemberCounts.set(
            scheduleItem.assignedMember.callsign,
            (scheduledMemberCounts.get(scheduleItem.assignedMember.callsign) ||
              0) + 1
          );
        }
      } else {
        scheduleItemsForDate.push({ isRequired: false, assignedMember: null });
      }
    }

    // For each slot, if member is schedule in another slot, declare already assigned member as unavailable
    const updatedScheduleItemsForDate = scheduleItemsForDate.map(
      (scheduleItem) => {
        if (!scheduleItem.isRequired) {
          return scheduleItem;
        }
        return {
          ...scheduleItem,
          qualifiedMembers: scheduleItem.qualifiedMembers.map((member) => {
            const sameDayDutyCount =
              scheduledMemberCounts.get(member.callsign) ?? 0;
            const isScheduledForThisRole =
              scheduleItem.assignedMember?.callsign === member.callsign;

            // Get the number of other duties scheduled for this member on this day
            const otherSameDayDutyCount =
              sameDayDutyCount - (isScheduledForThisRole ? 1 : 0);

            if (otherSameDayDutyCount > 0) {
              const oldUnavailableReasons = member.isAvailable
                ? []
                : member.unavailableReasons;
              return {
                ...member,
                isAvailable: false,
                unavailableReasons: [
                  ...oldUnavailableReasons,
                  'Scheduled on same day',
                ],
              };
            } else {
              return member;
            }
          }) as QualifiedMember[],
        };
      }
    );

    scheduleItemsByDay.push(updatedScheduleItemsForDate);
  }

  return scheduleItemsByDay;
};

export function scheduleToScheduleTableProps(
  schedule: Backend.Schedule,
  roles: Backend.Entry<Backend.Role>[],
  members: Backend.Entry<Backend.Member>[],
  memberAvailabilities: Backend.Entry<Backend.MemberWithAvailability>[] = []
): Pick<
  ScheduleTableProps,
  'startDate' | 'endDate' | 'roles' | 'scheduleItemsByDay'
> {
  const { month, duties } = schedule;

  const startDate = dayjs(month).startOf('month').toDate();
  const endDate = dayjs(month).endOf('month').toDate();

  return {
    startDate,
    endDate,
    roles,
    scheduleItemsByDay: getScheduleItemsByDay(
      startDate,
      endDate,
      roles,
      duties,
      members,
      memberAvailabilities
    ),
  };
}
