import { format } from 'date-fns'
import { id } from 'date-fns/locale'

import type { Second } from '~/types/time'

const TZ_ID = { locale: id }

export function formatDate(date: string | Date, formatString: string = 'dd/MM/yyyy'): string {
  return format(new Date(date), formatString, TZ_ID)
}

/**
 * Convert time string to milliseconds
 * Supports: ms, s, sec, m, min, h, hr, d, day, w, week, y, year
 * @param value - Time string (e.g., "7d", "2h", "30min", "1.5h")
 * @returns Milliseconds
 * @throws Error if invalid format or unsupported unit
 * @example
 * ms("2d") // 172800000
 * ms("1.5h") // 5400000
 * ms("30min") // 1800000
 */
export function ms(value: string | number): Second {
  // If already a number, assume it's milliseconds
  if (typeof value === 'number') {
    if (isNaN(value) || !isFinite(value)) {
      throw new Error('Invalid number provided')
    }
    return Math.abs(value)
  }

  // Validate input
  if (typeof value !== 'string' || value.length === 0) {
    throw new Error('Invalid input: expected non-empty string')
  }

  // Normalize input: trim and convert to lowercase
  const normalized = value.trim().toLowerCase()

  // Match number and unit using regex
  const match = normalized.match(
    /^(-?\d*\.?\d+)\s*(ms|milliseconds?|s|secs?|seconds?|m|mins?|minutes?|h|hrs?|hours?|d|days?|w|weeks?|y|years?)$/i
  )

  if (!match) {
    throw new Error(`Invalid time format: "${value}". Expected format like "2d", "1.5h", "30min"`)
  }

  const [, numStr, unit] = match
  const num = parseFloat(numStr)

  if (isNaN(num) || !isFinite(num)) {
    throw new Error(`Invalid number: "${numStr}"`)
  }

  // Time unit conversion factors (to milliseconds)
  const conversions: Record<string, number> = {
    // Milliseconds
    ms: 1,
    millisecond: 1,
    milliseconds: 1,

    // Seconds
    s: 1000,
    sec: 1000,
    secs: 1000,
    second: 1000,
    seconds: 1000,

    // Minutes
    m: 60 * 1000,
    min: 60 * 1000,
    mins: 60 * 1000,
    minute: 60 * 1000,
    minutes: 60 * 1000,

    // Hours
    h: 60 * 60 * 1000,
    hr: 60 * 60 * 1000,
    hrs: 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    hours: 60 * 60 * 1000,

    // Days
    d: 24 * 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    days: 24 * 60 * 60 * 1000,

    // Weeks
    w: 7 * 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    weeks: 7 * 24 * 60 * 60 * 1000,

    // Years (approximate: 365.25 days)
    y: 365.25 * 24 * 60 * 60 * 1000,
    year: 365.25 * 24 * 60 * 60 * 1000,
    years: 365.25 * 24 * 60 * 60 * 1000,
  }

  const factor = conversions[unit]

  if (factor === undefined) {
    throw new Error(`Unsupported time unit: "${unit}"`)
  }

  const result = Math.abs(num * factor)

  // Check for overflow
  if (!isFinite(result)) {
    throw new Error(`Result overflow: "${value}" produces infinite milliseconds`)
  }

  return Math.round(result)
}
