<script setup>
import { computed } from 'vue'
import { OPERATIONAL_HOURS } from '@/utils/time'

const props = defineProps({
  slots: { type: Array, default: () => [] },
  disabled: { type: Boolean, default: false }
})

const emit = defineEmits(['select'])

const gridSlots = computed(() => {
  return OPERATIONAL_HOURS.map((time, index) => ({
    time,
    status: props.slots[index] || 'empty'
  }))
})

const getSlotClass = (status) => {
  switch (status) {
    case 'selected': return 'bg-red-600 text-white'
    case 'in-range': return 'bg-red-50 border border-red-100 text-ink-900'
    case 'occupied': return 'bg-surface text-ink-400 cursor-not-allowed bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,rgba(0,0,0,0.02)_2px,rgba(0,0,0,0.02)_4px)]'
    case 'past': return 'bg-surface text-ink-400 cursor-not-allowed'
    default: return 'bg-white border border-line text-ink-900 hover:border-ink-400'
  }
}

const getLabel = (status) => {
  switch (status) {
    case 'occupied': return 'terisi'
    case 'past': return 'lewat'
    default: return 'kosong'
  }
}
</script>

<template>
  <div class="grid grid-cols-3 gap-2" role="listbox" aria-label="Pilih waktu">
    <button
      v-for="slot in gridSlots"
      :key="slot.time"
      role="option"
      :class="[
        'h-12 rounded-md text-sm font-medium font-variant-numeric transition-all duration-100 active:scale-[0.98]',
        getSlotClass(slot.status)
      ]"
      :disabled="slot.status === 'occupied' || slot.status === 'past' || disabled"
      :aria-selected="slot.status === 'selected'"
      :aria-disabled="slot.status === 'occupied' || slot.status === 'past'"
      :aria-label="`${slot.time}, ${getLabel(slot.status)}`"
      @click="emit('select', slot.time)"
    >
      {{ slot.time }}
    </button>
  </div>
</template>