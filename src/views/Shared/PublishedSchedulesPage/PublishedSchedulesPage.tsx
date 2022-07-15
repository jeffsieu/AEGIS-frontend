import EmptyHint from '@components/general/empty-hint';
import TitledContainer from '@components/general/titled-container';
import ScheduleCard from '@components/schedule/ScheduleCard/ScheduleCard';
import { Stack } from '@mui/material';
import {
  useGetMembersQuery,
  useGetRoleInstancesQuery,
  useGetSchedulesQuery,
} from '@services/backend';
import { Backend } from '@typing/backend';
import { ERROR_NO_PUBLISHED_SCHEDULES } from '@utils/constants/string';
import { useBuildWithApiQueries } from '@utils/helpers/api-builder';
import { scheduleToScheduleTableProps } from '@utils/helpers/schedule';
import dayjs from 'dayjs';

export type PublishedSchedulesPageProps = {
  schedules: Backend.Schedule[];
  roleInstances: Backend.Entry<Backend.RoleInstance>[];
  members: Backend.Entry<Backend.Member>[];
  onScheduleClick: (schedule: Backend.Schedule) => void;
};

export type PublishedSchedulesPageWithAPIProps = {
  onScheduleClick: (schedule: Backend.Schedule) => void;
};

function PublishedSchedulesPageWithAPI(
  props: PublishedSchedulesPageWithAPIProps
) {
  const { onScheduleClick } = props;

  return useBuildWithApiQueries({
    queries: {
      schedules: useGetSchedulesQuery({ isPublished: true }),
      roleInstances: useGetRoleInstancesQuery(),
      members: useGetMembersQuery(),
    },
    onSuccess: ({ roleInstances, schedules, members }) => {
      const sortedSchedules = [...schedules];
      sortedSchedules.sort((a, b) => {
        return -dayjs(a.month).diff(dayjs(b.month));
      });
      const props: PublishedSchedulesPageProps = {
        schedules: sortedSchedules,
        roleInstances,
        members,
        onScheduleClick,
      };
      return <PublishedSchedulesPage {...props} />;
    },
  });
}

function PublishedSchedulesPage(props: PublishedSchedulesPageProps) {
  const { roleInstances: roles, members, schedules, onScheduleClick } = props;

  return (
    <TitledContainer title="Published">
      {schedules.length === 0 && (
        <EmptyHint>{ERROR_NO_PUBLISHED_SCHEDULES}</EmptyHint>
      )}
      <Stack spacing={4}>
        {schedules.map((schedule, i) => (
          <ScheduleCard
            {...scheduleToScheduleTableProps(schedule, roles, members)}
            onClick={() => {
              onScheduleClick(schedule);
            }}
            canFilter={false}
            key={i}
          />
        ))}
      </Stack>
    </TitledContainer>
  );
}

export default PublishedSchedulesPageWithAPI;
export { PublishedSchedulesPage as PublishedSchedulesPageWithProps };
