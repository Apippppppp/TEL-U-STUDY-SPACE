<script setup>
import { computed } from 'vue'
import { OPERATIONAL_HOURS } from '@/utils/time'

const props = defineProps({
  slots: { type: Array, default: () => [] },
  size: { type: String, default: 'sm' },
  showNow: { type: Boolean, default: false }
})

const emit = defineEmits(['click'])

const segments = computed(() => {
  return OPERATIONAL_HOURS.map((time, index) => ({
    time,
    status: props.slots[index] || 'empty'
  }))
})

const nowIndex = computed(() => {
  if (!props.showNow) return -1
  const hour = new Date().getHours()
  if (hour < 7 || hour >= 21) return -1
  return hour - 7
})

const getSegmentClass = (status) => {
  switch (status) {
    case 'selected': return 'bg-red-600'
    case 'in-range': return 'bg-red-50 border border-red-100'
    case 'occupied': return 'bg-surface bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]'
    case 'past': return 'bg-surface'
    default: return 'bg-white border border-line'
  }
}
</script>

<template>
  <div
    :class="[
      'relative flex gap-0.5',
      size === 'sm' ? 'h-1.5' : 'h-12'
    ]"
  >
    <button
      v-for="seg in segments"
      :key="seg.time"
      :class="[
        'flex-1 first:rounded-l-sm last:rounded-r-sm transition-colors duration-120',
        getSegmentClass(seg.status),
        size === 'sm' ? '' : 'rounded-md'
      ]"
      :disabled="seg.status === 'occupied' || seg.status === 'past'"
      :aria-label="`${seg.time}, ${seg.status === 'occupied' ? 'terisi' : seg.status === 'past' ? 'lewat' : 'kosong'}`"
      :aria-pressed="seg.status === 'selected'"
      @click="emit('click', seg.time)"
    >
      <span v-if="size === 'lg' && seg.status === 'selected'" class="sr-only">
        {{ seg.time }}
      </span>
    </button>

    <div
      v-if="nowIndex >= 0 && size === 'sm'"
      class="absolute w-0.5 h-full bg-red-600 -top-0.5"
      :style="{ left: `calc(${(nowIndex / 14) * 100}% + ${nowIndex * 2}px)` }"
    />
  </div>
</template>