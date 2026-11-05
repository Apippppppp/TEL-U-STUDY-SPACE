<script setup>
import BaseIcon from '@/components/ui/BaseIcon.vue'

defineProps({
  modelValue: { type: String, default: '' },
  label: { type: String, default: '' },
  options: { type: Array, default: () => [] },
  placeholder: { type: String, default: '' },
  error: { type: String, default: '' },
  disabled: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label v-if="label" class="text-sm font-medium text-ink-700">{{ label }}</label>
    <div class="relative">
      <select
        :value="modelValue"
        :disabled="disabled"
        :class="[
          'w-full h-11 px-3 pr-8 rounded-md border bg-white text-ink-700 appearance-none cursor-pointer transition-colors',
          'focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600',
          error ? 'border-red-600' : 'border-line',
          disabled && 'bg-surface cursor-not-allowed'
        ]"
        @change="emit('update:modelValue', $event.target.value)"
      >
        <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
        <option v-for="opt in options" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </option>
      </select>
      <BaseIcon
        name="ChevronDown"
        :size="18"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 pointer-events-none"
      />
    </div>
    <p v-if="error" class="text-sm text-red-600 flex items-center gap-1">
      <BaseIcon name="AlertCircle" :size="14" />
      {{ error }}
    </p>
  </div>
</template>