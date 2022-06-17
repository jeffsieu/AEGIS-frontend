import EmptyHint from '@components/general/empty-hint';
import TitledContainer from '@components/general/titled-container';
import ScheduleCard from '@components/schedule/ScheduleCard/ScheduleCard';
import { Box, Stack, Skeleton } from '@mui/material';
import {
  useGetMembersQuery,
  useGetRolesQuery,
  useGetSchedulesQuery,
} from '@services/backend';
import { Backend } from '@typing/backend';
import { ERROR_NO_PUBLISHED_SCHEDULES } from '@utils/constants/string';
import { buildWithApiQueries } from '@utils/helpers/api-builder';
import { scheduleToScheduleTableProps } from '@utils/helpers/schedule';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

export type PlannerSchedulesPageProps = {
  schedules: Backend.Schedule[];
  roles: Backend.Entry<Backend.Role>[];
  members: Backend.Entry<Backend.Member>[];
  onScheduleClick: (schedule: Backend.Schedule) => void;
};

function PlannerSchedulesPageWithAPI() {
  const navigate = useNavigate();

  return buildWithApiQueries({
    queries: {
      schedules: useGetSchedulesQuery({ isPublished: true }),
      roles: useGetRolesQuery(),
      members: useGetMembersQuery(),
    },
    onSuccess: ({ roles, schedules, members }) => {
      const sortedSchedules = [...schedules];
      sortedSchedules.sort((a, b) => {
        return -dayjs(a.month).diff(dayjs(b.month));
      });
      const props: PlannerSchedulesPageProps = {
        schedules: sortedSchedules,
        roles,
        members,
        onScheduleClick: (schedule: Backend.Schedule) => {
          navigate(
            `/planner/published/${dayjs(schedule.month).format('YYYY-MM')}`
          );
        },
      };
      return <PlannerSchedulesPage {...props} />;
    },
    onLoading: () => {
      return (
        <TitledContainer title="Published">
          <Stack spacing={4}>
            <Skeleton variant="rectangular" height={250} />
            <Skeleton variant="rectangular" height={250} />
            <Skeleton variant="rectangular" height={250} />
          </Stack>
        </TitledContainer>
      );
    },
  });
}

function PlannerSchedulesPage(props: PlannerSchedulesPageProps) {
  const { roles, members, schedules, onScheduleClick } = props;

  return (
    <TitledContainer title="Published">
      {schedules.length === 0 && (
        <EmptyHint>{ERROR_NO_PUBLISHED_SCHEDULES}</EmptyHint>
      )}
      <Stack spacing={4}>
        {schedules.map((schedule) => (
          <ScheduleCard
            {...scheduleToScheduleTableProps(schedule, roles, members)}
            onClick={() => {
              onScheduleClick(schedule);
            }}
          />
        ))}
      </Stack>
    </TitledContainer>
  );
}

export default PlannerSchedulesPageWithAPI;
export { PlannerSchedulesPage as PlannerSchedulesPageWithProps };
