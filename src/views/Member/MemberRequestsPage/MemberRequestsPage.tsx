import { useBuildWithApiQueries } from '@utils/helpers/api-builder';
import EmptyHint from '@components/general/empty-hint';
import RequestsTable from '@components/requests/table/RequestsTable';
import {
  useDeleteRequestsMutation,
  useGetMembersQuery,
  useGetRequestsQuery,
  useUpdateRequestMutation,
} from '@services/backend';
import { RequestPeriod } from '@typing';
import { ERROR_NO_REQUESTS } from '@utils/constants/string';
import dayjs from 'dayjs';
import TitledContainer from '@components/general/titled-container';
import { Stack } from '@mui/material';
import CreateRequestButton from '@components/requests/form/CreateRequestButton';
import { Backend } from '@typing/backend';

export type MemberRequestsPageProps = {
  periods: (RequestPeriod & {
    id: number;
    callsign: string;
  })[];
  members: Backend.Entry<Backend.Member>[];
  deleteRequests: (ids: number[]) => Promise<void>;
  updateRequest: (request: Backend.WithId<Backend.Request>) => Promise<void>;
};

function MemberRequestsPageWithAPI() {
  const [deleteRequests] = useDeleteRequestsMutation();
  const [updateRequest] = useUpdateRequestMutation();

  return useBuildWithApiQueries({
    queries: {
      periods: useGetRequestsQuery(),
      members: useGetMembersQuery(),
    },
    onSuccess: ({ periods, members }) => {
      const props: MemberRequestsPageProps = {
        periods: periods.map((period) => ({
          ...period,
          id: period.id,
          memberId: period.member.id,
          startDate: dayjs(period.startDate),
          endDate: dayjs(period.endDate),
          callsign: period.member.callsign,
        })),
        members,
        deleteRequests: async (ids) => {
          deleteRequests(ids);
        },
        updateRequest: async (request) => {
          updateRequest(request);
        },
      };
      return <MemberRequestsPage {...props} />;
    },
  });
}

function MemberRequestsPage(props: MemberRequestsPageProps) {
  const { periods, members, deleteRequests, updateRequest } = props;

  return (
    <TitledContainer title="Requests">
      <Stack spacing={4}>
        {periods.length === 0 && <EmptyHint>{ERROR_NO_REQUESTS}</EmptyHint>}
        <div>
          <CreateRequestButton />
        </div>
        {periods.length > 0 && (
          <RequestsTable
            members={members}
            onRequestsUpdate={async (requests) => {
              const oldRequestIds = periods.map((period) => period.id);
              const newRequestIds = requests.map((request) => request.id);
              const deletedRequestIds = oldRequestIds.filter(
                (id) => !newRequestIds.includes(id)
              );
              deleteRequests(deletedRequestIds);

              // Get modified requests
              for (const request of requests) {
                const oldRequest = periods.find(
                  (period) => period.id === request.id
                );

                if (oldRequest) {
                  if (
                    oldRequest.callsign !== request.callsign ||
                    oldRequest.startDate.isSame(request.startDate, 'day') ||
                    oldRequest.endDate.isSame(request.endDate, 'day') ||
                    oldRequest.reason !== request.reason ||
                    oldRequest.type !== request.type
                  ) {
                    console.log('updating');
                    const newMemberId = members.find(
                      (member) => member.callsign === request.callsign
                    )!.id;
                    await updateRequest({
                      ...request,
                      startDate: dayjs(request.startDate).format('YYYY-MM-DD'),
                      endDate: dayjs(request.endDate).format('YYYY-MM-DD'),
                      memberId: newMemberId,
                    });
                  }
                }
              }
            }}
            requests={periods.map(({ startDate, endDate, ...rest }) => ({
              startDate: startDate.toDate(),
              endDate: endDate.toDate(),
              ...rest,
            }))}
          />
        )}
      </Stack>
    </TitledContainer>
  );
}

export default MemberRequestsPageWithAPI;
export { MemberRequestsPage as MemberRequestPageWithProps };
