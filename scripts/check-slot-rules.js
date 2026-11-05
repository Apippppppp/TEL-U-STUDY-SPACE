import assert from 'node:assert'
import { applySlotPick, MAX_DURATION_HOURS } from '../src/utils/slotRules.js'

const empty = { start: null, end: null }

// First pick starts a 1-hour range.
assert.deepEqual(applySlotPick(empty, '10:00', []), { start: '10:00', end: '11:00' })

// Extending within 3h grows the range.
assert.deepEqual(
  applySlotPick({ start: '10:00', end: '11:00' }, '12:00', []),
  { start: '10:00', end: '13:00' }
)

// Fourth hour is rejected -> resets to the picked slot.
assert.deepEqual(
  applySlotPick({ start: '10:00', end: '13:00' }, '13:00', []),
  { start: '13:00', end: '14:00' }
)

// Max duration constant is honoured.
assert.equal(MAX_DURATION_HOURS, 3)

// Picking the same start resets to a single hour.
assert.deepEqual(
  applySlotPick({ start: '10:00', end: '12:00' }, '10:00', []),
  { start: '10:00', end: '11:00' }
)

// Crossing an occupied hour is rejected and the range kept.
assert.deepEqual(
  applySlotPick({ start: '10:00', end: '11:00' }, '12:00', ['11:00']),
  { start: '10:00', end: '11:00' }
)

console.log('slot range rules: 6 checks passed')