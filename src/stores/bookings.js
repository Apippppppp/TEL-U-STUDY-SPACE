import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { bookingService } from '@/services/bookingService'

export const useBookingsStore = defineStore('bookings', () => {
  const bookings = ref([])
  const loading = ref(false)
  const error = ref(null)
  const createLoading = ref(false)
  const createError = ref(null)

  const upcomingBookings = computed(() => bookings.value.filter(b => b.status === 'upcoming'))
  const completedBookings = computed(() => bookings.value.filter(b => b.status === 'completed'))
  const cancelledBookings = computed(() => bookings.value.filter(b => b.status === 'cancelled'))

  const upcomingCount = computed(() => upcomingBookings.value.length)
  const completedCount = computed(() => completedBookings.value.length)
  const cancelledCount = computed(() => cancelledBookings.value.length)

  const fetchBookings = async () => {
    loading.value = true
    error.value = null
    try {
      bookings.value = await bookingService.getAll()
    } catch {
      error.value = 'Gagal memuat reservasi'
    }
    loading.value = false
  }

  const getBookingByCode = (code) => bookings.value.find(b => b.code === code)

  const getRoomBookings = (roomId, date) => {
    return bookings.value.filter(b =>
      b.roomId === roomId && b.date === date && b.status !== 'cancelled'
    )
  }

  const createBooking = async (payload) => {
    createLoading.value = true
    createError.value = null

    const result = await bookingService.create(payload)

    if (result.booking) {
      bookings.value.push(result.booking)
      createLoading.value = false
      return result.booking
    }

    createError.value = result.error || 'Gagal membuat reservasi'
    createLoading.value = false
    return null
  }

  const cancelBooking = async (code) => {
    loading.value = true
    error.value = null

    const result = await bookingService.cancel(code)

    if (result) {
      const index = bookings.value.findIndex(b => b.code === code)
      if (index !== -1) bookings.value[index].status = 'cancelled'
    } else {
      error.value = 'Gagal membatalkan reservasi'
    }

    loading.value = false
    return !!result
  }

  const checkoutBooking = async (code) => {
    loading.value = true
    error.value = null

    const result = await bookingService.checkout(code)

    if (result) {
      const index = bookings.value.findIndex(b => b.code === code)
      if (index !== -1) bookings.value[index].status = 'completed'
    } else {
      error.value = 'Gagal melakukan checkout'
    }

    loading.value = false
    return !!result
  }

  return {
    bookings,
    loading,
    error,
    createLoading,
    createError,
    upcomingBookings,
    completedBookings,
    cancelledBookings,
    upcomingCount,
    completedCount,
    cancelledCount,
    fetchBookings,
    getBookingByCode,
    getRoomBookings,
    createBooking,
    cancelBooking,
    checkoutBooking
  }
})