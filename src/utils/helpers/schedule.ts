import { ScheduleItemPropsWithoutCallback } from '@components/schedule/ScheduleItem/ScheduleItem';
import { ScheduleTableProps } from '@components/schedule/ScheduleTable/ScheduleTable';
import { AvailableQualifiedMember, QualifiedMember, Role } from '@typing';
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
  qualifiedMembers: (Backend.MemberWithAvailability & QualifiedMember)[]
): ScheduleItemPropsWithoutCallback[][] => {
  const scheduleItemsByDay: ScheduleItemPropsWithoutCallback[][] = [];

  const scheduleItems: {
    [key: string]: {
      [key: string]: ScheduleItemPropsWithoutCallback;
    };
  } = {};

  for (const duty of duties) {
    const role = roles.find((r) => r.id === duty.roleId)!;
    const dateString = dayjs(duty.date).startOf('day').format('YYYY-MM-DD');
    scheduleItems[dateString] = {
      ...scheduleItems[dateString],
      [role.name]: {
        isRequired: true,
        assignedMember: null,
        qualifiedMembers: qualifiedMembers.filter(({ roles }) => {
          return roles.some((r) => r.id === role.id);
        }),
      },
    };
  }

  console.log(scheduleItems);

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
    scheduleItemsByDay.push(scheduleItemsForDate);
  }

  console.log(scheduleItemsByDay);

  return scheduleItemsByDay;
};

export function scheduleToScheduleTableProps(
  schedule: Backend.Schedule,
  roles: Backend.Entry<Backend.Role>[],
  qualifiedMembers: (Backend.MemberWithAvailability & QualifiedMember)[] = []
): ScheduleTableProps {
  const { month, duties } = schedule;

  const startDate = dayjs(month).startOf('month').toDate();
  const endDate = dayjs(month).endOf('month').toDate();

  const scheduleTableProps: ScheduleTableProps = {
    startDate,
    endDate,
    roles,
    scheduleItemsByDay: getScheduleItemsByDay(
      startDate,
      endDate,
      roles,
      duties,
      qualifiedMembers
    ),
    onMemberSelected: function (
      date: Date,
      role: Role,
      member: AvailableQualifiedMember | null
    ): void {},
  };

  return scheduleTableProps;
}
