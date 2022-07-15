import { Card, CardActionArea, Box, Typography, useTheme } from '@mui/material';
import { dateRangeToString } from '@utils/helpers/dateRange';
import { getCardColor } from '@utils/theme';
import ScheduleTable, {
  ScheduleTableProps,
} from '../ScheduleTable/ScheduleTable';

export type ScheduleCardProps = ScheduleTableProps & {
  onClick: () => void;
};

function ScheduleCard(props: ScheduleCardProps) {
  const { onClick, onMemberSelected, ...schedule } = props;

  const theme = useTheme();
  const cardColor = getCardColor(theme);

  return (
    <Card variant="outlined" sx={{ backgroundColor: cardColor }}>
      <CardActionArea onClick={onClick} data-testid="schedule-button">
        <Box
          p={2}
          sx={{
            overflowX: 'clip',
            maskImage: 'linear-gradient(90deg, #000 60%, transparent);',
            pointerEvents: 'none',
          }}>
          <Typography
            variant="h5"
            color={theme.palette.text.secondary}
            gutterBottom>
            {dateRangeToString(
              [schedule.startDate, schedule.endDate],
              'MMM YYYY'
            )}
          </Typography>
          <ScheduleTable {...schedule} onMemberSelected={onMemberSelected} />
        </Box>
      </CardActionArea>
    </Card>
  );
}

export default ScheduleCard;
