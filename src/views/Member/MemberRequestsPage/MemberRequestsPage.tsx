import EmptyHint from '@components/general/empty-hint';
import RequestsTable from '@components/requests/table/RequestsTable';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useGetRequestsQuery } from '@services/backend';
import { RequestPeriod } from '@typing';
import { ERROR_NO_REQUESTS } from '@utils/constants/string';
import dayjs from 'dayjs';

export type MemberRequestPageProps = {
  periods: (RequestPeriod & { callsign: string })[];
};

function MemberRequestPageWithAPI() {
  const { data: periods } = useGetRequestsQuery();

  if (periods === undefined) {
    return <CircularProgress />;
  }

  const props: MemberRequestPageProps = {
    periods: periods.map((period) => ({
      ...period,
      startDate: dayjs(period.startDate),
      endDate: dayjs(period.endDate),
      callsign: period.member.callsign,
    })),
  };

  return <MemberRequestPage {...props} />;
}

function MemberRequestPage(props: MemberRequestPageProps) {
  const { periods } = props;

  return (
    <Box display="flex" flexDirection="column" alignItems="inherit" gap={4}>
      <Typography variant="h4" gutterBottom>
        Requests
      </Typography>
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
    </Box>
  );
}

export default MemberRequestPageWithAPI;
export { MemberRequestPage as MemberRequestPageWithProps };
