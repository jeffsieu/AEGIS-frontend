import EmptyHint from '@components/general/empty-hint';
import { Box, Typography } from '@mui/material';
import { AppDispatch, RootState } from '@store';
import { ERROR_NO_DRAFTS_SCHEDULES } from '@utils/constants/string';
import { connect } from 'react-redux';

export type PlannerDraftsPageStateProps = {};
export type PlannerDraftsPageDispatchProps = {};

export type PlannerDraftsPageProps = PlannerDraftsPageStateProps &
  PlannerDraftsPageDispatchProps;

function mapStateToProps(state: RootState): PlannerDraftsPageStateProps {
  return {};
}

function mapDispatchToProps(
  dispatch: AppDispatch
): PlannerDraftsPageDispatchProps {
  return {};
}

function PlannerDraftsPage(props: PlannerDraftsPageProps) {
  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <Typography variant="h4" gutterBottom>
        Drafts
      </Typography>
      <EmptyHint>{ERROR_NO_DRAFTS_SCHEDULES}</EmptyHint>
    </Box>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(PlannerDraftsPage);
export { PlannerDraftsPage as PlannerDraftsPageWithProps };
