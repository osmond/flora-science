import { parse, addYears, subYears } from 'date-fns'

/**
 * Parses a month/day string into a Date, inferring the year from the base date.
 * If `isFuture` is true and the parsed date is before the base date,
 * the date is assumed to be in the next year. If `isFuture` is false and the
 * parsed date is after the base date, it is assumed to be in the previous year.
 */
export function parsePlantDate(
  dateStr: string,
  isFuture = false,
  baseDate: Date = new Date()
): Date {
  const year = baseDate.getFullYear()
  let parsed = parse(`${dateStr} ${year}`, 'MMM d yyyy', baseDate)
  if (isFuture && parsed < baseDate) {
    parsed = addYears(parsed, 1)
  } else if (!isFuture && parsed > baseDate) {
    parsed = subYears(parsed, 1)
  }
  return parsed
}
