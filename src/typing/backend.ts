export namespace Backend {
  export type Date = `${number}-${number}-${number}`;

  export type Duty =
    | {
        memberId?: number;
        roleInstanceId: number;
        date: string;
      } & (
        | {
            id?: never;
          }
        | {
            id: number;
            scheduleId: number;
          }
      );

  export type Schedule = {
    month: string;
    isPublished: boolean;
    duties: Duty[];
  };

  export type Role = {
    name: string;
    roleInstances?: RoleInstance[];
  };

  export type RoleInstance =
    | {
        name: string;
        description: string;
      } & (
        | {
            id?: never;
            role?: never;
            roleId?: never;
          }
        | {
            id: number;
            role: Role;
            roleId: number;
          }
      );

  export type Member = {
    callsign: string;
    sqn: string;
    type: string;
  };

  export type MemberWithAvailability = Member & {
    roles: Entry<Role>[];
    requests: Entry<Request>[];
  };

  export type RequestType = 'Work' | 'Personal';

  export type Request = {
    memberId: number;
    type: RequestType;
    reason: string;
    dates: string[];
  };

  export type Entry<T> = T extends object
    ? {
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
      }
    : T;

  export type WithId<T> = {
    id: number;
  } & T;
}
