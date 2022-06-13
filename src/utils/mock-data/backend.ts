import { Backend } from '@typing/backend';
import { iterateDates } from '@utils/helpers/schedule';
import dayjs from 'dayjs';

export const MEMBERS: Backend.Member[] = [
  {
    callsign: 'Alpha',
    squadron: 'Squadron1',
    type: 'MEMBER',
  },
  {
    callsign: 'Bravo',
    squadron: 'Squadron1',
    type: 'MEMBER',
  },
  {
    callsign: 'Charlie',
    squadron: 'Squadron1',
    type: 'MEMBER',
  },
];

export const ROLES: Backend.Role[] = [
  {
    name: 'A1',
  },
  {
    name: 'A2',
  },
  {
    name: 'A3',
  },
];

export type MockQualification = {
  memberId: number;
  roles: string[];
};

export const QUALIFICATIONS: MockQualification[] = [
  {
    memberId: 1,
    roles: ['A1', 'A2'],
  },
  {
    memberId: 2,
    roles: ['A1', 'A3'],
  },
  {
    memberId: 3,
    roles: ['A2', 'A3'],
  },
];

export const SCHEDULES: Backend.Schedule[] = [
  {
    month: '2022-01-01',
    isPublished: true,
    duties: [
      ...[
        ...iterateDates(new Date('2022-01-01'), new Date('2022-01-31')),
      ].flatMap((date, index) => [
        {
          roleId: 1,
          memberId: index % 2 === 0 ? 1 : 2,
          date: dayjs(date).format('YYYY-MM-DD'),
        },
        {
          roleId: 2,
          memberId: index % 2 === 0 ? 1 : 3,
          date: dayjs(date).format('YYYY-MM-DD'),
        },
        {
          roleId: 3,
          memberId: index % 2 === 0 ? 2 : 3,
          date: dayjs(date).format('YYYY-MM-DD'),
        },
      ]),
    ],
  },
  {
    month: '2022-02-01',
    isPublished: false,
    duties: [
      {
        roleId: 1,
        date: '2022-02-03',
      },
    ],
  },
];

export const REQUESTS: Backend.Request[] = [
  {
    memberId: 1,
    startDate: '2022-02-03',
    endDate: '2022-02-03',
    reason: 'sick',
  },
];
