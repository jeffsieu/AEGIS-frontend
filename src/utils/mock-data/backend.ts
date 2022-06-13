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

export type MockQualification = {
  memberId: number;
  roles: string[];
}

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
    isPublished: false,
    duties: [
      {
        roleId: 1,
        date: '2022-01-03',
      },
    ],
  },
];

export const REQUESTS: Backend.Request[] = [
  {
    memberId: 1,
    startDate: '2022-01-03',
    endDate: '2022-01-03',
    reason: 'sick',
  }
]
