import { ScheduleItemPropsWithoutCallback } from '@components/schedule/ScheduleItem/ScheduleItem';
import { Dayjs } from 'dayjs';
import { Backend } from './backend';

type BaseQualifiedMember = {
  dutyCount: number;
  callsign: string;
};

export type AvailableQualifiedMember = BaseQualifiedMember & {
  isAvailable: true;
};

type Reason = {
	text: string;
	dateSubmitted: string | null;
	isLate: boolean;
	type: Backend.RequestType | null;
};

export type UnavailableQualifiedMember = BaseQualifiedMember & {
  isAvailable: false;
  unavailableReasons: Reason[];
};

export type QualifiedMember =
  | AvailableQualifiedMember
  | UnavailableQualifiedMember;

export type Role = {
  name: string;
};

export type Schedule = {
  startDate: Date;
  endDate: Date;
  roles: Role[];
  scheduleItemsByDay: ScheduleItemPropsWithoutCallback[][];
};

export type RequestPeriod = {
  startDate: Dayjs;
  endDate: Dayjs;
  member: Backend.Entry<Backend.Member>;
  reason: string;
  type: Backend.RequestType;
};
