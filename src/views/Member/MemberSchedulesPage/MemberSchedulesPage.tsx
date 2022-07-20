import { Backend } from '@typing/backend';
import PublishedSchedulesPage, {
  PublishedSchedulesPageWithAPIProps,
} from '@views/Shared/PublishedSchedulesPage/PublishedSchedulesPage';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

function MemberSchedulesPage() {
  const navigate = useNavigate();
  const props: PublishedSchedulesPageWithAPIProps = {
    onScheduleClick: (schedule: Backend.Schedule) => {
      navigate('/schedules/' + dayjs(schedule.month).format('YYYY-MM'));
    },
  };

  return <PublishedSchedulesPage {...props} />;
}

export default MemberSchedulesPage;
