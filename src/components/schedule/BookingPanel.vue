<script setup>
import { computed, watch } from 'vue'
import { format, parseISO, isSameDay } from 'date-fns'
import { id } from 'date-fns/locale'
import { OPERATIONAL_HOURS, timeToHour, getSlotIndex } from '@/utils/time'
import { applySlotPick } from '@/utils/slotRules'
import DateStrip from './DateStrip.vue'
import SlotGrid from './SlotGrid.vue'

const props = defineProps({
  date: { type: String, required: true },
  bookings: { type: Array, default: () => [] },
  disabled: { type: Boolean, default: false }
})

const emit = defineEmits(['update:date', 'update:start', 'update:end', 'reserve'])

const selectedStart = defineModel('start', { type: String, default: '' })
const selectedEnd = defineModel('end', { type: String, default: '' })

const occupiedSlots = computed(() => {
  return props.bookings
    .filter(b => b.date === props.date && b.status !== 'cancelled')
    .flatMap(b => {
      const slots = []
      const startH = parseInt(b.start.split(':')[0], 10)
      const endH = parseInt(b.end.split(':')[0], 10)
      for (let h = startH; h < endH; h++) {
        slots.push(`${h.toString().padStart(2, '0')}:00`)
      }
      return slots
    })
})

const slots = computed(() => {
  return OPERATIONAL_HOURS.map(time => {
    const hour = timeToHour(time)
    const isToday = isSameDay(parseISO(props.date), new Date())
    const isPast = isToday && hour <= new Date().getHours()

    if (isPast) return 'past'
    if (occupiedSlots.value.includes(time)) return 'occupied'

    if (selectedStart.value && selectedEnd.value) {
      const startH = timeToHour(selectedStart.value)
      const endH = timeToHour(selectedEnd.value)
      if (hour >= startH && hour < endH) {
        return hour === startH ? 'selected' : 'in-range'
      }
    }

    return 'empty'
  })
})

const handleSlotSelect = (time) => {
  const status = slots.value[getSlotIndex(time)]
  if (status === 'occupied' || status === 'past') return

  const next = applySlotPick(
    { start: selectedStart.value || null, end: selectedEnd.value || null },
    time,
    occupiedSlots.value
  )
  selectedStart.value = next.start || ''
  selectedEnd.value = next.end || ''
}

const duration = computed(() => {
  if (!selectedStart.value || !selectedEnd.value) return 0
  return timeToHour(selectedEnd.value) - timeToHour(selectedStart.value)
})

const canReserve = computed(() => {
  return !!selectedStart.value && !!selectedEnd.value && duration.value > 0 && duration.value <= 3
})

const summary = computed(() => {
  if (!selectedStart.value || !selectedEnd.value) return ''
  const d = parseISO(props.date)
  const dayName = format(d, 'EEE', { locale: id })
  const dayNum = format(d, 'd MMM', { locale: id })
  return `${dayName}, ${dayNum} · ${selectedStart.value}–${selectedEnd.value} · ${duration.value}j`
})

watch(() => props.date, () => {
  selectedStart.value = ''
  selectedEnd.value = ''
})
</script>

<template>
  <div class="bg-white rounded-xl shadow-float p-4 lg:sticky lg:top-20">
    <h3 class="font-display font-semibold text-ink-900 mb-4">Pilih waktu</h3>

    <div class="mb-4">
      <DateStrip :model-value="date" @update:model-value="emit('update:date', $event)" />
    </div>

    <p class="text-xs text-ink-500 mb-2">Pilih rentang waktu (maksimal 3 jam)</p>

    <SlotGrid
      :slots="slots"
      :disabled="disabled"
      @select="handleSlotSelect"
    />

    <div v-if="summary" class="mt-4 p-3 bg-red-50 rounded-lg">
      <p class="text-sm font-medium text-red-700">{{ summary }}</p>
    </div>

    <button
      :disabled="!canReserve || disabled"
      class="w-full mt-4 h-11 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      @click="emit('reserve')"
    >
      {{ canReserve ? 'Reservasi sekarang' : 'Pilih minimal satu slot' }}
    </button>
  </div>
</template>