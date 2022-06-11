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
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { createMockScheduleItems } from '@utils/mock-data/schedule';
import { useGetScheduleQuery } from '@services/backend';

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

function PlannerDraftEditorPageWithAPI(
  props: PlannerDraftEditorPageDispatchProps
) {
  const { onMemberSelected } = props;

  const { month } = useParams();

  const { data, error, isLoading } = useGetScheduleQuery(month!);

  useEffect(() => console.log(data), [data]);

  if (isLoading) return <>Loading Draft...</>;
  if (error) return <>Error</>;
  if (data === undefined) return <>Error</>;
  if (data !== undefined && data.length <= 0)
    return <>No records for {month} found</>;

  const draft = data[0];

  const date = new Date(draft.month);

  const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
  const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const roles = [{ name: 'A1' }, { name: 'A2' }];

  const pageProps: PlannerDraftEditorPageProps = {
    startDate,
    endDate,
    roles,
    scheduleItemsByDay: createMockScheduleItems(startDate, endDate, roles),
    onMemberSelected,
  };

  return <PlannerDraftEditorPage {...pageProps} />;
}

export default connect(null, mapDispatchToProps)(PlannerDraftEditorPageWithAPI);
export { PlannerDraftEditorPage as PlannerDraftEditorPageWithProps };
