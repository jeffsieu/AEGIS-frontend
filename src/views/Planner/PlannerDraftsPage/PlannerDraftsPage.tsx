import EmptyHint from '@components/general/empty-hint';
import ScheduleCard from '@components/schedule/ScheduleCard/ScheduleCard';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useGetRolesQuery, useGetSchedulesQuery } from '@services/backend';
import { Backend } from '@typing/backend';
import { ERROR_NO_DRAFTS_SCHEDULES } from '@utils/constants/string';
import { scheduleToScheduleTableProps } from '@utils/helpers/schedule';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router';

export type PlannerDraftsPageProps = {
  drafts: Backend.Schedule[];
  roles: Backend.Entry<Backend.Role>[];
  onDraftClick: (draft: Backend.Schedule) => void;
};

function PlannerDraftsPageWithAPI() {
  const { data: schedules } = useGetSchedulesQuery();
  const { data: roles } = useGetRolesQuery();
  const navigate = useNavigate();

  if (schedules === undefined || roles === undefined) {
    return <CircularProgress />;
  }

  const props: PlannerDraftsPageProps = {
    drafts: schedules,
    roles: roles,
    onDraftClick: (draft) => {
      navigate(`/planner/drafts/${dayjs(draft.month).format('YYYY-MM')}`);
    },
  };
  return <PlannerDraftsPage {...props} />;
}

function PlannerDraftsPage(props: PlannerDraftsPageProps) {
  const { drafts, roles, onDraftClick } = props;

  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <Typography variant="h4" gutterBottom>
        Drafts
      </Typography>
      {drafts.length === 0 && (
        <EmptyHint>{ERROR_NO_DRAFTS_SCHEDULES}</EmptyHint>
      )}
      {drafts.map((draft, index) => (
        <div key={index}>
          <ScheduleCard
            {...scheduleToScheduleTableProps(draft, roles)}
            onClick={() => onDraftClick(draft)}
            onMemberSelected={() => {}}
          />
        </div>
      ))}
    </Box>
  );
}

export default PlannerDraftsPageWithAPI;
export { PlannerDraftsPage as PlannerDraftsPageWithProps };
