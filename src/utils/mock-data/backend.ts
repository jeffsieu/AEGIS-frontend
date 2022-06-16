import { Backend } from '@typing/backend';
import { iterateDates } from '@utils/helpers/schedule';
import dayjs from 'dayjs';

export const MEMBERS: Backend.Member[] = [
  {
    callsign: 'Nano',
    squadron: '18',
    type: 'ADMIN',
  },
  {
    callsign: 'Crafter',
    squadron: '18',
    type: 'MEMBER',
  },
  {
    callsign: 'Ram',
    squadron: '18',
    type: 'MEMBER',
  },
];

export const ROLES: Backend.Role[] = [
  {
    name: 'A2',
  },
  {
    name: 'G4',
  },
  {
    name: 'G4 COMD',
  },
];

export type MockQualification = {
  memberId: number;
  roles: string[];
};

export const QUALIFICATIONS: MockQualification[] = [
  {
    memberId: 1,
    roles: ['A2', 'G4'],
  },
  {
    memberId: 2,
    roles: ['G4', 'G4 COMD'],
  },
  {
    memberId: 3,
    roles: ['A2', 'G4 COMD'],
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
    month: '2022-05-01',
    isPublished: false,
    duties: [
      {
        roleId: 1,
        date: '2022-05-03',
      },
    ],
  },
];

export const REQUESTS: Backend.Request[] = [
  {
    memberId: 1,
    startDate: '2022-05-03',
    endDate: '2022-05-03',
    reason: 'sick',
  },
];
