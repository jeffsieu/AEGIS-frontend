import { Box } from '@mui/material';
import ScheduleColumnHeader from '@components/schedule/ScheduleColumnHeader/ScheduleColumnHeader';
import ScheduleItem, {
  ScheduleItemProps,
} from '@components/schedule/ScheduleItem/ScheduleItem';

export type ScheduleColumnProps = {
  date: Date;
  scheduleItems: ScheduleItemProps[];
};

function ScheduleColumns(props: ScheduleColumnProps) {
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

export default ScheduleColumns;
