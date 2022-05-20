import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { useMemo } from 'react';
import ScheduleColumns from '../ScheduleColumns/ScheduleColumns';
import ScheduleRowHeaders from '../ScheduleRowHeaders/ScheduleRowHeaders';

function ScheduleTable(props) {
  const { startDate, endDate, roleNames, scheduleItemsByDay } = props;

  function* dateIterator(startDate, endDate) {
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
      <ScheduleRowHeaders roleNames={roleNames} />
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

ScheduleTable.propTypes = {
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date).isRequired,
  roleNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  scheduleItemsByDay: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object))
    .isRequired,
};

export default ScheduleTable;
