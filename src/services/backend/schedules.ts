import dayjs from 'dayjs';
import { Backend } from '@typing/backend';
import { baseApi } from './base';

export type GetSchedulesArgs = {
  isPublished?: boolean;
};

export type GetSchedulesForMonthArgs = GetSchedulesArgs & {
  month: string;
};

export const schedulesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSchedules: builder.query<
      Backend.Entry<Backend.Schedule>[],
      GetSchedulesArgs
    >({
      query: ({ isPublished }) => ({
        url: 'schedules',
        params: isPublished !== undefined ? { isPublished } : undefined,
      }),
      providesTags: (result) => [
        ...(result ?? []).map(({ month }) => ({
          type: 'Schedules' as const,
          id: month,
        })),
        { type: 'Schedules', id: 'LIST' },
      ],
    }),
    getScheduleForMonth: builder.query<
      Backend.Entry<Backend.Schedule> | null,
      GetSchedulesForMonthArgs
    >({
      query: ({ month, isPublished }) => ({
        url: `schedules/${dayjs(month).format('YYYY-MM-DD')}`,
        params: isPublished !== undefined ? { isPublished } : undefined,
      }),
      providesTags: (result) =>
        result
          ? [
              {
                type: 'Schedules',
                id: result.month,
              },
            ]
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
    updateSchedule: builder.mutation<
      void,
      Backend.Schedule & { duties: Backend.Duty[] }
    >({
      query: (schedule) => ({
        url: `schedules/${dayjs(schedule.month).format('YYYY-MM-DD')}`,
        method: 'PUT',
        body: schedule,
      }),
      invalidatesTags: (result, error, { month }) => [
        { type: 'Schedules', id: month },
      ],
    }),
  }),
});

export const {
  useGetSchedulesQuery,
  useGetScheduleForMonthQuery,
  useGetMonthsToPlanQuery,
  useAddScheduleMutation,
  useUpdateScheduleMutation,
} = schedulesApi;
