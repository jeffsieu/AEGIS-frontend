import EmptyHint from '@components/general/empty-hint';
import ScheduleCard from '@components/schedule/ScheduleCard/ScheduleCard';
import { Box, Typography } from '@mui/material';
import { AvailableQualifiedMember, Role, Schedule } from '@typing';
import { ERROR_NO_PUBLISHED_SCHEDULES } from '@utils/constants/string';

export type PlannerPublishedPageProps = {
  schedules: Schedule[];
  onMemberSelected: (
    date: Date,
    role: Role,
    member: AvailableQualifiedMember | null
  ) => void;
};

function PlannerPublishedPageWithAPI() {
  const props: PlannerPublishedPageProps = {
    schedules: [],
    onMemberSelected: (
      date: Date,
      role: Role,
      member: AvailableQualifiedMember | null
    ) => {
      // TODO: Add action
    },
  };
  return <PlannerPublishedPage {...props} />;
}

function PlannerPublishedPage(props: PlannerPublishedPageProps) {
  const { schedules, onMemberSelected } = props;

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
          {...schedule}
          onClick={() => {}}
          onMemberSelected={onMemberSelected}
        />
      ))}
    </Box>
  );
}

export default PlannerPublishedPageWithAPI;
export { PlannerPublishedPage as PlannerPublishedPageWithProps };
