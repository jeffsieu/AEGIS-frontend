import ScheduleTable from '@components/schedule/ScheduleTable/ScheduleTable';
import { Typography } from '@mui/material';
import { AppDispatch, RootState } from '@store';
import { AvailableQualifiedMember, Schedule } from '@typing';
import { dateRangeToString } from '@utils/helpers/dateRange';
import { connect } from 'react-redux';

export type PlannerPublishedPageStateProps = {
  schedules: Schedule[];
}

export type PlannerPublishedPageDispatchProps = {
  onMemberSelected: (date: Date, role: string, member: AvailableQualifiedMember | null) => void;
};

function mapStateToProps(state: RootState): PlannerPublishedPageStateProps {
  return {
    schedules: state.published.schedules,
  };
}

function mapDispatchToProps(dispatch: AppDispatch): PlannerPublishedPageDispatchProps {
  return {
    onMemberSelected: (date: Date, role: string, member: AvailableQualifiedMember | null) => {
    }
  }
}

export type PlannerPublishedPageProps = PlannerPublishedPageStateProps & PlannerPublishedPageDispatchProps;

function PlannerPublishedPage(props: PlannerPublishedPageProps) {
  const { schedules, onMemberSelected } = props;

  return (
    <div>
      <Typography variant="h4">Published</Typography>
      {
        schedules.map(schedule => (
          <>
            <Typography variant="h5">{dateRangeToString([schedule.startDate, schedule.endDate], 'MMM YYYY')} </Typography>
            <ScheduleTable {...schedule} onMemberSelected={onMemberSelected}/>
          </>
        ))
      }
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(PlannerPublishedPage);
export { PlannerPublishedPage as PlannerPublishedPageWithProps };
