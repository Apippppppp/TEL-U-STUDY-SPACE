import { ROOMS, getRoomById } from '@/data/rooms'

const SIMULATED_DELAY = 300

const simulateDelay = (ms = SIMULATED_DELAY) =>
  new Promise(resolve => setTimeout(resolve, ms))

export const roomService = {
  async getAll() {
    await simulateDelay()
    return ROOMS
  },

  async getById(id) {
    await simulateDelay()
    return getRoomById(id) || null
  },

  async getFiltered(filter, bookings = []) {
    await simulateDelay(400)

    const rooms = ROOMS.filter(room => {
      if (filter.type !== 'all' && room.type !== filter.type) return false

      if (filter.search) {
        const searchLower = filter.search.toLowerCase()
        const matchName = room.name.toLowerCase().includes(searchLower)
        const matchBuilding = room.building.toLowerCase().includes(searchLower)
        if (!matchName && !matchBuilding) return false
      }

      if (filter.capacity) {
        const [min, max] = filter.capacity.split('-').map(Number)
        if (room.capacityMax < min || room.capacityMin > max) return false
      }

      if (filter.facilities.length > 0) {
        const hasAllFacilities = filter.facilities.every(f => room.facilities.includes(f))
        if (!hasAllFacilities) return false
      }

      if (filter.onlyAvailable && filter.date && filter.startTime && filter.endTime) {
        const dateBookings = bookings.filter(b =>
          b.date === filter.date &&
          b.roomId === room.id &&
          b.status !== 'cancelled'
        )

        const startHour = parseInt(filter.startTime.split(':')[0], 10)
        const endHour = parseInt(filter.endTime.split(':')[0], 10)

        for (const booking of dateBookings) {
          const bStart = parseInt(booking.start.split(':')[0], 10)
          const bEnd = parseInt(booking.end.split(':')[0], 10)
          if (startHour < bEnd && endHour > bStart) return false
        }
      }

      return true
    })

    if (filter.sortBy === 'capacity') {
      rooms.sort((a, b) => b.capacityMax - a.capacityMax)
    } else if (filter.sortBy === 'nearest') {
      rooms.sort((a, b) => {
        const floorDiff = Math.abs(a.floor - 1) - Math.abs(b.floor - 1)
        if (floorDiff !== 0) return floorDiff
        return a.building.localeCompare(b.building)
      })
    }

    return rooms
  },

  async getAvailableNow() {
    await simulateDelay()
    const now = new Date()
    const currentHour = now.getHours()

    const allRooms = ROOMS.filter(r => {
      const dayOfWeek = now.getDay()
      if (!r.openDays.includes(dayOfWeek)) return false
      if (currentHour < r.openHour || currentHour >= r.closeHour) return false
      return true
    })

    return {
      total: ROOMS.length,
      available: allRooms.length,
      rooms: allRooms.slice(0, 4)
    }
  }
}