
export interface WeekData {
  date: Date;
  weekNumber: number;
  year: number;
  dayOfWeek: string;
  formattedDate: string;
}

export enum CalculationStandard {
  ISO8601 = 'ISO-8601',
  US = 'US (Sunday Start)'
}
