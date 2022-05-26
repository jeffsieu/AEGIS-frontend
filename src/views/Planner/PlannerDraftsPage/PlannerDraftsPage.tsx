import { useAppDispatch, useAppSelector } from '@store/hooks';
import { assign, getScheduleItemsByDay } from '@store/schedule';
import ScheduleTable from '@components/schedule/ScheduleTable/ScheduleTable';
import ScheduleHeader from '@components/schedule/ScheduleHeader/ScheduleHeader';
import { Box, Button } from '@mui/material';
import { RequiredScheduleItemProps } from '@components/schedule/ScheduleItem/ScheduleItem';
import { AvailableQualifiedMember, QualifiedMember, Role } from '@types';

export type PlannerDraftsPageProps = {};

function PlannerDraftsPage(props: PlannerDraftsPageProps) {
  const dispatch = useAppDispatch();
  const startDate = useAppSelector((state) => state.draft.startDate);
  const endDate = useAppSelector((state) => state.draft.endDate);
  const roles = useAppSelector((state) => state.draft.roles);
  const scheduleItemsByDay = getScheduleItemsByDay(
    useAppSelector((state) => state)
  );

  const totalRequiredItemsCount = scheduleItemsByDay.reduce(
    (acc, dayScheduleItems) =>
      acc + dayScheduleItems.filter(({ isRequired }) => isRequired).length,
    0
  );

  const filledRequiredItemsCount = scheduleItemsByDay.reduce(
    (acc, dayScheduleItems) =>
      acc +
      dayScheduleItems
        .filter((item): item is RequiredScheduleItemProps => item.isRequired)
        .filter(({ assignedMember }) => assignedMember !== null).length,
    0
  );

  const progress = Math.round(
    (filledRequiredItemsCount / totalRequiredItemsCount) * 100
  );

  function onMemberSelected(
    date: Date,
    role: Role,
    member: AvailableQualifiedMember | null
  ) {
    dispatch(assign({ date, role, member }));
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={8}>
      <Box position="absolute" right={0} padding="16px" display="flex" gap={1}>
        <Button variant="outlined">Edit dates</Button>
        <Button
          variant="contained"
          disabled={filledRequiredItemsCount < totalRequiredItemsCount}
        >
          Publish
        </Button>
      </Box>
      <Box sx={{ width: '100%' }}>
        <ScheduleHeader
          startDate={startDate}
          endDate={endDate}
          progress={progress}
        />
      </Box>
      <ScheduleTable
        startDate={startDate}
        endDate={endDate}
        roles={roles}
        scheduleItemsByDay={scheduleItemsByDay}
        onMemberSelected={onMemberSelected}
      />
    </Box>
  );
}

export default PlannerDraftsPage;
