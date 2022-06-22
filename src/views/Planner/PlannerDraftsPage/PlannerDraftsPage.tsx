import EmptyHint from '@components/general/empty-hint';
import TitledContainer from '@components/general/titled-container';
import ScheduleCard from '@components/schedule/ScheduleCard/ScheduleCard';
import { Add } from '@mui/icons-material';
import { Button, Stack } from '@mui/material';
import {
  useGetMembersQuery,
  useGetRolesQuery,
  useGetSchedulesQuery,
} from '@services/backend';
import { Backend } from '@typing/backend';
import { ERROR_NO_DRAFTS_SCHEDULES } from '@utils/constants/string';
import { useBuildWithApiQueries } from '@utils/helpers/api-builder';
import { scheduleToScheduleTableProps } from '@utils/helpers/schedule';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

export type PlannerDraftsPageProps = {
  drafts: Backend.Schedule[];
  roles: Backend.Entry<Backend.Role>[];
  members: Backend.Entry<Backend.Member>[];
  onDraftClick: (draft: Backend.Schedule) => void;
  onNewDraftClick: () => void;
};

function PlannerDraftsPageWithAPI() {
  const navigate = useNavigate();

  return useBuildWithApiQueries({
    queries: {
      schedules: useGetSchedulesQuery({ isPublished: false }),
      roles: useGetRolesQuery(),
      members: useGetMembersQuery(),
    },
    onSuccess: ({ schedules, roles, members }) => {
      const sortedSchedules = [...schedules];
      sortedSchedules.sort((a, b) => {
        return -dayjs(a.month).diff(dayjs(b.month));
      });
      const props: PlannerDraftsPageProps = {
        drafts: sortedSchedules,
        roles: roles,
        members: members,
        onDraftClick: (draft) => {
          navigate(
            `/planner/schedules/${dayjs(draft.month).format('YYYY-MM')}/edit`
          );
        },
        onNewDraftClick: () => {
          navigate('/planner/new-plan');
        },
      };
      return <PlannerDraftsPage {...props} />;
    },
  });
}

function PlannerDraftsPage(props: PlannerDraftsPageProps) {
  const { drafts, roles, members, onDraftClick, onNewDraftClick } = props;

  return (
    <TitledContainer title="Drafts">
      <Stack spacing={4}>
        <div>
          <Button
            variant="outlined"
            startIcon={<Add />}
            onClick={onNewDraftClick}
          >
            New draft
          </Button>
        </div>
        {drafts.length === 0 && (
          <EmptyHint>{ERROR_NO_DRAFTS_SCHEDULES}</EmptyHint>
        )}
        {drafts.map((draft, index) => (
          <div key={index}>
            <ScheduleCard
              {...scheduleToScheduleTableProps(draft, roles, members)}
              canFilter={false}
              onClick={() => onDraftClick(draft)}
            />
          </div>
        ))}
      </Stack>
    </TitledContainer>
  );
}

export default PlannerDraftsPageWithAPI;
export { PlannerDraftsPage as PlannerDraftsPageWithProps };
