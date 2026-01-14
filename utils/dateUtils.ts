
/**
 * Calculates the ISO-8601 week number for a given date.
 * ISO-8601 week starts on Monday. Week 1 is the week with the first Thursday of the year.
 */
export function getISOWeekNumber(date: Date): number {
  const target = new Date(date.valueOf());
  const dayNr = (date.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);
  const firstThursday = target.valueOf();
  target.setMonth(0, 1);
  if (target.getDay() !== 4) {
    target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7));
  }
  return 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000);
}

/**
 * Calculates the week number based on US standard (Week starts on Sunday).
 */
export function getUSWeekNumber(date: Date): number {
  const tempDate = new Date(date.getFullYear(), 0, 1);
  const firstDayOfYear = tempDate.getDay();
  const pastDaysOfYear = (date.getTime() - tempDate.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear + 1) / 7);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

export function getDayName(date: Date): string {
  return new Intl.DateTimeFormat('zh-CN', { weekday: 'long' }).format(date);
}

export function getTimezoneString(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch (e) {
    return 'Unknown Timezone';
  }
}
