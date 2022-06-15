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
  stickyHeader?: boolean;
};

function ScheduleTable(props: ScheduleTableProps) {
  const {
    startDate,
    endDate,
    roles,
    scheduleItemsByDay,
    onMemberSelected,
    header,
    stickyHeader = false,
  } = props;

  const dates = useMemo(() => {
    return [...iterateDates(startDate, endDate)];
  }, [startDate, endDate]);

  return (
    <Box display="flex" margin="auto" gap={2}>
      <ScheduleRowHeaders roles={roles} sticky={stickyHeader} />
      <Box display="flex" flexDirection="column" flexBasis={0}>
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
