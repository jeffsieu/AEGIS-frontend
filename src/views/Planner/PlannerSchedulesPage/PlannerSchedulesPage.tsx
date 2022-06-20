import { Backend } from '@typing/backend';
import PublishedSchedulesPage, {
  PublishedSchedulesPageWithAPIProps,
} from '@views/Shared/PublishedSchedulesPage/PublishedSchedulesPage';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

function PlannerSchedulesPage() {
  const navigate = useNavigate();

  const props: PublishedSchedulesPageWithAPIProps = {
    onScheduleClick: (schedule: Backend.Schedule) => {
      navigate(
        `/planner/schedules/${dayjs(schedule.month).format('YYYY-MM')}/view`
      );
    },
  };

  return <PublishedSchedulesPage {...props} />;
}

export default PlannerSchedulesPage;
