import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { roomService } from '@/services/roomService'
import { bookingService } from '@/services/bookingService'
import { format } from 'date-fns'

export const useRoomsStore = defineStore('rooms', () => {
  const rooms = ref([])
  const allRooms = ref([])
  const loading = ref(false)
  const error = ref(null)

  const filter = ref({
    search: '',
    type: 'all',
    capacity: '',
    facilities: [],
    onlyAvailable: false,
    date: format(new Date(), 'yyyy-MM-dd'),
    startTime: '',
    endTime: '',
    sortBy: 'relevant'
  })

  const availableNow = ref({ total: 0, available: 0, rooms: [] })
  const bookings = ref([])

  const filteredRooms = computed(() => rooms.value)

  const fetchRooms = async () => {
    loading.value = true
    error.value = null

    try {
      allRooms.value = await roomService.getAll()
      rooms.value = allRooms.value
      bookings.value = await bookingService.getAll()
    } catch {
      error.value = 'Gagal memuat ruangan'
    }

    loading.value = false
  }

  const applyFilter = async () => {
    loading.value = true
    rooms.value = await roomService.getFiltered(filter.value, bookings.value)
    loading.value = false
  }

  const fetchAvailableNow = async () => {
    availableNow.value = await roomService.getAvailableNow()
  }

  const getRoomById = (id) => allRooms.value.find(r => r.id === id)

  const setFilter = (updates) => {
    filter.value = { ...filter.value, ...updates }
  }

  const resetFilter = () => {
    filter.value = {
      search: '',
      type: 'all',
      capacity: '',
      facilities: [],
      onlyAvailable: false,
      date: format(new Date(), 'yyyy-MM-dd'),
      startTime: '',
      endTime: '',
      sortBy: 'relevant'
    }
  }

  return {
    rooms,
    allRooms,
    loading,
    error,
    filter,
    availableNow,
    bookings,
    filteredRooms,
    fetchRooms,
    applyFilter,
    fetchAvailableNow,
    getRoomById,
    setFilter,
    resetFilter
  }
})