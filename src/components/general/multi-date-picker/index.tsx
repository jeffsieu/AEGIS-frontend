import { styled, TextField, TextFieldProps } from '@mui/material';
import {
  DatePicker,
  DatePickerProps,
  PickersDay,
  PickersDayProps,
} from '@mui/x-date-pickers';
import { useMemo } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import { displayDateRanges, getDateRanges } from '@utils/helpers/dateRange';

dayjs.extend(updateLocale);
dayjs.updateLocale('en', {
  weekStart: 1,
});

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
  textFieldProps?: Partial<TextFieldProps>;
};

function MultiDatePicker(
  props: MultiDatePickerProps &
    Partial<Omit<DatePickerProps<Dayjs, Dayjs>, 'value'>>
) {
  const { label, selection, onSelectionChanged, textFieldProps, ...restProps } =
    props;

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

  const dateRanges = useMemo(() => getDateRanges(selection), [selection]);

  const displayString = useMemo(() => displayDateRanges(dateRanges), [dateRanges]);

  return (
    <>
      <DatePicker
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
    </>
  );
}

export default MultiDatePicker;
