import EmptyHint from '@components/general/empty-hint';
import TitledContainer from '@components/general/titled-container';
import FullWidthScheduleContainer from '@components/schedule/FullWidthScheduleContainer/FullWidthScheduleContainer';
import ScheduleTable from '@components/schedule/ScheduleTable/ScheduleTable';
import { Box, Typography } from '@mui/material';
import {
  useGetMembersQuery,
  useGetRolesQuery,
  useGetScheduleForMonthQuery,
} from '@services/backend';
import { ERROR_SCHEDULE_NOT_READY } from '@utils/constants/string';
import { useBuildWithApiQueries } from '@utils/helpers/api-builder';
import { scheduleToScheduleTableProps } from '@utils/helpers/schedule';
import dayjs from 'dayjs';

function MemberHomePage() {
  return useBuildWithApiQueries({
    queries: {
      schedule: useGetScheduleForMonthQuery({
        month: dayjs().format('YYYY-MM'),
        isPublished: true,
      }),
      roles: useGetRolesQuery(),
      members: useGetMembersQuery(),
    },
    onSuccess: ({ schedule, roles, members }) => {
      const getScheduleComponent = () => {
        if (schedule === null) {
          return <EmptyHint>{ERROR_SCHEDULE_NOT_READY}</EmptyHint>;
        }

        const props = scheduleToScheduleTableProps(schedule, roles, members);
        return (
          <Box
            display="flex"
            position="relative"
            flexDirection="column"
            alignItems="center"
          >
            <FullWidthScheduleContainer>
              <Box paddingLeft="calc(50vw - 600px + 24px - 36px)">
                <ScheduleTable {...props} stickyHeader={true} />
              </Box>
            </FullWidthScheduleContainer>
          </Box>
        );
      };

      return (
        <TitledContainer title="Home">
          <Typography variant="h5" gutterBottom>
            This month
          </Typography>
          {getScheduleComponent()}
        </TitledContainer>
      );
    },
  });
}

export default MemberHomePage;
