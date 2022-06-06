import { assign, getScheduleItemsByDay } from '@store/schedule/draft';
import ScheduleTable from '@components/schedule/ScheduleTable/ScheduleTable';
import ScheduleHeader from '@components/schedule/ScheduleHeader/ScheduleHeader';
import { Box, Button } from '@mui/material';
import {
  RequiredScheduleItemProps,
  ScheduleItemPropsWithoutCallback,
} from '@components/schedule/ScheduleItem/ScheduleItem';
import { AvailableQualifiedMember, Role } from '@typing';
import { AppDispatch, RootState } from '@store';
import { connect } from 'react-redux';

export type PlannerDraftEditorPageStateProps = {
  startDate: Date;
  endDate: Date;
  roles: Role[];
  scheduleItemsByDay: ScheduleItemPropsWithoutCallback[][];
};

export type PlannerDraftEditorPageDispatchProps = {
  onMemberSelected: (
    date: Date,
    role: Role,
    member: AvailableQualifiedMember | null
  ) => void;
};

export type PlannerDraftEditorPageProps = PlannerDraftEditorPageStateProps &
  PlannerDraftEditorPageDispatchProps;

function mapStateToProps(state: RootState): PlannerDraftEditorPageStateProps {
  const startDate = state.draft.startDate;
  const endDate = state.draft.endDate;
  const roles = state.draft.roles;
  const scheduleItemsByDay = getScheduleItemsByDay(state);

  return {
    startDate,
    endDate,
    roles,
    scheduleItemsByDay,
  };
}

function mapDispatchToProps(
  dispatch: AppDispatch
): PlannerDraftEditorPageDispatchProps {
  return {
    onMemberSelected: (
      date: Date,
      role: Role,
      member: AvailableQualifiedMember | null
    ) => {
      dispatch(assign({ date, role, member }));
    },
  };
}

function PlannerDraftEditorPage(props: PlannerDraftEditorPageProps) {
  const { startDate, endDate, roles, scheduleItemsByDay, onMemberSelected } =
    props;

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

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={8}>
      <Box position="absolute" right={0} display="flex" gap={1}>
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

export default connect(mapStateToProps, mapDispatchToProps)(PlannerDraftEditorPage);
export { PlannerDraftEditorPage as PlannerDraftEditorPageWithProps };
