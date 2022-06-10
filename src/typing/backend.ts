export namespace Backend {
  export type Duty = {
    callsign: string;
    duty_type: string;
    date: Date;
  };

  export type Schedule = {
    month: Date;
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

  export type Entry<T> = {
    id: number;
    createdAt: string;
    updatedAt: string;
  } & T;
}
