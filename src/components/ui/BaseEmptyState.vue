<script setup>
import BaseIcon from '@/components/ui/BaseIcon.vue'

defineProps({
  title: { type: String, required: true },
  description: { type: String, default: '' }
})
</script>

<template>
  <div class="flex flex-col items-center justify-center py-12 px-4 text-center">
    <div class="w-16 h-16 rounded-full bg-surface flex items-center justify-center mb-4">
      <BaseIcon name="Inbox" :size="28" class="text-ink-400" />
    </div>
    <h3 class="text-lg font-semibold text-ink-900 mb-1">{{ title }}</h3>
    <p v-if="description" class="text-sm text-ink-500 max-w-sm">{{ description }}</p>
    <div v-if="$slots.action" class="mt-4">
      <slot name="action" />
    </div>
  </div>
</template>