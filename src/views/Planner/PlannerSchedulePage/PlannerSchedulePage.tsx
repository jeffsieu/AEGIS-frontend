import { useParams } from 'react-router-dom';
import { buildWithApiQueries } from '@utils/helpers/api-builder';
import ScheduleTable, {
  ScheduleTableProps,
} from '@components/schedule/ScheduleTable/ScheduleTable';
import { scheduleToScheduleTableProps } from '@utils/helpers/schedule';
import {
  useGetMembersQuery,
  useGetRolesQuery,
  useGetSchedulesForMonthQuery,
} from '@services/backend';

function PlannerSchedulePageWithAPI() {
  const { month } = useParams();

  return buildWithApiQueries({
    queries: {
      members: useGetMembersQuery(),
      roles: useGetRolesQuery(),
      schedules: useGetSchedulesForMonthQuery({
        month: month!,
        isPublished: true,
      }),
    },
    onSuccess: ({ members, roles, schedules }) => {
      if (schedules.length === 0) return <>No records for {month} found</>;

      const props: PlannerSchedulePageProps = {
        ...scheduleToScheduleTableProps(schedules[0], roles, members),
      };

      return <PlannerSchedulePage {...props} />;
    },
  });
}

export type PlannerSchedulePageProps = ScheduleTableProps;

function PlannerSchedulePage(props: PlannerSchedulePageProps) {
  return (
    <div>
      <ScheduleTable {...props} />
    </div>
  );
}

export default PlannerSchedulePageWithAPI;
export { PlannerSchedulePage as PlannerSchedulePageWithProps };
