import { Box, Typography } from '@mui/material';
import { toShortenedDayOfWeekString } from '@utils/helpers/schedule';

export type ScheduleColumnHeaderProps = {
  date: Date;
};

function ScheduleColumnHeader(props: ScheduleColumnHeaderProps) {
  const { date } = props;

  const dayString = date.getDate();
  const dayOfWeekString = toShortenedDayOfWeekString(date);

  return (
    <Box textAlign="center">
      <Typography variant="overline">{dayOfWeekString}</Typography>
      <Typography variant="h6" gutterBottom>
        {dayString}
      </Typography>
    </Box>
  );
}

export default ScheduleColumnHeader;
