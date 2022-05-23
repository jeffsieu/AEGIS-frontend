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
