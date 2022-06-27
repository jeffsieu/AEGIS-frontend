import EmptyHint from '@components/general/empty-hint';
import TitledContainer from '@components/general/titled-container';
import ScheduleCard from '@components/schedule/ScheduleCard/ScheduleCard';
import { Stack } from '@mui/material';
import {
  useGetMembersQuery,
  useGetRolesQuery,
  useGetSchedulesQuery,
} from '@services/backend';
import { Backend } from '@typing/backend';
import { ERROR_NO_PUBLISHED_SCHEDULES } from '@utils/constants/string';
import { useBuildWithApiQueries } from '@utils/helpers/api-builder';
import { scheduleToScheduleTableProps } from '@utils/helpers/schedule';
import dayjs from 'dayjs';

export type PublishedSchedulesPageProps = {
  schedules: Backend.Schedule[];
  roles: Backend.Entry<Backend.Role>[];
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
      roles: useGetRolesQuery(),
      members: useGetMembersQuery(),
    },
    onSuccess: ({ roles, schedules, members }) => {
      const sortedSchedules = [...schedules];
      sortedSchedules.sort((a, b) => {
        return -dayjs(a.month).diff(dayjs(b.month));
      });
      const props: PublishedSchedulesPageProps = {
        schedules: sortedSchedules,
        roles,
        members,
        onScheduleClick,
      };
      return <PublishedSchedulesPage {...props} />;
    },
  });
}

function PublishedSchedulesPage(props: PublishedSchedulesPageProps) {
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
            canFilter={false}
          />
        ))}
      </Stack>
    </TitledContainer>
  );
}

export default PublishedSchedulesPageWithAPI;
export { PublishedSchedulesPage as PublishedSchedulesPageWithProps };
