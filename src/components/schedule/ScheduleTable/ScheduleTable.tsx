import { Box } from '@mui/material';
import { useMemo } from 'react';
import ScheduleColumns from '../ScheduleColumns/ScheduleColumns';
import ScheduleRowHeaders from '../ScheduleRowHeaders/ScheduleRowHeaders';
import { ScheduleItemPropsWithoutCallback } from '../ScheduleItem/ScheduleItem';
import { AvailableQualifiedMember, Role } from '@typing';
import { iterateDates } from '@utils/helpers/schedule';

export type ScheduleTableProps = {
  startDate: Date;
  endDate: Date;
  roles: Role[];
  scheduleItemsByDay: ScheduleItemPropsWithoutCallback[][];
  onMemberSelected?: (
    date: Date,
    role: Role,
    member: AvailableQualifiedMember | null
  ) => void;
  header?: React.ReactElement;
};

function ScheduleTable(props: ScheduleTableProps) {
  const {
    startDate,
    endDate,
    roles,
    scheduleItemsByDay,
    onMemberSelected,
    header,
  } = props;

  const dates = useMemo(() => {
    return [...iterateDates(startDate, endDate)];
  }, [startDate, endDate]);

  return (
    <Box display="flex" gap={2} sx={{ width: '100%' }}>
      <ScheduleRowHeaders roles={roles} />
      <Box display="flex" flexDirection="column" sx={{ width: '100%' }}>
        {header}
        <Box display="flex" gap={1}>
          {dates.map((date, index) => {
            return (
              <ScheduleColumns
                key={index}
                date={date}
                scheduleItems={scheduleItemsByDay[index].map(
                  (scheduleItem, roleIndex) => ({
                    ...scheduleItem,
                    onMemberSelected: onMemberSelected
                      ? (member: AvailableQualifiedMember | null) =>
                          onMemberSelected(date, roles[roleIndex], member)
                      : undefined,
                  })
                )}
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}

export default ScheduleTable;
