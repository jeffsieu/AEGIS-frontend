export function toShortenedDateString(date: Date): string {
  return date.toLocaleDateString('en-SG', {
    month: 'short',
    day: 'numeric',
  });
}

export function toShortenedDayOfWeekString(date: Date): string {
  return date.toLocaleDateString('en-SG', {
    weekday: 'short',
  });
}

export function toShortenedMonthString(date: Date): string {
  return date.toLocaleDateString('en-SG', {
    month: 'short',
  });
}

export function toLongMonthString(date: Date): string {
  return date.toLocaleDateString('en-SG', {
    month: 'long',
  });
}

export function* iterateDates(
  startDate: Date,
  endDate: Date
): IterableIterator<Date> {
  for (
    let currentDate = startDate;
    currentDate <= endDate;
    currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000)
  ) {
    yield currentDate;
  }
}
