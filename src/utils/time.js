// 14 hourly slots from 07:00 to 20:00 (end at 21:00)
export const OPERATIONAL_HOURS = [
  '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00',
  '19:00', '20:00'
]

export const timeToHour = (timeStr) => parseInt(timeStr.split(':')[0], 10)

export const hourToTime = (hour) => `${hour.toString().padStart(2, '0')}:00`

export const calculateDuration = (startStr, endStr) =>
  Math.max(0, timeToHour(endStr) - timeToHour(startStr))

export const getSlotIndex = (timeStr) => timeToHour(timeStr) - 7