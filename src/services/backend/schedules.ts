import { Backend } from '@typing/backend';
import { baseApi } from './base';

export const schedulesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSchedules: builder.query<Backend.Entry<Backend.Schedule>[], void>({
      query: () => 'schedules',
      providesTags: (result) => [
        ...(result ?? []).map(({ month }) => ({
          type: 'Schedules' as const,
          id: month,
        })),
        { type: 'Schedules', id: 'LIST' },
      ],
    }),
    getSchedulesForMonth: builder.query<
      Backend.Entry<Backend.Schedule>[],
      string
    >({
      query: (month) => ({
        url: `schedules/${month}`,
      }),
      providesTags: (result) =>
        result
          ? result.map((schedule) => ({
              type: 'Schedules',
              id: schedule.month,
            }))
          : [],
    }),
    getMonthsToPlan: builder.query<Date[], void>({
      query: () => 'schedules/months',
      providesTags: [{ type: 'Schedules', id: 'LIST' }],
      transformResponse: (response: string[]) =>
        response.map((month) => new Date(month)),
    }),
    addSchedule: builder.mutation<void, Backend.Schedule>({
      query: (schedule) => ({
        url: 'schedules',
        method: 'POST',
        body: schedule,
      }),
      invalidatesTags: [{ type: 'Schedules', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetSchedulesQuery,
  useGetSchedulesForMonthQuery,
  useGetMonthsToPlanQuery,
  useAddScheduleMutation,
} = schedulesApi;
