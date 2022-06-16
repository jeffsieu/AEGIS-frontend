import { buildWithApiQueries } from '@utils/helpers/api-builder';
import EmptyHint from '@components/general/empty-hint';
import RequestsTable from '@components/requests/table/RequestsTable';
import { Box, Typography } from '@mui/material';
import { useGetRequestsQuery } from '@services/backend';
import { RequestPeriod } from '@typing';
import { ERROR_NO_REQUESTS } from '@utils/constants/string';
import dayjs from 'dayjs';
import TitledContainer from '@components/general/titled-container';

export type MemberRequestsPageProps = {
  periods: (RequestPeriod & { callsign: string })[];
};

function MemberRequestsPageWithAPI() {
  return buildWithApiQueries({
    queries: {
      periods: useGetRequestsQuery(),
    },
    onSuccess: ({ periods }) => {
      const props: MemberRequestsPageProps = {
        periods: periods.map((period) => ({
          ...period,
          startDate: dayjs(period.startDate),
          endDate: dayjs(period.endDate),
          callsign: period.member.callsign,
        })),
      };
      return <MemberRequestsPage {...props} />;
    },
  });
}

function MemberRequestsPage(props: MemberRequestsPageProps) {
  const { periods } = props;

  return (
    <TitledContainer title="Requests">
      {periods.length === 0 && <EmptyHint>{ERROR_NO_REQUESTS}</EmptyHint>}
      {periods.length > 0 && (
        <RequestsTable
          requests={periods.map(({ reason, startDate, endDate, callsign }) => ({
            reason,
            dates: [[startDate.toDate(), endDate.toDate()]],
            callsign,
          }))}
        />
      )}
    </TitledContainer>
  );
}

export default MemberRequestsPageWithAPI;
export { MemberRequestsPage as MemberRequestPageWithProps };
