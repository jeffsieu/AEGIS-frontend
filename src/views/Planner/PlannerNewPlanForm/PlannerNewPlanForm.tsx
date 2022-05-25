import MultiDatePicker from '@components/general/multi-date-picker';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  useTheme,
} from '@mui/material';
import { Role } from '@types';
import { Dayjs } from 'dayjs';
import { useMemo, useState } from 'react';

export type PlannerNewPlanFormProps = {
  roles: Role[];
  defaultMonth: Dayjs;
  months: Dayjs[];
};

function PlannerNewPlanForm(props: PlannerNewPlanFormProps) {
  const { roles, defaultMonth, months } = props;

  const theme = useTheme();

  const [dateSelections, setDateSelections] = useState<{
    [key: string]: Dayjs[];
  }>({});

  const [month, setMonth] = useState(defaultMonth);

  const minDate = useMemo(() => {
    return month.startOf('month');
  }, [month]);

  const maxDate = useMemo(() => {
    return month.endOf('month');
  }, [month]);

  function onMonthChange(event: SelectChangeEvent<Dayjs>) {
    const newMonth = event.target.value as Dayjs;
    const hasMonthChanged = !month.isSame(newMonth, 'month');
    if (hasMonthChanged) {
      setMonth(newMonth);
      setDateSelections({});
    }
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="start" gap={4}>
      <div>
        <Typography variant="h3" gutterBottom>
          Create new plan
        </Typography>
        <FormControl variant="filled">
          <InputLabel>Month</InputLabel>
          <Select
            label="Month"
            defaultValue={defaultMonth}
            value={month}
            onChange={onMonthChange}
          >
            {months.map((month, index) => (
              <MenuItem
                key={index}
                value={month as unknown as string /* Workaround */}
              >
                {month.format('MMMM')}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div>
        <Typography
          variant="h5"
          color={theme.palette.text.secondary}
          gutterBottom
        >
          Roles
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          {roles.map((role) => (
            <Box display="flex" gap={8} alignItems="center">
              <Typography variant="h6">{role}</Typography>
              <MultiDatePicker
                label="Dates"
                minDate={minDate}
                maxDate={maxDate}
                defaultCalendarMonth={month}
                onSelectionChanged={(selectedDates) => {
                  setDateSelections({
                    ...dateSelections,
                    [role]: selectedDates,
                  });
                }}
                selection={dateSelections[role] || []}
                textFieldProps={{ variant: 'filled' }}
              ></MultiDatePicker>
            </Box>
          ))}
        </Box>
      </div>
      <Button variant="contained">Create</Button>
    </Box>
  );
}

export default PlannerNewPlanForm;
