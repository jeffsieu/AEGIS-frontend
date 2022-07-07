import EmptyHint from '@components/general/empty-hint';
import FullWidthScheduleContainer from '@components/schedule/FullWidthScheduleContainer/FullWidthScheduleContainer';
import ScheduleTable from '@components/schedule/ScheduleTable/ScheduleTable';
import ScheduleSelectMember, {
  ScheduleSelectOption,
} from '@components/schedule/ScheduleSelectMember/ScheduleSelectMember';
import { Box, Chip, Stack, Typography, useTheme } from '@mui/material';
import {
  useGetMembersQuery,
  useGetRoleInstancesQuery,
  useGetScheduleForMonthQuery,
} from '@services/backend';
import { ERROR_SCHEDULE_NOT_READY } from '@utils/constants/string';
import { useBuildWithApiQueries } from '@utils/helpers/api-builder';
import { scheduleToScheduleTableProps } from '@utils/helpers/schedule';
import dayjs from 'dayjs';
import { useState } from 'react';

export type ThisMonthScheduleProps = {
  showDraft: boolean;
};

function ThisMonthSchedule(props: ThisMonthScheduleProps) {
  const { showDraft } = props;
  const theme = useTheme();

  // handles change in selected member to display on schedule
  const [selectedMembers, setSelectedMembers] = useState<
    ScheduleSelectOption[]
  >([]);
  const handleSelectedMembersChange = (newMembers: ScheduleSelectOption[]) => {
    setSelectedMembers(newMembers);
  };

  return useBuildWithApiQueries({
    queries: {
      schedule: useGetScheduleForMonthQuery({
        month: dayjs().format('YYYY-MM'),
        isPublished: showDraft ? undefined : true,
      }),
      roleInstances: useGetRoleInstancesQuery(),
      members: useGetMembersQuery(),
    },
    onSuccess: ({ schedule, roleInstances, members }) => {
      if (schedule === null) {
        return <EmptyHint>{ERROR_SCHEDULE_NOT_READY}</EmptyHint>;
      }

      const props = scheduleToScheduleTableProps(
        schedule,
        roleInstances,
        members
      );

      return (
        <Box
          display="flex"
          position="relative"
          flexDirection="column"
          alignItems="center"
          gap={4}
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
          <Box display="flex" flexDirection="column" width="100%">
            <ScheduleSelectMember
              members={members}
              selectedMembers={selectedMembers}
              onSelectedMembersChange={handleSelectedMembersChange}
            />
          </Box>
          <FullWidthScheduleContainer>
            <Box paddingLeft="calc(50vw - 600px + 24px - 36px)">
              <ScheduleTable
                {...props}
                stickyHeader={true}
                canFilter={true}
                selectedMembers={
                  selectedMembers.length > 0 ? selectedMembers : undefined
                }
              />
            </Box>
          </FullWidthScheduleContainer>
        </Box>
      );
    },
  });
}

export default ThisMonthSchedule;
