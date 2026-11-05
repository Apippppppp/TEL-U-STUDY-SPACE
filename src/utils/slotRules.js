// Pure slot-range rules. No Vue, no imports so it can be unit-checked with plain Node.
export const MAX_DURATION_HOURS = 3

const hourOf = (time) => parseInt(time, 10)

const oneHourLater = (time) =>
  `${(hourOf(time) + 1).toString().padStart(2, '0')}:00`

/**
 * Pick an hour slot and return the new contiguous range.
 * - First pick, pick at/before the current start, or pick beyond 3h: start a new range.
 * - Picking later within 3h extends the range, unless it would cross an occupied hour.
 */
export function applySlotPick(current, picked, occupied) {
  const startHour = current.start ? hourOf(current.start) : null

  if (
    startHour === null ||
    hourOf(picked) <= startHour ||
    hourOf(picked) - startHour >= MAX_DURATION_HOURS
  ) {
    return { start: picked, end: oneHourLater(picked) }
  }

  for (let h = startHour + 1; h <= hourOf(picked); h++) {
    if (occupied.includes(`${h.toString().padStart(2, '0')}:00`)) {
      return current
    }
  }

  return { start: current.start, end: oneHourLater(picked) }
}