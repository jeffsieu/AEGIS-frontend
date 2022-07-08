import { useParams } from 'react-router-dom';
import { useBuildWithApiQueries } from '@utils/helpers/api-builder';
import ScheduleTable, {
  ScheduleTableProps,
} from '@components/schedule/ScheduleTable/ScheduleTable';
import { scheduleToScheduleTableProps } from '@utils/helpers/schedule';
import {
  useGetMembersQuery,
  useGetRoleInstancesQuery,
  useGetScheduleForMonthQuery,
  useUpdateScheduleMutation,
} from '@services/backend';
import { Box, Divider, Stack, Typography, useTheme, SelectChangeEvent } from '@mui/material';
import FullWidthScheduleContainer from '@components/schedule/FullWidthScheduleContainer/FullWidthScheduleContainer';
import ScheduleSelectMember from '@components/schedule/ScheduleSelectMember/ScheduleSelectMember';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScheduleHeader from '@components/schedule/ScheduleHeader/ScheduleHeader';
import { AsyncButton } from '@components/general/async-button';
import { InfoOutlined, ModeEdit } from '@mui/icons-material';
import PaperTooltip from '@components/tooltips/PaperTooltip';
import { Backend } from '@typing/backend';

function PlannerPublishedSchedulePageWithAPI() {
  const { month } = useParams();
  const navigate = useNavigate();
  const [updateSchedule] = useUpdateScheduleMutation();
  const [isUnpublishing, setUnpublishing] = useState(false);


  return useBuildWithApiQueries({
    queries: {
      members: useGetMembersQuery(),
      roleInstances: useGetRoleInstancesQuery(),
      schedule: useGetScheduleForMonthQuery({
        month: month!,
      }),
    },
    onLoad: ({ schedule }) => {
      if (schedule !== null && !schedule.isPublished) {
        navigate(`/planner/schedules/${month}/edit`);
      }
    },
    onSuccess: ({ members, roleInstances, schedule }) => {
      if (schedule === null) return <>No records for {month} found</>;

      const props: PlannerPublishedSchedulePageProps = {
        ...scheduleToScheduleTableProps(schedule, roleInstances, members),
        stickyHeader: true,
        onUnpublishClick: async () => {
          setUnpublishing(true);
          await updateSchedule({
            ...schedule,
            isPublished: false,
          }).unwrap();
          setUnpublishing(false);
        },
        isUnpublishing,
        canFilter: true,
        members: members
      };

      return <PlannerPublishedSchedulePage {...props} />;
    },
  });
}

export type PlannerPublishedSchedulePageProps = ScheduleTableProps & {
  onUnpublishClick: () => Promise<void>;
  isUnpublishing: boolean;
  members: Backend.Entry<Backend.Member & {
    roles: Backend.Role[];
  }>[];
};

function PlannerPublishedSchedulePage(
  props: PlannerPublishedSchedulePageProps
) {
  const theme = useTheme();
  const { startDate, endDate, onUnpublishClick, isUnpublishing, members } = props;

  // handles change in selected member to display on schedule
  const [ selectedMember, setSelectedMember ] = useState<string | undefined>('');
  const handleSelectedMemberChange = (event: SelectChangeEvent) => {
    setSelectedMember(event.target.value);
  };
  
  return (
    <Stack spacing={4}>
      <Box position="relative">
        <ScheduleHeader
          startDate={startDate}
          endDate={endDate}
          isPublished={true}
        />
        <Box
          position="absolute"
          top={0}
          right={0}
          display="flex"
          flexDirection="column"
          alignItems="end"
        >
          <PaperTooltip
            placement="right"
            title={
              <Box display="flex" alignItems="center" gap={1}>
                <InfoOutlined
                  fontSize="small"
                  htmlColor={theme.palette.text.secondary}
                />
                <Typography color={theme.palette.text.secondary}>
                  Schedule will be unpublished
                </Typography>
              </Box>
            }
          >
            <div>
              <AsyncButton
                startIcon={<ModeEdit />}
                loading={isUnpublishing}
                variant="outlined"
                asyncRequest={onUnpublishClick}
              >
                Edit/Delete
              </AsyncButton>
            </div>
          </PaperTooltip>
        </Box>
      </Box>
      <ScheduleSelectMember members={members} selectedMember={selectedMember} handleSelectedMemberChange={handleSelectedMemberChange} />
      <Divider />
      <Box
        display="flex"
        position="relative"
        flexDirection="column"
        alignItems="center"
      >
        <FullWidthScheduleContainer>
          <ScheduleTable {...props} selectedMember={selectedMember} />
        </FullWidthScheduleContainer>
      </Box>
    </Stack>
  );
}

export default PlannerPublishedSchedulePageWithAPI;
export { PlannerPublishedSchedulePage as PlannerPublishedSchedulePageWithProps };
