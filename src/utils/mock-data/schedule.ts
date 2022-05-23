import { QualifiedMember } from '@types';

export const MOCK_QUALIFIED_MEMBERS: QualifiedMember[] = [
  {
    dutyCount: 1,
    callSign: 'Alpha',
    isAvailable: true,
  },
  {
    dutyCount: 2,
    callSign: 'Bravo',
    isAvailable: true,
  },
  {
    dutyCount: 10,
    callSign: 'Charlie',
    isAvailable: false,
    unavailableReason: 'Too busy',
  },
];
