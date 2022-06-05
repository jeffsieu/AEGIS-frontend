import {
  Box,
  LinearProgress,
  Typography,
  styled,
  linearProgressClasses,
  IconButton,
  useTheme,
} from '@mui/material';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';

import {
  COLOR_SCHEDULE_PROGRESS_BACKGROUND,
  COLOR_SCHEDULE_PROGRESS_BAR,
} from '../../../utils/constants/schedule';
import { toShortenedDateString } from '../../../utils/helpers/schedule';

import './ScheduleHeader.css';
import { dateRangeToString } from '@utils/helpers/dateRange';

export type ScheduleHeaderProps = {
  startDate: Date;
  endDate: Date;
  progress: number;
};

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 8,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: COLOR_SCHEDULE_PROGRESS_BACKGROUND,
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 8,
    backgroundColor: COLOR_SCHEDULE_PROGRESS_BAR,
  },
}));

function ScheduleHeader(props: ScheduleHeaderProps) {
  const { startDate, endDate, progress } = props;

  const theme = useTheme();

  const startDateString = toShortenedDateString(startDate);
  const endDateString = toShortenedDateString(endDate);
  const dateRangeString = `${startDateString} - ${endDateString}`;

  // Either show "January" or "Jan - Feb".
  const monthRangeString = dateRangeToString([startDate, endDate], 'MMM YYYY');

  const completionStatusString = `${progress}% completed`;

  // Inline css needed to position the rounded button.
  return (
    <Box display="flex" flexDirection="column" textAlign="center" gap={3}>
      <Box position="relative" sx={{ margin: 'auto' }}>
        <Typography variant="h2">{monthRangeString}</Typography>
        <Typography variant="h5" color={theme.palette.text.secondary}>
          {dateRangeString}
        </Typography>
        <IconButton
          size="large"
          className="next-button"
          color="primary"
          sx={{
            position: 'absolute',
            background: theme.palette.action.disabledBackground,
          }}
        >
          <NavigateNextRoundedIcon />
        </IconButton>
      </Box>
      <Box display="flex" flexDirection="column" gap={1}>
        <div className="progress-container">
          <StyledLinearProgress variant="determinate" value={progress} />
        </div>
        <Typography variant="h6" color={theme.palette.text.secondary}>
          {completionStatusString}
        </Typography>
      </Box>
    </Box>
  );
}

export default ScheduleHeader;
