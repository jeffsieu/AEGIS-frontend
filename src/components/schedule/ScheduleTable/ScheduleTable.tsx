import { Box } from '@mui/material';
import { useMemo } from 'react';
import ScheduleColumns from '../ScheduleColumns/ScheduleColumns';
import ScheduleRowHeaders from '../ScheduleRowHeaders/ScheduleRowHeaders';
import { ScheduleItemProps } from '../ScheduleItem/ScheduleItem';
import { Role } from '@types';

export type ScheduleTableProps = {
  startDate: Date;
  endDate: Date;
  roles: Role[];
  scheduleItemsByDay: ScheduleItemProps[][];
};

function ScheduleTable(props: ScheduleTableProps) {
  const { startDate, endDate, roles, scheduleItemsByDay } = props;

  function* dateIterator(
    startDate: Date,
    endDate: Date
  ): IterableIterator<Date> {
    for (
      let currentDate = startDate;
      currentDate <= endDate;
      currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000)
    ) {
      yield currentDate;
    }
  }

  const dates = useMemo(() => {
    return [...dateIterator(startDate, endDate)];
  }, [startDate, endDate]);

  return (
    <Box display="flex" gap={2}>
      <ScheduleRowHeaders roles={roles} />
      <Box display="flex" gap={1}>
        {dates.map((date, index) => {
          return (
            <ScheduleColumns
              key={index}
              date={date}
              scheduleItems={scheduleItemsByDay[index]}
            />
          );
        })}
      </Box>
    </Box>
  );
}

export default ScheduleTable;
