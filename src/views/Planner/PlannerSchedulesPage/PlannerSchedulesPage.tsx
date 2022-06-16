import EmptyHint from '@components/general/empty-hint';
import ScheduleCard from '@components/schedule/ScheduleCard/ScheduleCard';
import { Box, Typography } from '@mui/material';
import {
  useGetMembersQuery,
  useGetRolesQuery,
  useGetSchedulesQuery,
} from '@services/backend';
import { Schedule } from '@typing';
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
      const props: PlannerSchedulesPageProps = {
        schedules,
        roles,
        members,
        onScheduleClick: (schedule: Backend.Schedule) => {
          navigate(
            `/planner/published/${dayjs(schedule.month).format('YYYY-MM-DD')}`
          );
        },
      };
      return <PlannerSchedulesPage {...props} />;
    },
  });
}

function PlannerSchedulesPage(props: PlannerSchedulesPageProps) {
  const { roles, members, schedules, onScheduleClick } = props;

  return (
    <Box display="flex" flexDirection="column" alignItems="inherit" gap={4}>
      <Typography variant="h4" gutterBottom>
        Published
      </Typography>
      {schedules.length === 0 && (
        <EmptyHint>{ERROR_NO_PUBLISHED_SCHEDULES}</EmptyHint>
      )}
      {schedules.map((schedule) => (
        <ScheduleCard
          {...scheduleToScheduleTableProps(schedule, roles, members)}
          onClick={() => {
            onScheduleClick(schedule);
          }}
        />
      ))}
    </Box>
  );
}

export default PlannerSchedulesPageWithAPI;
export { PlannerSchedulesPage as PlannerSchedulesPageWithProps };
