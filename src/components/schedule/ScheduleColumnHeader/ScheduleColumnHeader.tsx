import { Box, Typography } from '@mui/material';
import {
  toShortenedDateString,
  toShortenedDayOfWeekString,
} from '@utils/helpers/schedule';

export type ScheduleColumnHeaderProps = {
  date: Date;
};

function ScheduleColumnHeader(props: ScheduleColumnHeaderProps) {
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

export default ScheduleColumnHeader;
