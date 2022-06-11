import { Backend } from '@typing/backend';

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

export const SCHEDULES: Backend.Schedule[] = [
  {
    month: '2022-01-01',
    isPublished: false,
    duties: [
      {
        roleId: 1,
        date: '2022-01-03',
      },
    ],
  },
];
