import { ScheduleItemPropsWithoutCallback } from "@components/schedule/ScheduleItem/ScheduleItem";

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

export type Schedule = {
  startDate: Date;
  endDate: Date;
  roles: Role[];
  scheduleItemsByDay: ScheduleItemPropsWithoutCallback[][];
};