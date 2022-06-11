import MultiDatePicker from '@components/general/multi-date-picker';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  useTheme,
} from '@mui/material';
import {
  useGetRolesQuery,
  useGetMonthsToPlanQuery,
  useAddScheduleMutation,
} from '@services/backend';
import { Role } from '@typing';
import dayjs, { Dayjs } from 'dayjs';
import { useMemo, useState } from 'react';

export type PlannerNewPlanFormProps = {
  roles: Role[];
  defaultMonth: Dayjs;
  months: Dayjs[];
  onScheduleCreated: (
    month: Dayjs,
    roleDates: { [key: Role['name']]: Dayjs[] }
  ) => void;
};

function PlannerNewPlanFormWithAPI() {
  const { data: roles } = useGetRolesQuery();
  const { data: monthData } = useGetMonthsToPlanQuery();
  const [addSchedule] = useAddScheduleMutation();

  const monthsToPlan = useMemo(() => {
    return monthData?.map((date) => dayjs(date)) ?? [];
  }, [monthData]);

  if (roles === undefined || monthData === undefined) {
    return <CircularProgress />;
  }

  if (monthData.length === 0) {
    return <Typography variant="h6">No months to plan.</Typography>;
  }
  const defaultMonth = monthsToPlan[0];

  const props: PlannerNewPlanFormProps = {
    roles,
    defaultMonth,
    months: monthsToPlan,
    onScheduleCreated: (month, roleDates) => {
      addSchedule({
        month: month.toDate(),
        isPublished: false,
        duties: Object.entries(roleDates).flatMap(([roleName, dates]) =>
          dates.map((date) => ({
            date: date.toDate(),
            roleId: roles.find((role) => role.name === roleName)!.id,
          }))
        ),
      });
      console.log(month, roleDates);
    },
  };

  return <PlannerNewPlanForm {...props} />;
}

function PlannerNewPlanForm(props: PlannerNewPlanFormProps) {
  const { roles, defaultMonth, months, onScheduleCreated } = props;

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
      <Box display="flex" flexDirection="column" alignItems="start" gap={2}>
        <Typography variant="h4" gutterBottom>
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
                {month.format('MMMM YYYY')}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <div>
        <Typography
          variant="h5"
          color={theme.palette.text.secondary}
          gutterBottom
        >
          Roles
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          {roles.map((role, index) => (
            <Box key={index} display="flex" gap={8} alignItems="center">
              <Typography variant="h6">{role.name}</Typography>
              <MultiDatePicker
                label="Dates"
                minDate={minDate}
                maxDate={maxDate}
                views={['day']}
                defaultCalendarMonth={month}
                onSelectionChanged={(selectedDates: Dayjs[]) => {
                  setDateSelections({
                    ...dateSelections,
                    [role.name]: selectedDates,
                  });
                }}
                selection={dateSelections[role.name] || []}
                textFieldProps={{
                  variant: 'filled',
                  helperText:
                    dateSelections[role.name]?.length > 0
                      ? ''
                      : 'Role will not be scheduled in entire month.',
                }}
              ></MultiDatePicker>
            </Box>
          ))}
        </Box>
      </div>
      <Button
        variant="contained"
        onClick={() => {
          onScheduleCreated(month, dateSelections);
        }}
      >
        Create
      </Button>
    </Box>
  );
}

export default PlannerNewPlanFormWithAPI;
export { PlannerNewPlanForm as PlannerNewPlanFormWithProps };
