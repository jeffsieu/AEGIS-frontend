import ScheduleTable from '@components/schedule/ScheduleTable/ScheduleTable';
import ScheduleHeader from '@components/schedule/ScheduleHeader/ScheduleHeader';
import { Box, Button, CircularProgress } from '@mui/material';
import {
  RequiredScheduleItemProps,
  ScheduleItemPropsWithoutCallback,
} from '@components/schedule/ScheduleItem/ScheduleItem';
import { AvailableQualifiedMember, Role } from '@typing';
import { useParams } from 'react-router-dom';
import {
  useGetMemberAvailabilitiesForMonthQuery,
  useGetRolesQuery,
  useGetSchedulesForMonthQuery,
} from '@services/backend';
import { scheduleToScheduleTableProps } from '@utils/helpers/schedule';
import EmptyHint from '@components/general/empty-hint';
import { ERROR_NO_SCHEDULE_FOUND } from '@utils/constants/string';

export type PlannerDraftEditorPageProps = {
  startDate: Date;
  endDate: Date;
  roles: Role[];
  scheduleItemsByDay: ScheduleItemPropsWithoutCallback[][];
  onMemberSelected: (
    date: Date,
    role: Role,
    member: AvailableQualifiedMember | null
  ) => void;
};

function PlannerDraftEditorPageWithAPI() {
  const { month } = useParams();
  const { data: schedules, isError } = useGetSchedulesForMonthQuery(month!);
  const { data: roles } = useGetRolesQuery();
  const { data: memberAvailabilities } =
    useGetMemberAvailabilitiesForMonthQuery(month!);

  if (isError) {
    return <EmptyHint>{ERROR_NO_SCHEDULE_FOUND}</EmptyHint>;
  }

  if (
    schedules === undefined ||
    roles === undefined ||
    memberAvailabilities === undefined
  ) {
    return <CircularProgress />;
  }
  const qualifiedMembers = memberAvailabilities.map((member) => {
    return {
      ...member,
      isAvailable: true as const,
    };
  });

  if (schedules.length === 0) return <>No records for {month} found</>;

  const draft = schedules[0];

  const pageProps: PlannerDraftEditorPageProps = {
    ...scheduleToScheduleTableProps(draft, roles, memberAvailabilities),
    // onMemberSelected: (
    //   date: Date,
    //   role: Role,
    //   member: AvailableQualifiedMember | null
    // ) => {
    //   dispatch(assign({ date, role, member }));
    // },
  };

  return <PlannerDraftEditorPage {...pageProps} />;
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

export default PlannerDraftEditorPageWithAPI;
export { PlannerDraftEditorPage as PlannerDraftEditorPageWithProps };
