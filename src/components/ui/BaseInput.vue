<script setup>
import BaseIcon from '@/components/ui/BaseIcon.vue'

defineProps({
  modelValue: { type: String, default: '' },
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  type: { type: String, default: 'text' },
  error: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  autocomplete: { type: String, default: '' }
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label v-if="label" class="text-sm font-medium text-ink-700">{{ label }}</label>
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :autocomplete="autocomplete"
      :class="[
        'w-full h-11 px-3 rounded-md border bg-white text-ink-700 placeholder:text-ink-400 transition-colors',
        'focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600',
        error ? 'border-red-600' : 'border-line',
        disabled && 'bg-surface cursor-not-allowed'
      ]"
      @input="emit('update:modelValue', $event.target.value)"
    />
    <p v-if="error" class="text-sm text-red-600 flex items-center gap-1">
      <BaseIcon name="AlertCircle" :size="14" />
      {{ error }}
    </p>
  </div>
</template>