import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Popover,
  styled,
  TextField,
  TextFieldProps,
} from '@mui/material';
import {
  StaticDatePicker,
  DatePickerProps,
  PickersDay,
  PickersDayProps,
} from '@mui/x-date-pickers';
import { useMemo, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { dateRangesToString, getDateRanges } from '@utils/helpers/dateRange';
import {
  DateRangeOutlined,
  SelectAllOutlined,
  Clear,
} from '@mui/icons-material';
import { iterateDates } from '@utils/helpers/schedule';

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== 'selected',
})(({ theme, selected }) => ({
  ...(selected && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.dark,
    },
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%',
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
  }),
}));

export type MultiDatePickerProps = {
  label: string;
  onSelectionChanged: (selectedDates: Dayjs[]) => void;
  selection: Dayjs[];
  minDate: Dayjs;
  maxDate: Dayjs;
  textFieldProps?: Partial<TextFieldProps>;
};

function MultiDatePicker(
  props: MultiDatePickerProps &
    Partial<Omit<DatePickerProps<Dayjs, Dayjs>, 'value'>>
) {
  const {
    label,
    selection,
    onSelectionChanged,
    textFieldProps,
    minDate,
    maxDate,
    ...restProps
  } = props;

  function onChange(newValue: Dayjs | null) {
    if (newValue) {
      if (selection.some((date) => date.isSame(newValue))) {
        const newValues = selection.filter((date) => !date.isSame(newValue));
        onSelectionChanged(newValues);
      } else {
        const newValues = [...selection, newValue];
        newValues.sort((a, b) => a.diff(b));
        onSelectionChanged(newValues);
      }
    } else {
    }
  }

  function renderPickerDay(
    date: Dayjs,
    selectedDates: Dayjs[],
    pickersDayProps: PickersDayProps<Dayjs>
  ) {
    if (!selection) {
      return <PickersDay {...pickersDayProps} />;
    }

    const selected = selection.some((d) => d.isSame(date));

    return (
      <CustomPickersDay
        {...(pickersDayProps as PickersDayProps<unknown>)}
        disableMargin
        selected={selected}
      />
    );
  }

  const dateRanges = useMemo(
    () => getDateRanges(selection.map((date) => date.toDate())),
    [selection]
  );

  const displayString = useMemo(
    () => dateRangesToString(dateRanges),
    [dateRanges]
  );

  const [showDialog, setShowDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  function onDialogClose() {
    setShowDialog(false);
    setAnchorEl(null);
  }

  const allDatesInMonth = useMemo(
    () =>
      [...iterateDates(minDate.toDate(), maxDate.toDate())].map((date) =>
        dayjs(date)
      ),
    [minDate, maxDate]
  );

  return (
    <>
      <TextField
        aria-describedby="text-field"
        label={label}
        value=""
        error={false}
        inputProps={{ value: displayString }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                  setShowDialog(true);
                  setAnchorEl(
                    event.currentTarget.parentElement!.parentElement!
                      .parentElement
                  );
                }}
              >
                <DateRangeOutlined />
              </IconButton>
            </InputAdornment>
          ),
        }}
        {...textFieldProps}
      />
      <Popover
        id="text-field"
        open={showDialog}
        anchorEl={anchorEl}
        onClose={onDialogClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <StaticDatePicker
          displayStaticWrapperAs="desktop"
          {...restProps}
          onChange={onChange}
          value={null}
          closeOnSelect={false}
          renderInput={({ value, ...params }) => (
            <TextField
              {...params}
              label={label}
              value=""
              error={false}
              inputProps={{ value: displayString }}
              {...textFieldProps}
            />
          )}
          renderDay={renderPickerDay}
        />
        <Box display="flex" flexDirection="column" alignItems="end">
          <Box display="flex" gap={1} padding={2}>
            <Button
              variant="outlined"
              startIcon={<SelectAllOutlined />}
              size="small"
              onClick={() => {
                onSelectionChanged(allDatesInMonth);
              }}
            >
              Select all
            </Button>
            <Button
              variant="outlined"
              startIcon={<Clear />}
              size="small"
              onClick={() => {
                onSelectionChanged([]);
              }}
            >
              Clear
            </Button>
          </Box>
          <Divider style={{ width: '100%' }} />
          <Box display="flex" gap={1} padding={2}>
            <Button variant="contained" onClick={onDialogClose}>
              Ok
            </Button>
          </Box>
        </Box>
      </Popover>
    </>
  );
}

export default MultiDatePicker;
