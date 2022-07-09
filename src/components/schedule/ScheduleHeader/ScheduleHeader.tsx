import {
  Box,
  LinearProgress,
  Typography,
  styled,
  linearProgressClasses,
  useTheme,
  Chip,
  Stack,
} from '@mui/material';

import { toShortenedDateString } from '../../../utils/helpers/schedule';

import './ScheduleHeader.css';
import { dateRangeToString } from '@utils/helpers/dateRange';

export type ScheduleHeaderProps = {
  startDate: Date;
  endDate: Date;
} & (
  | {
      progress: number;
      isPublished: false;
    }
  | {
      isPublished: true;
    }
);

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 8,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.secondary.light,
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 8,
    backgroundColor: theme.palette.primary.light,
  },
}));

function ScheduleHeader(props: ScheduleHeaderProps) {
  const { startDate, endDate, isPublished } = props;
  const progress = isPublished ? 0 : props.progress;

  const theme = useTheme();

  const startDateString = toShortenedDateString(startDate);
  const endDateString = toShortenedDateString(endDate);
  const dateRangeString = `${startDateString} - ${endDateString}`;

  // Either show "January" or "Jan - Feb".
  const monthRangeString = dateRangeToString([startDate, endDate], 'MMM YYYY');

  const completionStatusString = `${progress.toFixed(1)}% completed`;

  // Inline css needed to position the rounded button.
  return (
    <Box display="flex" flexDirection="column" gap={6}>
      <Stack spacing={2}>
        <div>
          <Typography variant="h3">{monthRangeString}</Typography>
          <Typography variant="h5" color={theme.palette.text.secondary}>
            {dateRangeString}
          </Typography>
        </div>
        <div>
          <Chip
            label={isPublished ? 'Published' : 'Draft'}
            variant="outlined"
            color={isPublished ? 'primary' : undefined}
          />
        </div>
      </Stack>
      {!isPublished && (
        <Box display="flex" flexDirection="column" gap={1}>
          <div className="progress-container">
            <StyledLinearProgress variant="determinate" value={progress} />
          </div>
          <Typography variant="h6" color={theme.palette.text.secondary}>
            {completionStatusString}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default ScheduleHeader;
