import { RawSchedule } from "@typing";
import { APIEndpointBuilder } from "./api";

export const getScheduleByMonth = (builder: APIEndpointBuilder) => 
	builder.query<RawSchedule[], string>({
		query: (month) => `/schedules/${month}`
	})

