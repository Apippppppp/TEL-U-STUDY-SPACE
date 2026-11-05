<script setup>
import { ref, computed } from 'vue'
import { addDays, format, isBefore, startOfDay } from 'date-fns'
import { id } from 'date-fns/locale'
import BaseIcon from '@/components/ui/BaseIcon.vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
  minDate: { type: String, default: '' },
  maxDate: { type: Date, default: null },
  disabledDays: { type: Array, default: () => [] }
})

const emit = defineEmits(['update:modelValue'])

const today = startOfDay(new Date())
const startDate = props.minDate ? new Date(props.minDate) : today
const maxDate = props.maxDate || addDays(today, 30)

const currentStart = ref(startDate)

const days = computed(() => {
  const result = []
  for (let i = 0; i < 7; i++) {
    const d = addDays(currentStart.value, i)
    if (isBefore(d, startOfDay(today))) {
      result.push({ date: d, disabled: true })
    } else if (props.disabledDays.includes(d.getDay())) {
      result.push({ date: d, disabled: true })
    } else if (isBefore(d, startDate) || isBefore(maxDate, d)) {
      result.push({ date: d, disabled: true })
    } else {
      result.push({ date: d, disabled: false })
    }
  }
  return result
})

const formatDay = (d) => format(d, 'EEE', { locale: id })
const formatDate = (d) => format(d, 'd')
const formatFull = (d) => format(d, 'yyyy-MM-dd')

const selectDate = (d, disabled) => {
  if (disabled) return
  emit('update:modelValue', formatFull(d))
}

const canGoPrev = computed(() => currentStart.value > startDate)
const canGoNext = computed(() => addDays(currentStart.value, 7) <= maxDate)

const goPrev = () => { currentStart.value = addDays(currentStart.value, -7) }
const goNext = () => { currentStart.value = addDays(currentStart.value, 7) }
</script>

<template>
  <div class="flex items-center gap-2">
    <button
      :disabled="!canGoPrev"
      class="p-1.5 rounded-md hover:bg-surface disabled:opacity-30 disabled:cursor-not-allowed"
      @click="goPrev"
    >
      <BaseIcon name="ChevronLeft" :size="18" />
    </button>

    <div class="flex-1 flex justify-between gap-1">
      <button
        v-for="d in days"
        :key="d.date.toISOString()"
        :disabled="d.disabled"
        :class="[
          'flex-1 flex flex-col items-center py-2 rounded-md transition-colors min-w-[44px]',
          d.disabled ? 'opacity-40 cursor-not-allowed' : 'hover:bg-surface cursor-pointer',
          formatFull(d.date) === modelValue ? 'bg-red-600 text-white hover:bg-red-700' : 'text-ink-700'
        ]"
        @click="selectDate(d.date, d.disabled)"
      >
        <span class="text-[10px] uppercase font-medium">{{ formatDay(d.date) }}</span>
        <span class="text-sm font-semibold">{{ formatDate(d.date) }}</span>
      </button>
    </div>

    <button
      :disabled="!canGoNext"
      class="p-1.5 rounded-md hover:bg-surface disabled:opacity-30 disabled:cursor-not-allowed"
      @click="goNext"
    >
      <BaseIcon name="ChevronRight" :size="18" />
    </button>
  </div>
</template>