import { Dayjs } from "dayjs";

export type DateRange = [Dayjs, Dayjs];

export function getDateRanges(dates: Dayjs[]) : DateRange[] {
	const dateRanges: DateRange[] = [];
    let start: Dayjs | null = null;
    let end: Dayjs | null = null;
    for (const date of dates) {
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
}

export function displayDateRanges(dateRanges: DateRange[]) : string {
	let displayString = '';
    if (dateRanges.length === 0) {
      return 'No dates selected';
    }

    for (const [start, end] of dateRanges) {
      if (start.isSame(end)) {
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
}