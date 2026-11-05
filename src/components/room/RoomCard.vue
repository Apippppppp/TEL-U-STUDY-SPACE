<script setup>
import { computed } from 'vue'
import { FACILITIES } from '@/data/facilities'
import { OPERATIONAL_HOURS, timeToHour } from '@/utils/time'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'

const props = defineProps({
  room: { type: Object, required: true },
  bookings: { type: Array, default: () => [] },
  date: { type: String, default: '' }
})

const roomBookings = computed(() => {
  if (!props.date) return []
  return props.bookings.filter(b =>
    b.roomId === props.room.id && b.date === props.date && b.status !== 'cancelled'
  )
})

const occupiedSlots = computed(() => {
  return roomBookings.value.flatMap(b => {
    const slots = []
    const startH = parseInt(b.start.split(':')[0], 10)
    const endH = parseInt(b.end.split(':')[0], 10)
    for (let h = startH; h < endH; h++) {
      slots.push(`${h.toString().padStart(2, '0')}:00`)
    }
    return slots
  })
})

const now = new Date()
const currentHour = now.getHours()

const slotStatuses = computed(() => {
  return OPERATIONAL_HOURS.map(time => {
    const hour = timeToHour(time)
    if (hour <= currentHour) return 'past'
    if (occupiedSlots.value.includes(time)) return 'occupied'
    return 'empty'
  })
})

const nextAvailable = computed(() => {
  return OPERATIONAL_HOURS.find((time) => {
    const hour = timeToHour(time)
    return hour > currentHour && !occupiedSlots.value.includes(time)
  })
})

const statusText = computed(() => {
  if (roomBookings.value.length === 0 && nextAvailable.value) return 'Kosong sekarang'
  if (nextAvailable.value) return `Kosong mulai ${nextAvailable.value}`
  return 'Penuh hari ini'
})

const statusVariant = computed(() => {
  if (roomBookings.value.length === 0 && nextAvailable.value) return 'success'
  return nextAvailable.value ? 'warning' : 'default'
})

const facilitiesList = computed(() => {
  return props.room.facilities.slice(0, 4).map(f => FACILITIES[f]).filter(Boolean)
})

const moreFacilities = computed(() => Math.max(0, props.room.facilities.length - 4))
</script>

<template>
  <RouterLink
    :to="`/ruangan/${room.id}`"
    class="group block bg-white rounded-xl border border-line overflow-hidden transition-all duration-200 hover:border-ink-400"
  >
    <div class="relative aspect-[4/3] overflow-hidden bg-surface">
      <div class="absolute inset-0 flex items-center justify-center">
        <BaseIcon name="DoorOpen" :size="48" class="text-ink-300" />
      </div>
      <div class="absolute top-3 left-3">
        <span class="inline-flex px-2 py-1 bg-white/90 backdrop-blur-sm rounded text-xs font-medium text-ink-700">
          {{ room.type === 'belajar-mandiri' ? 'Belajar' : room.type === 'diskusi' ? 'Diskusi' : room.type === 'rapat' ? 'Rapat' : 'Kolaborasi' }}
        </span>
      </div>
    </div>

    <div class="p-4">
      <h3 class="font-display font-semibold text-ink-900 truncate">{{ room.name }}</h3>
      <p class="text-sm text-ink-500 mt-0.5">{{ room.building }} · Lantai {{ room.floor }}</p>

      <div class="flex items-center gap-3 mt-3 text-sm text-ink-500">
        <span class="flex items-center gap-1">
          <BaseIcon name="Users" :size="14" class="text-red-600" />
          Maks. 5 orang
        </span>
      </div>

      <div class="flex items-center gap-2 mt-3">
        <div
          v-for="fac in facilitiesList"
          :key="fac.id"
          class="flex items-center justify-center w-6 h-6 rounded bg-surface text-red-600"
          :title="fac.label"
        >
          <BaseIcon :name="fac.icon" :size="14" />
        </div>
        <span v-if="moreFacilities > 0" class="text-xs text-ink-400">+{{ moreFacilities }}</span>
      </div>

      <div class="mt-4">
        <div class="flex gap-0.5 h-1.5">
          <div
            v-for="(status, i) in slotStatuses"
            :key="i"
            :class="[
              'flex-1 first:rounded-l-sm last:rounded-r-sm',
              status === 'occupied' ? 'bg-ink-300 bg-[repeating-linear-gradient(45deg,transparent,transparent_1px,rgba(0,0,0,0.05)_1px,rgba(0,0,0,0.05)_2px)]' :
              status === 'past' ? 'bg-surface' :
              'bg-free-600'
            ]"
          />
        </div>
      </div>

      <div class="mt-3 flex items-center justify-between">
        <BaseBadge :variant="statusVariant">{{ statusText }}</BaseBadge>
        <span class="text-xs text-ink-400 group-hover:text-red-600 transition-colors">Lihat detail →</span>
      </div>
    </div>
  </RouterLink>
</template>