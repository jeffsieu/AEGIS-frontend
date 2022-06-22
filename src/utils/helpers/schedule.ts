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
          ? {
              isAvailable: true,
              ...members.find((m) => m.id === duty.memberId)!,
              dutyCount:
                duty.memberId !== undefined
                  ? dutyCounts.get(duty.memberId) || 0
                  : 0,
            }
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

  const scheduledDutyCounts = new Map<string, Map<string, number>>();

  for (const date of iterateDates(startDate, endDate)) {
    const dutyCounts = new Map<string, number>();
    const scheduleItemsMap = scheduleItems[dayjs(date).format('YYYY-MM-DD')];

    for (const role of roles) {
      const scheduleItem = scheduleItemsMap?.[role.name];
      if (scheduleItem) {
        if (scheduleItem.assignedMember) {
          dutyCounts.set(
            scheduleItem.assignedMember.callsign,
            (dutyCounts.get(scheduleItem.assignedMember.callsign) || 0) + 1
          );
        }
      }
    }

    scheduledDutyCounts.set(dayjs(date).format('YYYY-MM-DD'), dutyCounts);
  }

  for (const date of iterateDates(startDate, endDate)) {
    const scheduleItemsForDate: ScheduleItemPropsWithoutCallback[] = [];
    const scheduleItemsMap = scheduleItems[dayjs(date).format('YYYY-MM-DD')];

    for (const role of roles) {
      const scheduleItem = scheduleItemsMap?.[role.name];
      if (scheduleItem) {
        scheduleItemsForDate.push(scheduleItem);
      } else {
        scheduleItemsForDate.push({ isRequired: false, assignedMember: null });
      }
    }

    // For each duty,
    // - the scheduled member is declared as unavailable for other same-day duties
    // - the scheduled member is declared as unavailable for other next-day duties
    const sameDayScheduledDutyCounts = scheduledDutyCounts.get(
      dayjs(date).format('YYYY-MM-DD')
    )!;

    const previousDayScheduledDutyCounts =
      scheduledDutyCounts.get(
        dayjs(date).subtract(1, 'day').format('YYYY-MM-DD')
      ) ?? new Map<string, number>();

    const updatedScheduleItemsForDate = scheduleItemsForDate.map(
      (scheduleItem) => {
        if (!scheduleItem.isRequired) {
          return scheduleItem;
        }

        return {
          ...scheduleItem,
          qualifiedMembers: scheduleItem.qualifiedMembers.map((member) => {
            const sameDayDutyCount =
              sameDayScheduledDutyCounts.get(member.callsign) || 0;
            const previousDayDutyCount =
              previousDayScheduledDutyCounts.get(member.callsign) || 0;
            const isScheduledForThisRole =
              scheduleItem.assignedMember?.callsign === member.callsign;

            // Get the number of other duties scheduled for this member on this day
            const otherSameDayDutyCount =
              sameDayDutyCount - (isScheduledForThisRole ? 1 : 0);

            if (otherSameDayDutyCount > 0) {
              const oldUnavailableReasons = member.isAvailable
                ? []
                : member.unavailableReasons;
              member = {
                ...member,
                isAvailable: false,
                unavailableReasons: [
                  ...oldUnavailableReasons,
                  'Scheduled on same day',
                ],
              };
            }

            if (previousDayDutyCount > 0) {
              const oldUnavailableReasons = member.isAvailable
                ? []
                : member.unavailableReasons;
              member = {
                ...member,
                isAvailable: false,
                unavailableReasons: [
                  ...oldUnavailableReasons,
                  'Scheduled on previous day',
                ],
              };
            }

            return member;
          }) as QualifiedMember[],
        };
      }
    );

    scheduleItemsByDay.push(updatedScheduleItemsForDate);
  }

  for (const duty of duties) {
    if (duty.memberId === undefined) {
      continue;
    }
    const dayIndex = dayjs(duty.date).diff(startDate, 'day');
    const roleIndex = roles.findIndex((r) => r.id === duty.roleId);

    const scheduleItem = scheduleItemsByDay[dayIndex][roleIndex];
    if (scheduleItem && scheduleItem.isRequired) {
      const member = members.find((m) => m.id === duty.memberId);
      if (member === undefined) {
        continue;
      }
      const memberCallsign = member.callsign;

      const memberWithAvailability = scheduleItem.qualifiedMembers.find(
        (member) => member.callsign === memberCallsign
      );

      if (memberWithAvailability === undefined) {
        continue;
      }

      scheduleItemsByDay[dayIndex][roleIndex] = {
        ...scheduleItem,
        assignedMember: memberWithAvailability,
      };
    }
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
