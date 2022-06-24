import TitledContainer from '@components/general/titled-container';
import ScheduleCard from '@components/schedule/ScheduleCard/ScheduleCard';
import { ArrowForward } from '@mui/icons-material';
import { Button, Divider, Stack, Typography, useTheme } from '@mui/material';
import {
  useGetMembersQuery,
  useGetRolesQuery,
  useGetScheduleForMonthQuery,
  useGetSchedulesQuery,
} from '@services/backend';
import { useBuildWithApiQueries } from '@utils/helpers/api-builder';
import { scheduleToScheduleTableProps } from '@utils/helpers/schedule';
import ThisMonthSchedule from '@views/Shared/HomePage/ThisMonthSchedule';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

function ThisMonthActions() {
  const navigate = useNavigate();
  return useBuildWithApiQueries({
    queries: {
      schedule: useGetScheduleForMonthQuery({
        month: dayjs().format('YYYY-MM'),
      }),
    },
    onSuccess: ({ schedule }) => {
      if (schedule === null) {
        return <></>;
      }

      if (schedule.isPublished) {
        return (
          <div>
            <Button
              variant="outlined"
              startIcon={<ArrowForward />}
              onClick={() => {
                navigate(
                  `/planner/schedules/${dayjs(schedule.month).format(
                    'YYYY-MM'
                  )}/view`
                );
              }}
            >
              View schedule
            </Button>
          </div>
        );
      } else {
        return (
          <div>
            <Button
              variant="outlined"
              startIcon={<ArrowForward />}
              onClick={() => {
                navigate(
                  `/planner/schedules/${dayjs(schedule.month).format(
                    'YYYY-MM'
                  )}/edit`
                );
              }}
            >
              Continue editing
            </Button>
          </div>
        );
      }
    },
  });
}

function LatestDraft() {
  const theme = useTheme();
  const navigate = useNavigate();
  return useBuildWithApiQueries({
    queries: {
      drafts: useGetSchedulesQuery({
        isPublished: false,
      }),
      roles: useGetRolesQuery(),
      members: useGetMembersQuery(),
    },
    onSuccess: ({ drafts, roles, members }) => {
      const sortedDrafts = drafts.filter((draft) =>
        dayjs(draft.month).isAfter(dayjs(), 'month')
      );
      sortedDrafts.sort((a, b) => {
        return dayjs(a.month).diff(dayjs(b.month), 'month');
      });

      if (sortedDrafts.length === 0) {
        return <div></div>;
      }

      const closestDraft = sortedDrafts[0];

      const scheduleCardProps = scheduleToScheduleTableProps(
        closestDraft,
        roles,
        members
      );

      return (
        <Stack spacing={4}>
          <div></div>
          <Divider />
          <Typography variant="h5" color={theme.palette.text.secondary}>
            Latest draft
          </Typography>
          <ScheduleCard
            {...scheduleCardProps}
            canFilter={false}
            onClick={() => {
              navigate(
                `/planner/schedules/${dayjs(closestDraft.month).format(
                  'YYYY-MM'
                )}/edit`
              );
            }}
          />
        </Stack>
      );
    },
  });
}

function PlannerHomePage() {
  return (
    <TitledContainer title="Home">
      <ThisMonthSchedule showDraft={true} />
      <ThisMonthActions />
      <LatestDraft />
    </TitledContainer>
  );
}

export default PlannerHomePage;
