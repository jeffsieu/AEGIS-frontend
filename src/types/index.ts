type BaseQualifiedMember = {
  dutyCount: number;
  callSign: string;
};

export type AvailableQualifiedMember = BaseQualifiedMember & {
  isAvailable: true;
};

export type UnavailableQualifiedMember = BaseQualifiedMember & {
  isAvailable: false;
  unavailableReason: string;
};

export type QualifiedMember =
  | AvailableQualifiedMember
  | UnavailableQualifiedMember;

export type Role = string;
