import EmptyHint from '@components/general/empty-hint';
import FullWidthScheduleContainer from '@components/schedule/FullWidthScheduleContainer/FullWidthScheduleContainer';
import ScheduleTable from '@components/schedule/ScheduleTable/ScheduleTable';
import { Box, Chip, Stack, Typography, useTheme } from '@mui/material';
import {
  useGetMembersQuery,
  useGetRolesQuery,
  useGetScheduleForMonthQuery,
} from '@services/backend';
import { ERROR_SCHEDULE_NOT_READY } from '@utils/constants/string';
import { useBuildWithApiQueries } from '@utils/helpers/api-builder';
import { scheduleToScheduleTableProps } from '@utils/helpers/schedule';
import dayjs from 'dayjs';

export type ThisMonthScheduleProps = {
  showDraft: boolean;
};

function ThisMonthSchedule(props: ThisMonthScheduleProps) {
  const { showDraft } = props;
  const theme = useTheme();

  return useBuildWithApiQueries({
    queries: {
      schedule: useGetScheduleForMonthQuery({
        month: dayjs().format('YYYY-MM'),
        isPublished: showDraft ? undefined : true,
      }),
      roles: useGetRolesQuery(),
      members: useGetMembersQuery(),
    },
    onSuccess: ({ schedule, roles, members }) => {
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
          gap={2}
        >
          <Stack width="100%" alignItems="start" spacing={2}>
            <div>
              <Typography variant="h5" color={theme.palette.text.secondary}>
                This month
              </Typography>
              <Typography variant="h4">
                {dayjs(schedule.month).format('MMM YYYY')}
              </Typography>
            </div>
            <Chip
              label={schedule.isPublished ? 'Published' : 'Draft'}
              variant="outlined"
              color={schedule.isPublished ? 'primary' : undefined}
            />
          </Stack>
          <FullWidthScheduleContainer>
            <Box paddingLeft="calc(50vw - 600px + 24px - 36px)">
              <ScheduleTable {...props} stickyHeader={true} canFilter={true} />
            </Box>
          </FullWidthScheduleContainer>
        </Box>
      );
    },
  });
}

export default ThisMonthSchedule;
