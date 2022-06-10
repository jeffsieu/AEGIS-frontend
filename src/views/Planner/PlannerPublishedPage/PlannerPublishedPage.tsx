import EmptyHint from '@components/general/empty-hint';
import ScheduleTable from '@components/schedule/ScheduleTable/ScheduleTable';
import { Box, Card, CardActionArea, Typography, useTheme } from '@mui/material';
import { AppDispatch, RootState } from '@store';
import { AvailableQualifiedMember, Role, Schedule } from '@typing';
import { ERROR_NO_PUBLISHED_SCHEDULES } from '@utils/constants/string';
import { dateRangeToString } from '@utils/helpers/dateRange';
import { getCardColor } from '@utils/theme';
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
    schedules: state.published.schedules,
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

  const theme = useTheme();
  const cardColor = getCardColor(theme);

  return (
    <Box display="flex" flexDirection="column" alignItems="inherit" gap={4}>
      <Typography variant="h4" gutterBottom>
        Published
      </Typography>
      {schedules.length === 0 && (
        <EmptyHint>{ERROR_NO_PUBLISHED_SCHEDULES}</EmptyHint>
      )}
      {schedules.map((schedule) => (
        <div>
          <Card variant="outlined" sx={{ backgroundColor: cardColor }}>
            <CardActionArea>
              <Box
                p={2}
                sx={{
                  overflowX: 'clip',
                  maskImage: 'linear-gradient(90deg, #000 60%, transparent);',
                  pointerEvents: 'none',
                }}
              >
                <Typography
                  variant="h5"
                  color={theme.palette.text.secondary}
                  gutterBottom
                >
                  {dateRangeToString(
                    [schedule.startDate, schedule.endDate],
                    'MMM YYYY'
                  )}
                </Typography>
                <ScheduleTable
                  {...schedule}
                  onMemberSelected={onMemberSelected}
                />
              </Box>
            </CardActionArea>
          </Card>
        </div>
      ))}
    </Box>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlannerPublishedPage);
export { PlannerPublishedPage as PlannerPublishedPageWithProps };
