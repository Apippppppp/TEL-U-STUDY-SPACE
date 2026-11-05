import { ref, computed } from 'vue'
import { timeToHour } from '@/utils/time'
import { applySlotPick, MAX_DURATION_HOURS } from '@/utils/slotRules'

export function useSlotSelection(initialDate = '') {
  const selectedStart = ref(null)
  const selectedEnd = ref(null)
  const occupiedSlots = ref([])
  const selectedDate = ref(initialDate)

  const duration = computed(() => {
    if (!selectedStart.value || !selectedEnd.value) return 0
    return timeToHour(selectedEnd.value) - timeToHour(selectedStart.value)
  })

  const isValid = computed(
    () => duration.value > 0 && duration.value <= MAX_DURATION_HOURS
  )

  const getSlotStatus = (time) => {
    if (occupiedSlots.value.includes(time)) return 'occupied'

    const now = new Date()
    const today = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`
    if (selectedDate.value === today && timeToHour(time) <= now.getHours()) return 'past'

    if (selectedStart.value && selectedEnd.value) {
      const hour = timeToHour(time)
      if (hour >= timeToHour(selectedStart.value) && hour < timeToHour(selectedEnd.value)) {
        return time === selectedStart.value ? 'selected' : 'in-range'
      }
    }
    return 'empty'
  }

  const selectSlot = (time) => {
    const status = getSlotStatus(time)
    if (status === 'occupied' || status === 'past') return

    const next = applySlotPick(
      { start: selectedStart.value, end: selectedEnd.value },
      time,
      occupiedSlots.value
    )
    selectedStart.value = next.start
    selectedEnd.value = next.end
  }

  const clearSelection = () => {
    selectedStart.value = null
    selectedEnd.value = null
  }

  const setOccupiedSlots = (slots) => {
    occupiedSlots.value = slots
  }

  const setDate = (date) => {
    selectedDate.value = date
    clearSelection()
  }

  return {
    selectedStart,
    selectedEnd,
    occupiedSlots,
    selectedDate,
    duration,
    isValid,
    getSlotStatus,
    selectSlot,
    clearSelection,
    setOccupiedSlots,
    setDate
  }
}