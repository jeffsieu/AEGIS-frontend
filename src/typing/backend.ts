export namespace Backend {
  export type Date = `${number}-${number}-${number}`;

  export type Duty = {
    memberId?: number;
    roleId: number;
    // scheduleId: number;
    date: string;
  };

  export type Schedule = {
    month: string;
    isPublished: boolean;
    duties: Duty[];
  };

  export type Role = {
    name: string;
  };

  export type Member = {
    callsign: string;
    squadron: string;
    type: string;
  };

  export type MemberWithAvailability = Member & {
    dutyCount: number;
    roles: Entry<Role>[];
  };

  export type Entry<T> = {
    id: number;
    createdAt: string;
    updatedAt: string;
  } & T;
}
