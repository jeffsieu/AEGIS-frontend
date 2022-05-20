import { Box } from '@mui/material';
import ScheduleColumnHeader from '../ScheduleColumnHeader/ScheduleColumnHeader';
import PropTypes from 'prop-types';
import ScheduleItem from '../ScheduleItem/ScheduleItem';

function ScheduleColumns(props) {
  const { date, scheduleItems } = props;

  return (
    <Box display="flex" textAlign="center" flexDirection="column" gap={2}>
      <ScheduleColumnHeader date={date} />
      <Box display="flex" textAlign="center" flexDirection="column" gap={1}>
        {scheduleItems.map((scheduleItem, index) => {
          return <ScheduleItem {...scheduleItem} key={index} />;
        })}
      </Box>
    </Box>
  );
}

ScheduleColumns.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  scheduleItems: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ScheduleColumns;
