import { INITIAL_BOOKINGS } from '@/data/bookings.seed'
import { generateBookingCode } from '@/utils/bookingCode'
import { format } from 'date-fns'

const STORAGE_KEY = 'telu-studyspace-bookings'
const SIMULATED_DELAY = 400

const simulateDelay = (ms = SIMULATED_DELAY) =>
  new Promise(resolve => setTimeout(resolve, ms))

const generateToken = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  return Array.from({ length: 24 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

const loadFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch {
    // ignore corrupted storage
  }
  return INITIAL_BOOKINGS
}

const saveToStorage = (bookings) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings))
}

export const bookingService = {
  async getAll() {
    await simulateDelay()
    return loadFromStorage()
  },

  async getByCode(code) {
    await simulateDelay()
    return loadFromStorage().find(b => b.code === code) || null
  },

  async getByRoomAndDate(roomId, date) {
    await simulateDelay()
    return loadFromStorage().filter(b =>
      b.roomId === roomId && b.date === date && b.status !== 'cancelled'
    )
  },

  async create(payload) {
    await simulateDelay(600)

    const bookings = loadFromStorage()
    const existing = bookings.filter(b =>
      b.roomId === payload.roomId &&
      b.date === payload.date &&
      b.status !== 'cancelled'
    )

    const newStart = parseInt(payload.start.split(':')[0], 10)
    const newEnd = parseInt(payload.end.split(':')[0], 10)

    for (const b of existing) {
      const bStart = parseInt(b.start.split(':')[0], 10)
      const bEnd = parseInt(b.end.split(':')[0], 10)
      if (newStart < bEnd && newEnd > bStart) {
        return { error: `Slot ${b.start}–${b.end} sudah dipesan. Pilih jam lain.` }
      }
    }

    // Simulate occasional conflict (1 in 8) to demo the error state
    if (Math.random() < 0.125) {
      return { error: `Slot ${payload.start}–${payload.end} baru saja dipesan orang lain. Pilih jam lain.` }
    }

    const booking = {
      code: generateBookingCode(),
      roomId: payload.roomId,
      date: payload.date,
      start: payload.start,
      end: payload.end,
      attendees: payload.attendees,
      purpose: payload.purpose,
      note: payload.note,
      status: 'upcoming',
      qrToken: generateToken(),
      createdAt: format(new Date(), 'yyyy-MM-dd HH:mm:ss')
    }

    bookings.push(booking)
    saveToStorage(bookings)

    return { booking }
  },

  async cancel(code) {
    await simulateDelay(300)

    const bookings = loadFromStorage()
    const index = bookings.findIndex(b => b.code === code)
    if (index === -1) return null

    bookings[index].status = 'cancelled'
    saveToStorage(bookings)

    return bookings[index]
  },

  async checkout(code) {
    await simulateDelay(300)

    const bookings = loadFromStorage()
    const index = bookings.findIndex(b => b.code === code)
    if (index === -1) return null

    bookings[index].status = 'completed'
    saveToStorage(bookings)

    return bookings[index]
  },

  async getByStatus(status) {
    await simulateDelay()
    return loadFromStorage().filter(b => b.status === status)
  }
}