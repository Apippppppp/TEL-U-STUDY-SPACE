<script setup>
import BaseIcon from '@/components/ui/BaseIcon.vue'

defineProps({
  modelValue: { type: Boolean, default: false },
  label: { type: String, default: '' },
  disabled: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <label class="flex items-center gap-2 cursor-pointer" :class="disabled && 'opacity-50 cursor-not-allowed'">
    <div class="relative">
      <input
        type="checkbox"
        :checked="modelValue"
        :disabled="disabled"
        class="sr-only peer"
        @change="emit('update:modelValue', $event.target.checked)"
      />
      <div class="w-5 h-5 border border-line rounded transition-colors peer-checked:bg-red-600 peer-checked:border-red-600 peer-focus-visible:ring-2 peer-focus-visible:ring-red-600 peer-focus-visible:ring-offset-2" />
      <BaseIcon
        name="Check"
        :size="14"
        class="absolute top-0.5 left-0.5 text-white opacity-0 peer-checked:opacity-100"
      />
    </div>
    <span class="text-sm text-ink-700">{{ label }}</span>
  </label>
</template>