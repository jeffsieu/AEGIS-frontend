import { Backend } from '@typing/backend';
import { iterateDates } from '@utils/helpers/schedule';
import dayjs from 'dayjs';

export const MEMBERS: Backend.Member[] = [
  {
    callsign: 'Bentoh',
    squadron: 'HQ',
    type: 'MEMBER',
  },
  {
    callsign: 'Bon',
    squadron: '69',
    type: 'MEMBER',
  },
  {
    callsign: 'Choi',
    squadron: '18',
    type: 'MEMBER',
  },
  {
    callsign: 'Crafter',
    squadron: '18',
    type: 'ADMIN',
  },
  {
    callsign: 'Egal',
    squadron: '18',
    type: 'MEMBER',
  },
  {
    callsign: 'EngChow',
    squadron: '18',
    type: 'ADMIN',
  },
  {
    callsign: 'Faisal',
    squadron: 'HQ',
    type: 'MEMBER',
  },
  {
    callsign: 'Focus',
    squadron: '18',
    type: 'MEMBER',
  },
  {
    callsign: 'Furi',
    squadron: '3',
    type: 'MEMBER',
  },
  {
    callsign: 'Gambit',
    squadron: '3',
    type: 'MEMBER',
  },
  {
    callsign: 'Halftime',
    squadron: '18',
    type: 'MEMBER',
  },
  {
    callsign: 'Ivan',
    squadron: '69',
    type: 'MEMBER',
  },
  {
    callsign: 'Jereld',
    squadron: '69',
    type: 'MEMBER',
  },
  {
    callsign: 'Karma',
    squadron: '18',
    type: 'MEMBER',
  },
  {
    callsign: 'Kym',
    squadron: '18',
    type: 'MEMBER',
  },
  {
    callsign: 'Lennon',
    squadron: '69',
    type: 'MEMBER',
  },
  {
    callsign: 'Muru',
    squadron: '69',
    type: 'MEMBER',
  },
  {
    callsign: 'Priscilla',
    squadron: '69',
    type: 'MEMBER',
  },
  {
    callsign: 'Rhythm',
    squadron: '201',
    type: 'MEMBER',
  },
  {
    callsign: 'Rudolph',
    squadron: '18',
    type: 'MEMBER',
  },
  {
    callsign: 'Ryan',
    squadron: '3',
    type: 'MEMBER',
  },
  {
    callsign: 'Sean',
    squadron: '69',
    type: 'MEMBER',
  },
  {
    callsign: 'Seed',
    squadron: '18',
    type: 'MEMBER',
  },
  {
    callsign: 'SiYi',
    squadron: '3',
    type: 'MEMBER',
  },
  {
    callsign: 'Slayer',
    squadron: 'HQ',
    type: 'MEMBER',
  },
  {
    callsign: 'Sonic',
    squadron: '18',
    type: 'MEMBER',
  },
  {
    callsign: 'WenJie',
    squadron: '69',
    type: 'MEMBER',
  },
  {
    callsign: 'Threemen',
    squadron: '18',
    type: 'MEMBER',
  },
  {
    callsign: 'Tim',
    squadron: '3',
    type: 'MEMBER',
  },
  {
    callsign: 'Tofu',
    squadron: '18',
    type: 'MEMBER',
  },
  {
    callsign: 'Trickshot',
    squadron: '3',
    type: 'MEMBER',
  },
  {
    callsign: 'Vernon',
    squadron: '69',
    type: 'MEMBER',
  },
  {
    callsign: 'Volley',
    squadron: '3',
    type: 'MEMBER',
  },
  {
    callsign: 'WenYun',
    squadron: '69',
    type: 'MEMBER',
  },
  {
    callsign: 'YanJun',
    squadron: '69',
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
    roles: ['G4 COMD'],
  },
  {
    memberId: 3,
    roles: [],
  },
  {
    memberId: 4,
    roles: ['G4', 'A2'],
  },
  {
    memberId: 5,
    roles: ['G4'],
  },
  {
    memberId: 6,
    roles: ['G4 COMD'],
  },
  {
    memberId: 7,
    roles: ['G4 COMD', 'A2'],
  },
  {
    memberId: 8,
    roles: ['G4', 'A2'],
  },
  {
    memberId: 9,
    roles: ['G4 COMD'],
  },
  {
    memberId: 10,
    roles: ['G4 COMD', 'G4'],
  },
  {
    memberId: 11,
    roles: ['G4'],
  },
  {
    memberId: 12,
    roles: [],
  },
  {
    memberId: 13,
    roles: ['G4 COMD'],
  },
  {
    memberId: 14,
    roles: ['G4'],
  },
  {
    memberId: 15,
    roles: ['G4', 'A2'],
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
    roles: [],
  },
  {
    memberId: 19,
    roles: ['A2'],
  },
  {
    memberId: 20,
    roles: ['G4'],
  },
  {
    memberId: 21,
    roles: ['G4 COMD'],
  },
  {
    memberId: 22,
    roles: ['G4 COMD', 'G4'],
  },
  {
    memberId: 23,
    roles: ['G4'],
  },
  {
    memberId: 24,
    roles: ['G4 COMD'],
  },
  {
    memberId: 25,
    roles: ['G4 COMD', 'G4'],
  },
  {
    memberId: 26,
    roles: ['G4'],
  },
  {
    memberId: 27,
    roles: ['G4 COMD'],
  },
  {
    memberId: 28,
    roles: ['G4 COMD', 'G4'],
  },
  {
    memberId: 29,
    roles: ['G4 COMD', 'G4'],
  },
  {
    memberId: 30,
    roles: ['G4 COMD', 'G4'],
  },
  {
    memberId: 31,
    roles: ['G4 COMD', 'G4'],
  },
  {
    memberId: 32,
    roles: ['G4 COMD'],
  },
  {
    memberId: 33,
    roles: ['G4 COMD', 'G4'],
  },
  {
    memberId: 34,
    roles: ['G4 COMD'],
  },
  {
    memberId: 35,
    roles: [],
  },
];

export const SCHEDULES: Backend.Schedule[] = [
  {
    month: '2022-01-01',
    isPublished: false,
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
  {
    month: '2022-06-01',
    isPublished: true,
    duties: [
      {
        roleId: 1,
        memberId: 29,
        date: '2022-06-01',
      },
      {
        roleId: 2,
        memberId: 14,
        date: '2022-06-01',
      },
      {
        roleId: 3,
        memberId: 4,
        date: '2022-06-01',
      },
      {
        roleId: 1,
        memberId: 9,
        date: '2022-06-02',
      },
      {
        roleId: 2,
        memberId: 33,
        date: '2022-06-02',
      },
      {
        roleId: 1,
        memberId: 21,
        date: '2022-06-03',
      },
      {
        roleId: 2,
        memberId: 11,
        date: '2022-06-03',
      },
      {
        roleId: 1,
        memberId: 7,
        date: '2022-06-04',
      },
      {
        roleId: 2,
        memberId: 23,
        date: '2022-06-04',
      },
      {
        roleId: 3,
        memberId: 19,
        date: '2022-06-04',
      },
      {
        roleId: 1,
        memberId: 9,
        date: '2022-06-05',
      },
      {
        roleId: 2,
        memberId: 28,
        date: '2022-06-05',
      },
      {
        roleId: 1,
        memberId: 6,
        date: '2022-06-06',
      },
      {
        roleId: 2,
        memberId: 31,
        date: '2022-06-06',
      },
      {
        roleId: 3,
        memberId: 4,
        date: '2022-06-06',
      },
      {
        roleId: 1,
        memberId: 10,
        date: '2022-06-07',
      },
      {
        roleId: 2,
        memberId: 11,
        date: '2022-06-07',
      },
      {
        roleId: 1,
        memberId: 28,
        date: '2022-06-08',
      },
      {
        roleId: 2,
        memberId: 17,
        date: '2022-06-08',
      },
      {
        roleId: 3,
        memberId: 16,
        date: '2022-06-08',
      },
      {
        roleId: 1,
        memberId: 21,
        date: '2022-06-09',
      },
      {
        roleId: 2,
        memberId: 23,
        date: '2022-06-09',
      },
      {
        roleId: 3,
        memberId: 4,
        date: '2022-06-09',
      },
      {
        roleId: 1,
        memberId: 13,
        date: '2022-06-10',
      },
      {
        roleId: 2,
        memberId: 5,
        date: '2022-06-10',
      },
      {
        roleId: 1,
        memberId: 6,
        date: '2022-06-11',
      },
      {
        roleId: 2,
        memberId: 20,
        date: '2022-06-11',
      },
      {
        roleId: 3,
        memberId: 15,
        date: '2022-06-11',
      },
      {
        roleId: 1,
        memberId: 27,
        date: '2022-06-12',
      },
      {
        roleId: 2,
        memberId: 23,
        date: '2022-06-12',
      },
      {
        roleId: 1,
        memberId: 34,
        date: '2022-06-13',
      },
      {
        roleId: 2,
        memberId: 11,
        date: '2022-06-13',
      },
      {
        roleId: 1,
        memberId: 10,
        date: '2022-06-14',
      },
      {
        roleId: 2,
        memberId: 7,
        date: '2022-06-14',
      },
      {
        roleId: 1,
        memberId: 17,
        date: '2022-06-15',
      },
      {
        roleId: 2,
        memberId: 33,
        date: '2022-06-15',
      },
      {
        roleId: 3,
        memberId: 4,
        date: '2022-06-15',
      },
      {
        roleId: 1,
        memberId: 27,
        date: '2022-06-16',
      },
      {
        roleId: 2,
        memberId: 22,
        date: '2022-06-16',
      },
      {
        roleId: 3,
        memberId: 15,
        date: '2022-06-16',
      },
      {
        roleId: 1,
        memberId: 13,
        date: '2022-06-17',
      },
      {
        roleId: 2,
        memberId: 25,
        date: '2022-06-17',
      },
      {
        roleId: 1,
        memberId: 24,
        date: '2022-06-18',
      },
      {
        roleId: 2,
        memberId: 20,
        date: '2022-06-18',
      },
      {
        roleId: 3,
        memberId: 19,
        date: '2022-06-18',
      },
      {
        roleId: 1,
        memberId: 22,
        date: '2022-06-19',
      },
      {
        roleId: 2,
        memberId: 7,
        date: '2022-06-19',
      },
      {
        roleId: 1,
        memberId: 6,
        date: '2022-06-20',
      },
      {
        roleId: 2,
        memberId: 14,
        date: '2022-06-20',
      },
      {
        roleId: 3,
        memberId: 15,
        date: '2022-06-20',
      },
      {
        roleId: 1,
        memberId: 34,
        date: '2022-06-21',
      },
      {
        roleId: 2,
        memberId: 1,
        date: '2022-06-21',
      },
      {
        roleId: 1,
        memberId: 24,
        date: '2022-06-22',
      },
      {
        roleId: 2,
        memberId: 28,
        date: '2022-06-22',
      },
      {
        roleId: 1,
        memberId: 9,
        date: '2022-06-23',
      },
      {
        roleId: 2,
        memberId: 26,
        date: '2022-06-23',
      },
      {
        roleId: 3,
        memberId: 8,
        date: '2022-06-23',
      },
      {
        roleId: 1,
        memberId: 21,
        date: '2022-06-24',
      },
      {
        roleId: 2,
        memberId: 31,
        date: '2022-06-24',
      },
      {
        roleId: 3,
        memberId: 15,
        date: '2022-06-24',
      },
      {
        roleId: 1,
        memberId: 27,
        date: '2022-06-25',
      },
      {
        roleId: 2,
        memberId: 7,
        date: '2022-06-25',
      },
      {
        roleId: 1,
        memberId: 24,
        date: '2022-06-26',
      },
      {
        roleId: 2,
        memberId: 14,
        date: '2022-06-26',
      },
      {
        roleId: 3,
        memberId: 4,
        date: '2022-06-26',
      },
      {
        roleId: 1,
        memberId: 10,
        date: '2022-06-27',
      },
      {
        roleId: 2,
        memberId: 22,
        date: '2022-06-27',
      },
      {
        roleId: 1,
        memberId: 33,
        date: '2022-06-28',
      },
      {
        roleId: 2,
        memberId: 1,
        date: '2022-06-28',
      },
      {
        roleId: 1,
        memberId: 29,
        date: '2022-06-29',
      },
      {
        roleId: 2,
        memberId: 25,
        date: '2022-06-29',
      },
      {
        roleId: 3,
        memberId: 15,
        date: '2022-06-29',
      },
      {
        roleId: 1,
        memberId: 24,
        date: '2022-06-30',
      },
      {
        roleId: 2,
        memberId: 26,
        date: '2022-06-30',
      },
    ],
  },
];

export const REQUESTS: Backend.Request[] = [
  {
    memberId: 15,
    startDate: '2022-07-25',
    endDate: '2022-08-05',
    reason: 'Cse: Para Counselling',
    type: 'Work',
  },
  {
    memberId: 4,
    startDate: '2022-07-01',
    endDate: '2022-07-12',
    reason: 'Overseas: ',
    type: 'Personal',
  },
  {
    memberId: 9,
    startDate: '2022-07-14',
    endDate: '2022-07-16',
    reason: 'Bravo Cohesion',
    type: 'Work',
  },
  {
    memberId: 9,
    startDate: '2022-07-01',
    endDate: '2022-07-01',
    reason: 'SAFDP',
    type: 'Work',
  },
  {
    memberId: 9,
    startDate: '2022-07-12',
    endDate: '2022-07-12',
    reason: 'XX',
    type: 'Personal',
  },
  {
    memberId: 9,
    startDate: '2022-07-18',
    endDate: '2022-07-18',
    reason: 'XX',
    type: 'Personal',
  },
  {
    memberId: 9,
    startDate: '2022-07-23',
    endDate: '2022-07-23',
    reason: 'XX',
    type: 'Personal',
  },
];
