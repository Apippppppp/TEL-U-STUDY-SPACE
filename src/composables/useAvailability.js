export function useAvailability() {
  const isRoomOpen = (room, date) => {
    const dayOfWeek = date.getDay()
    if (!room.openDays.includes(dayOfWeek)) return false
    const hour = date.getHours()
    return hour >= room.openHour && hour < room.closeHour
  }

  const getOccupiedSlots = (roomId, date, bookings) => {
    return bookings
      .filter(b => b.roomId === roomId && b.date === date && b.status !== 'cancelled')
      .flatMap(b => {
        const slots = []
        const startH = parseInt(b.start.split(':')[0], 10)
        const endH = parseInt(b.end.split(':')[0], 10)
        for (let h = startH; h < endH; h++) {
          slots.push(`${h.toString().padStart(2, '0')}:00`)
        }
        return slots
      })
  }

  const isSlotOccupied = (time, occupiedSlots) => occupiedSlots.includes(time)

  const isSlotPast = (time, date) => {
    const now = new Date()
    const today = now.toISOString().split('T')[0]
    if (date !== today) return false
    return parseInt(time.split(':')[0], 10) <= now.getHours()
  }

  const getCrowdLevel = (room, hour) => {
    const index = hour - room.openHour
    if (index < 0 || index >= room.crowd.length) return 'low'
    const value = room.crowd[index]
    if (value < 0.33) return 'low'
    if (value < 0.66) return 'medium'
    return 'high'
  }

  return {
    isRoomOpen,
    getOccupiedSlots,
    isSlotOccupied,
    isSlotPast,
    getCrowdLevel
  }
}