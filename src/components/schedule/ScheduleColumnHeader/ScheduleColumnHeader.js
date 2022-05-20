import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import {
  toShortenedDateString,
  toShortenedDayOfWeekString,
} from '../../../utils/helpers/schedule';

function ScheduleColumnHeader(props) {
  const { date } = props;

  const dayString = toShortenedDateString(date);
  const dayOfWeekString = toShortenedDayOfWeekString(date);

  return (
    <Box textAlign="center">
      <Typography variant="subtitle2" gutterBottom>
        {dayString}
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        ({dayOfWeekString})
      </Typography>
    </Box>
  );
}

ScheduleColumnHeader.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
};

export default ScheduleColumnHeader;
