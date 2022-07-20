import { useParams } from 'react-router-dom';
import { useBuildWithApiQueries } from '@utils/helpers/api-builder';
import { scheduleToScheduleTableProps } from '@utils/helpers/schedule';
import {
  useGetMembersQuery,
  useGetRoleInstancesQuery,
  useGetScheduleForMonthQuery,
  useUpdateScheduleMutation,
} from '@services/backend';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PublishedSchedulePage, { PublishedSchedulePageProps } from '@views/Shared/PublishedSchedulePage/PublishedSchedulePage';

function PlannerPublishedSchedulePage() {
  const { month } = useParams();
  const navigate = useNavigate();
  const [updateSchedule] = useUpdateScheduleMutation();
  const [isUnpublishing, setUnpublishing] = useState(false); 

  return useBuildWithApiQueries({
    queries: {
      members: useGetMembersQuery(),
      roleInstances: useGetRoleInstancesQuery(),
      schedule: useGetScheduleForMonthQuery({
        month: month!,
      }),
    },
    onLoad: ({ schedule }) => {
      if (schedule !== null && !schedule.isPublished) {
        navigate(`/planner/schedules/${month}/edit`);
      }
    },
    onSuccess: ({ members, roleInstances, schedule }) => {
      if (schedule === null) return <>No records for {month} found</>;

      const props: PublishedSchedulePageProps = {
        ...scheduleToScheduleTableProps(schedule, roleInstances, members),
        stickyHeader: true,
        onUnpublishClick: async () => {
          setUnpublishing(true);
          await updateSchedule({
            ...schedule,
            isPublished: false,
          }).unwrap();
          setUnpublishing(false);
        },
        isUnpublishing,
        canFilter: true,
        members: members,
      };

      return <PublishedSchedulePage {...props} />;
    },
  });
}

export default PlannerPublishedSchedulePage;