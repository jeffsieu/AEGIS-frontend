import { useGetScheduleForMonthQuery } from '@services/backend';
import { useBuildWithApiQueries } from '@utils/helpers/api-builder';
import { useNavigate, useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

function PlannerSchedulePageWithAPI() {
  const { month } = useParams();
  const navigate = useNavigate();
  return useBuildWithApiQueries({
    queries: {
      schedule: useGetScheduleForMonthQuery({
        month: month!,
      }),
    },
    onLoad: ({ schedule }) => {
      if (schedule === null) {
        return;
      }
      if (schedule.isPublished) {
        navigate(`/planner/schedules/${month}/view`);
      } else {
        navigate(`/planner/schedules/${month}/edit`);
      }
    },
    onSuccess: ({ schedule }) => {
      if (schedule === null) {
        return <>No records for {month} found</>;
      } else {
        return <CircularProgress />;
      }
    },
  });
}

export default PlannerSchedulePageWithAPI;
