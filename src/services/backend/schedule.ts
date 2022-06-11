import { Backend } from "@typing/backend";
import { baseApi } from "./base";

export const scheduleApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getSchedule: builder.query<Backend.Schedule[], string>({
			query: (month) => ({
				url: `schedule/${month}`
			})
		})
	})
})

export const { useGetScheduleQuery } = scheduleApi;