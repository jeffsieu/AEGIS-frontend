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
    // dutyCount: number;
    roles: Entry<Role>[];
    requests: Entry<Request>[];
  };

  export type Request = {
    startDate: string;
    endDate: string;
    reason: string;
    memberId: number;
  };

  export type Entry<T> = {
    id: number;
    createdAt: string;
    updatedAt: string;
  } & {
    // If any attribute is an array, it is a list of entries.
    // If it is an object, it is a single entry.
    [K in keyof T]: T[K] extends Array<infer U>
      ? Entry<U>[]
      : T[K] extends object
      ? Entry<T[K]>
      : T[K];
  };
}
