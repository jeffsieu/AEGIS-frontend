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

  const dateRanges = useMemo(() => {
    const dateRanges: [Dayjs, Dayjs][] = [];
    let start: Dayjs | null = null;
    let end: Dayjs | null = null;
    for (const date of selection) {
      if (start === null || end === null) {
        start = date;
        end = date;
        continue;
      }

      if (date.subtract(1, 'day').isSame(end)) {
        end = date;
      } else {
        dateRanges.push([start, end]);
        start = date;
        end = date;
      }
    }
    if (start !== null && end !== null) {
      dateRanges.push([start, end]);
    }
    return dateRanges;
  }, [selection]);

  const displayString = useMemo(() => {
    let displayString = '';
    if (dateRanges.length === 0) {
      return 'No dates selected';
    }

    for (const [start, end] of dateRanges) {
      if (start === end) {
        displayString += start.format('D MMM YYYY');
      } else {
        const endString = end.format('D MMM YYYY');
        const startString = start.format('D MMM YYYY');

        // Show only the different part of startString
        const startStringReversed = startString.split('').reverse();
        const endStringReversed = endString.split('').reverse();
        const index = startStringReversed.findIndex(
          (c, i) => c !== endStringReversed[i]
        );
        const startStringPart = startStringReversed
          .slice(index, startStringReversed.length)
          .reverse()
          .join('');
        displayString += startStringPart + ' - ' + endString;
      }
      displayString += ', ';
    }
    return displayString.slice(0, -2);
  }, [dateRanges]);

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
