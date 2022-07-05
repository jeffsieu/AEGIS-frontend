import { Backend } from '@typing/backend';
import { iterateDates } from '@utils/helpers/schedule';
import dayjs from 'dayjs';

export const MEMBERS: Backend.Member[] = [
  {
    callsign: 'Bentoh',
    sqn: 'HQ',
    type: 'MEMBER',
  },
  {
    callsign: 'Bon',
    sqn: '69',
    type: 'MEMBER',
  },
  {
    callsign: 'Choi',
    sqn: '18',
    type: 'MEMBER',
  },
  {
    callsign: 'Crafter',
    sqn: '18',
    type: 'ADMIN',
  },
  {
    callsign: 'Egal',
    sqn: '18',
    type: 'MEMBER',
  },
  {
    callsign: 'EngChow',
    sqn: '18',
    type: 'ADMIN',
  },
  {
    callsign: 'Faisal',
    sqn: 'HQ',
    type: 'MEMBER',
  },
  {
    callsign: 'Focus',
    sqn: '18',
    type: 'MEMBER',
  },
  {
    callsign: 'Furi',
    sqn: '3',
    type: 'MEMBER',
  },
  {
    callsign: 'Gambit',
    sqn: '3',
    type: 'MEMBER',
  },
  {
    callsign: 'Halftime',
    sqn: '18',
    type: 'MEMBER',
  },
  {
    callsign: 'Ivan',
    sqn: '69',
    type: 'MEMBER',
  },
  {
    callsign: 'Jereld',
    sqn: '69',
    type: 'MEMBER',
  },
  {
    callsign: 'Karma',
    sqn: '18',
    type: 'MEMBER',
  },
  {
    callsign: 'Kym',
    sqn: '18',
    type: 'MEMBER',
  },
  {
    callsign: 'Lennon',
    sqn: '69',
    type: 'MEMBER',
  },
  {
    callsign: 'Priscilla',
    sqn: '69',
    type: 'MEMBER',
  },
  {
    callsign: 'Rhythm',
    sqn: '201',
    type: 'MEMBER',
  },
  {
    callsign: 'Rudolph',
    sqn: '18',
    type: 'MEMBER',
  },
  {
    callsign: 'Ryan',
    sqn: '3',
    type: 'MEMBER',
  },
  {
    callsign: 'Sean',
    sqn: '69',
    type: 'MEMBER',
  },
  {
    callsign: 'Seed',
    sqn: '18',
    type: 'MEMBER',
  },
  {
    callsign: 'SiYi',
    sqn: '3',
    type: 'MEMBER',
  },
  {
    callsign: 'Slayer',
    sqn: 'HQ',
    type: 'MEMBER',
  },
  {
    callsign: 'Sonic',
    sqn: '18',
    type: 'MEMBER',
  },
  {
    callsign: 'WenJie',
    sqn: '69',
    type: 'MEMBER',
  },
  {
    callsign: 'Threemen',
    sqn: '18',
    type: 'MEMBER',
  },
  {
    callsign: 'Tim',
    sqn: '3',
    type: 'MEMBER',
  },
  {
    callsign: 'Tofu',
    sqn: '18',
    type: 'MEMBER',
  },
  {
    callsign: 'Trickshot',
    sqn: '3',
    type: 'MEMBER',
  },
  {
    callsign: 'Vernon',
    sqn: '69',
    type: 'MEMBER',
  },
  {
    callsign: 'Volley',
    sqn: '3',
    type: 'MEMBER',
  },
  {
    callsign: 'WenYun',
    sqn: '69',
    type: 'MEMBER',
  },
  {
    callsign: 'YanJun',
    sqn: '69',
    type: 'MEMBER',
  },
  {
    callsign: '160',
    sqn: '160',
    type: 'MEMBER',
  },
  {
    callsign: '163',
    sqn: '163',
    type: 'MEMBER',
  },
  {
    callsign: '165',
    sqn: '165',
    type: 'MEMBER',
  },
  {
    callsign: 'ADG',
    sqn: 'ADG',
    type: 'MEMBER',
  },
];

export const ROLES: (Backend.Role & {
  roleInstances: Backend.RoleInstance[];
})[] = [
  {
    name: 'G4 COMD',
    roleInstances: [
      {
        name: 'G4 COMD',
        description: '',
      },
      {
        name: 'G4 COMD Stby',
        description: 'Stby',
      },
    ],
  },
  {
    name: 'G4',
    roleInstances: [
      {
        name: 'G4',
        description: '',
      },
      {
        name: 'G4 Stby',
        description: 'Stby',
      },
    ],
  },
  {
    name: 'A2',
    roleInstances: [
      {
        name: 'A2 AM',
        description: 'AM',
      },
      {
        name: 'A2 PM',
        description: 'PM',
      },
      {
        name: 'A2 AM Stby',
        description: 'AM Stby',
      },
      {
        name: 'A2 PM Stby',
        description: 'PM Stby',
      },
    ],
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
    roles: ['G4 COMD', 'G4'],
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
    roles: [],
  },
  {
    memberId: 18,
    roles: ['A2'],
  },
  {
    memberId: 19,
    roles: ['G4'],
  },
  {
    memberId: 20,
    roles: ['G4 COMD'],
  },
  {
    memberId: 21,
    roles: ['G4 COMD', 'G4'],
  },
  {
    memberId: 22,
    roles: ['G4'],
  },
  {
    memberId: 23,
    roles: ['G4 COMD'],
  },
  {
    memberId: 24,
    roles: ['G4 COMD', 'G4'],
  },
  {
    memberId: 25,
    roles: ['G4'],
  },
  {
    memberId: 26,
    roles: ['G4 COMD'],
  },
  {
    memberId: 27,
    roles: ['G4 COMD', 'G4'],
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
    roles: ['G4 COMD'],
  },
  {
    memberId: 32,
    roles: ['G4 COMD', 'G4'],
  },
  {
    memberId: 33,
    roles: ['G4 COMD'],
  },
  {
    memberId: 34,
    roles: [],
  },
  {
    memberId: 35,
    roles: ['A2'],
  },
  {
    memberId: 36,
    roles: ['A2'],
  },
  {
    memberId: 37,
    roles: ['A2'],
  },
  {
    memberId: 38,
    roles: ['A2'],
  }
];

export const SCHEDULES: Backend.Schedule[] = [
  {
    month: '2022-01-01',
    isPublished: false,
    duties: [
      ...iterateDates(new Date('2022-01-01'), new Date('2022-01-31')),
    ].flatMap((date) =>
      [1, 2, 3, 4, 5, 6, 7, 8].flatMap((roleInstanceId) => [
        {
          roleInstanceId,
          memberId: Math.floor(Math.random() * 38),
          date: dayjs(date).format('YYYY-MM-DD'),
        },
      ])
    ),
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
];
