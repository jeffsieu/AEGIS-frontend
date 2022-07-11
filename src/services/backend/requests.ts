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
      onQueryStarted(requestIds, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          requestsApi.util.updateQueryData(
            'getRequests',
            undefined,
            (requests: RequestResponse[]) => {
              // Mutate list
              requestIds.forEach((id) => {
                const index = requests.findIndex((r) => r.id === id);
                if (index !== -1) {
                  requests.splice(index, 1);
                }
              });
            }
          )
        );
        queryFulfilled.catch(patchResult.undo);
      },
    }),
    updateRequest: builder.mutation<void, Backend.WithId<Backend.Request>>({
      query: (request) => ({
        url: `requests/${request.id}`,
        method: 'PUT',
        body: request,
      }),
      invalidatesTags: [{ type: 'Requests', id: 'LIST' }],
      onQueryStarted({ id, ...request }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          requestsApi.util.updateQueryData(
            'getRequests',
            undefined,
            (requests: RequestResponse[]) => {
              // Mutate list
              const index = requests.findIndex((r) => r.id === id);

              if (index !== -1) {
                requests[index] = {
                  ...requests[index],
                  ...request,
                };
              }
            }
          )
        );
        queryFulfilled.catch(patchResult.undo);
      },
    }),
  }),
});

export const {
  useAddRequestsMutation,
  useDeleteRequestsMutation,
  useGetRequestsQuery,
  useGetRequestsForMemberQuery,
  useUpdateRequestMutation,
} = requestsApi;
