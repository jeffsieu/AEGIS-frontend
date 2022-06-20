import { Backend } from '@typing/backend';
import { iterateDates } from '@utils/helpers/schedule';
import dayjs from 'dayjs';

export const MEMBERS: Backend.Member[] = [
  {
    callsign: 'Tim',
    squadron: '3',
    type: 'MEMBER',
  },
  {
    callsign: 'Volley',
    squadron: '3',
    type: 'MEMBER',
  },
  {
    callsign: 'Gambit',
    squadron: '3',
    type: 'MEMBER',
  },
  {
    callsign: 'Trickshot',
    squadron: '3',
    type: 'MEMBER',
  },
  {
    callsign: 'Muru',
    squadron: '69',
    type: 'MEMBER',
  },
  {
    callsign: 'Sean',
    squadron: '69',
    type: 'MEMBER',
  },
  {
    callsign: 'Lennon',
    squadron: '69',
    type: 'MEMBER',
  },
  {
    callsign: 'Tofu',
    squadron: '18',
    type: 'MEMBER',
  },
  {
    callsign: 'Egal',
    squadron: '18',
    type: 'MEMBER',
  },
  {
    callsign: 'Focus',
    squadron: '18',
    type: 'MEMBER',
  },
  {
    callsign: 'Seed',
    squadron: '18',
    type: 'MEMBER',
  },
  {
    callsign: 'Crafter',
    squadron: '18',
    type: 'ADMIN',
  },
  {
    callsign: 'Rudolph',
    squadron: '18',
    type: 'MEMBER',
  },
  {
    callsign: 'Karma',
    squadron: '18',
    type: 'MEMBER',
  },
  {
    callsign: 'Sonic',
    squadron: '18',
    type: 'MEMBER',
  },
  {
    callsign: 'Kym',
    squadron: '18',
    type: 'MEMBER',
  },
  {
    callsign: 'Threemen',
    squadron: '18',
    type: 'MEMBER',
  },
  {
    callsign: 'Halftime',
    squadron: '18',
    type: 'MEMBER',
  },
  {
    callsign: 'Bentoh',
    squadron: 'HQ',
    type: 'MEMBER',
  },
  {
    callsign: 'Slayer',
    squadron: 'HQ',
    type: 'MEMBER',
  },
  {
    callsign: 'Faisal',
    squadron: 'HQ',
    type: 'MEMBER',
  },
];

export const ROLES: Backend.Role[] = [
  {
    name: 'G4 COMD',
  },
  {
    name: 'G4',
  },
  {
    name: 'A2',
  },
];

export type MockQualification = {
  memberId: number;
  roles: string[];
};

export const QUALIFICATIONS: MockQualification[] = [
  {
    memberId: 1,
    roles: ['G4 COMD', 'G4'],
  },
  {
    memberId: 2,
    roles: ['G4 COMD', 'G4'],
  },
  {
    memberId: 3,
    roles: ['G4 COMD', 'G4'],
  },
  {
    memberId: 4,
    roles: ['G4 COMD', 'G4'],
  },
  {
    memberId: 5,
    roles: ['G4 COMD', 'G4'],
  },
  {
    memberId: 6,
    roles: ['G4 COMD', 'G4'],
  },
  {
    memberId: 7,
    roles: ['G4', 'A2'],
  },
  {
    memberId: 8,
    roles: ['G4 COMD', 'G4'],
  },
  {
    memberId: 9,
    roles: ['G4'],
  },
  {
    memberId: 10,
    roles: ['G4', 'A2'],
  },
  {
    memberId: 11,
    roles: ['G4'],
  },
  {
    memberId: 12,
    roles: ['G4', 'A2'],
  },
  {
    memberId: 13,
    roles: ['G4'],
  },
  {
    memberId: 14,
    roles: ['G4'],
  },
  {
    memberId: 15,
    roles: ['G4'],
  },
  {
    memberId: 16,
    roles: ['G4', 'A2'],
  },
  {
    memberId: 17,
    roles: ['G4 COMD', 'G4'],
  },
  {
    memberId: 18,
    roles: ['G4'],
  },
  {
    memberId: 19,
    roles: ['G4 COMD', 'G4'],
  },
  {
    memberId: 20,
    roles: ['G4 COMD', 'G4'],
  },
  {
    memberId: 21,
    roles: ['G4 COMD', 'G4'],
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
          memberId: Math.floor(Math.random() * 22),
          date: dayjs(date).format('YYYY-MM-DD'),
        },
        {
          roleId: 2,
          memberId: Math.floor(Math.random() * 22),
          date: dayjs(date).format('YYYY-MM-DD'),
        },
        {
          roleId: 3,
          memberId: Math.floor(Math.random() * 22),
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
    reason: 'Local leave',
  },
  {
    memberId: 20,
    startDate: '2022-07-03',
    endDate: '2022-07-03',
    reason: 'MC',
  },
  {
    memberId: 15,
    startDate: '2022-07-02',
    endDate: '2022-07-31',
    reason: 'Clearing leave',
  },
  {
    memberId: 13,
    startDate: '2022-07-16',
    endDate: '2022-07-24',
    reason: 'Overseas leave',
  },
  {
    memberId: 12,
    startDate: '2022-07-09',
    endDate: '2022-07-09',
    reason: 'NDP rehearsal',
  },
  {
    memberId: 5,
    startDate: '2022-07-16',
    endDate: '2022-07-16',
    reason: 'NDP rehearsal',
  },
  {
    memberId: 7,
    startDate: '2022-07-23',
    endDate: '2022-07-23',
    reason: 'NDP rehearsal',
  },
  {
    memberId: 17,
    startDate: '2022-07-20',
    endDate: '2022-07-21',
    reason: 'PCL',
  },
  {
    memberId: 14,
    startDate: '2022-07-30',
    endDate: '2022-07-30',
    reason: 'OML',
  },
  {
    memberId: 8,
    startDate: '2022-07-11',
    endDate: '2022-07-15',
    reason: 'Meeting',
  },
];
