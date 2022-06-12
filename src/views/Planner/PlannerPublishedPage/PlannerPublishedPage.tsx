import EmptyHint from '@components/general/empty-hint';
import ScheduleCard from '@components/schedule/ScheduleCard/ScheduleCard';
import { Box, Typography } from '@mui/material';
import { AppDispatch, RootState } from '@store';
import { AvailableQualifiedMember, Role, Schedule } from '@typing';
import { ERROR_NO_PUBLISHED_SCHEDULES } from '@utils/constants/string';
import { connect } from 'react-redux';

export type PlannerPublishedPageStateProps = {
  schedules: Schedule[];
};

export type PlannerPublishedPageDispatchProps = {
  onMemberSelected: (
    date: Date,
    role: Role,
    member: AvailableQualifiedMember | null
  ) => void;
};

function mapStateToProps(state: RootState): PlannerPublishedPageStateProps {
  return {
    schedules: [],
  };
}

function mapDispatchToProps(
  dispatch: AppDispatch
): PlannerPublishedPageDispatchProps {
  return {
    onMemberSelected: (
      date: Date,
      role: Role,
      member: AvailableQualifiedMember | null
    ) => {
      // TODO: Add action
    },
  };
}

export type PlannerPublishedPageProps = PlannerPublishedPageStateProps &
  PlannerPublishedPageDispatchProps;

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlannerPublishedPage);
export { PlannerPublishedPage as PlannerPublishedPageWithProps };
