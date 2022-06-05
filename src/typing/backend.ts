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
}