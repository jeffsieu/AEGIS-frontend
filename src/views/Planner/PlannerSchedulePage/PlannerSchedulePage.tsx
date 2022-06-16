import { useParams } from 'react-router-dom';
import { buildWithApiQueries } from '@utils/helpers/api-builder';
import ScheduleTable, {
  ScheduleTableProps,
} from '@components/schedule/ScheduleTable/ScheduleTable';
import { scheduleToScheduleTableProps } from '@utils/helpers/schedule';
import {
  useGetMembersQuery,
  useGetRolesQuery,
  useGetSchedulesForMonthQuery,
} from '@services/backend';
import { dateRangeToString } from '@utils/helpers/dateRange';
import { Box, Typography } from '@mui/material';
import FullWidthScheduleContainer from '@components/schedule/FullWidthScheduleContainer/FullWidthScheduleContainer';

function PlannerSchedulePageWithAPI() {
  const { month } = useParams();

  return buildWithApiQueries({
    queries: {
      members: useGetMembersQuery(),
      roles: useGetRolesQuery(),
      schedules: useGetSchedulesForMonthQuery({
        month: month!,
        isPublished: true,
      }),
    },
    onSuccess: ({ members, roles, schedules }) => {
      if (schedules.length === 0) return <>No records for {month} found</>;

      const props: PlannerSchedulePageProps = {
        ...scheduleToScheduleTableProps(schedules[0], roles, members),
        stickyHeader: true,
      };

      return <PlannerSchedulePage {...props} />;
    },
  });
}

export type PlannerSchedulePageProps = ScheduleTableProps;

function PlannerSchedulePage(props: PlannerSchedulePageProps) {
  const title = dateRangeToString([props.startDate, props.endDate], 'MMM YYYY');

  return (
    <Box
      display="flex"
      position="relative"
      flexDirection="column"
      alignItems="center"
      gap={8}
    >
      <Typography variant="h3">{title}</Typography>
      <FullWidthScheduleContainer>
        <ScheduleTable {...props} />
      </FullWidthScheduleContainer>
    </Box>
  );
}

export default PlannerSchedulePageWithAPI;
export { PlannerSchedulePage as PlannerSchedulePageWithProps };
