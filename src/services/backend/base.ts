import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// TODO: Read from config file
export const BACKEND_URL = 'http://localhost:2000';
export const baseApi = createApi({
  reducerPath: 'backendApi',
  tagTypes: ['Members', 'Roles', 'Schedules', 'Requests'],
  baseQuery: fetchBaseQuery({ baseUrl: BACKEND_URL }),
  endpoints: (builder) => ({
    clearData: builder.mutation<void, void>({
      query: () => ({
        url: 'delete',
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useClearDataMutation } = baseApi;
