import { Backend } from '@typing/backend';
import { baseApi } from './base';

export type RequestResponse = Backend.Entry<Backend.Request> & {
  member: Backend.Entry<Backend.Member>;
};

export const requestsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addRequests: builder.mutation<void, Backend.Request[]>({
      query: (requests) => ({
        url: 'requests/batch',
        method: 'POST',
        body: requests,
      }),
      invalidatesTags: [{ type: 'Requests', id: 'LIST' }],
    }),
    getRequestsForMember: builder.query<RequestResponse[], number>({
      query: (memberId) => ({
        url: 'requests',
        params: {
          memberId: memberId,
        },
      }),
      providesTags: (result) => [
        ...(result ?? []).map(({ id }) => ({
          type: 'Requests' as const,
          id,
        })),
        { type: 'Requests', id: 'LIST' },
      ],
    }),
    getRequests: builder.query<RequestResponse[], void>({
      query: () => 'requests',
      providesTags: (result) => [
        ...(result ?? []).map(({ id }) => ({
          type: 'Requests' as const,
          id,
        })),
        { type: 'Requests', id: 'LIST' },
      ],
    }),
    deleteRequests: builder.mutation<void, number[]>({
      query: (requestIds) => ({
        url: 'requests/batch/',
        method: 'DELETE',
        body: requestIds,
      }),
      invalidatesTags: [{ type: 'Requests', id: 'LIST' }],
    }),
  }),
});

export const {
  useAddRequestsMutation,
  useDeleteRequestsMutation,
  useGetRequestsQuery,
  useGetRequestsForMemberQuery,
} = requestsApi;
