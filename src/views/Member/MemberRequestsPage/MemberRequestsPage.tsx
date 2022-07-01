import { useBuildWithApiQueries } from '@utils/helpers/api-builder';
import EmptyHint from '@components/general/empty-hint';
import RequestsTable from '@components/requests/table/RequestsTable';
import {
  useDeleteRequestsMutation,
  useGetRequestsQuery,
} from '@services/backend';
import { RequestPeriod } from '@typing';
import { ERROR_NO_REQUESTS } from '@utils/constants/string';
import dayjs from 'dayjs';
import TitledContainer from '@components/general/titled-container';
import { Stack } from '@mui/material';
import CreateRequestButton from '@components/requests/form/CreateRequestButton';

export type MemberRequestsPageProps = {
  periods: (RequestPeriod & { id: number; callsign: string })[];
  deleteRequests: (ids: number[]) => Promise<void>;
};

function MemberRequestsPageWithAPI() {
  const [deleteRequests] = useDeleteRequestsMutation();
  return useBuildWithApiQueries({
    queries: {
      periods: useGetRequestsQuery(),
    },
    onSuccess: ({ periods }) => {
      const props: MemberRequestsPageProps = {
        periods: periods.map((period) => ({
          ...period,
          id: period.id,
          startDate: dayjs(period.startDate),
          endDate: dayjs(period.endDate),
          callsign: period.member.callsign,
        })),
        deleteRequests: async (ids) => {
          console.log('deleting', ids);
          deleteRequests(ids);
        },
      };
      return <MemberRequestsPage {...props} />;
    },
  });
}

function MemberRequestsPage(props: MemberRequestsPageProps) {
  const { periods, deleteRequests } = props;

  return (
    <TitledContainer title="Requests">
      <Stack spacing={4}>
        {periods.length === 0 && <EmptyHint>{ERROR_NO_REQUESTS}</EmptyHint>}
        <div>
          <CreateRequestButton />
        </div>
        {periods.length > 0 && (
          <RequestsTable
            onRequestsUpdate={(requests) => {
              console.log(requests);
              const oldRequestIds = periods.map((period) => period.id);
              const newRequestIds = requests.map((request) => request.id);
              const deletedRequestIds = oldRequestIds.filter(
                (id) => !newRequestIds.includes(id)
              );
              console.log(deletedRequestIds);
              deleteRequests(deletedRequestIds);

              // Todo: update requests
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
