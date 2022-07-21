import dayjs, { Dayjs } from 'dayjs';

export type DateRange = [Date, Date];

export function getDateRanges(dates: Date[]): DateRange[] {
  const dayjsDates = dates.map((date) => dayjs(date));
  const dateRanges: DateRange[] = [];
  let start: Dayjs | null = null;
  let end: Dayjs | null = null;
  for (const date of dayjsDates) {
    if (start === null || end === null) {
      start = date;
      end = date;
      continue;
    }

    if (date.subtract(1, 'day').isSame(end)) {
      end = date;
    } else {
      dateRanges.push([start.toDate(), end.toDate()]);
      start = date;
      end = date;
    }
  }
  if (start !== null && end !== null) {
    dateRanges.push([start.toDate(), end.toDate()]);
  }
  return dateRanges;
}

/// Formats the date range using the given formatString to format each of the dates.
/// Only the unique part of the formatted start date is included in the formatted range.
export function dateRangeToString(
  dateRange: DateRange,
  formatString: string = 'D MMM YYYY',
  formatDelimiter: string = ' '
): string {
  const [startDate, endDate] = dateRange;
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  if (start.isSame(end)) {
    return start.format(formatString);
  } else {
    const endString = end.format(formatString);
    const startString = start.format(formatString);

    if (startString === endString) {
      return startString;
    }

    // Show only the different part of startString
    const startStringReversed = startString.split('').reverse();
    const endStringReversed = endString.split('').reverse();

    const index = startStringReversed.findIndex(
      (c, i) => c !== endStringReversed[i]
    );
    const spaceIndex = startStringReversed
      .join('')
      .substring(0, index)
      .lastIndexOf(formatDelimiter);
    const startStringPart = startStringReversed
      .slice(spaceIndex + 1, startStringReversed.length)
      .reverse()
      .join('');
    return startStringPart + ' - ' + endString;
  }
}

export function dateRangesToString(dateRanges: DateRange[]): string {
  let displayString = '';
  if (dateRanges.length === 0) {
    return 'No dates selected';
  }

  for (const dateRange of dateRanges) {
    displayString += dateRangeToString(dateRange) + ', ';
  }
  return displayString.slice(0, -2);
}
