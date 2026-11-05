<script setup>
defineProps({
  items: { type: Array, default: () => [] }
})
</script>

<template>
  <nav class="flex items-center gap-1 text-sm text-ink-500 flex-wrap">
    <template v-for="(item, index) in items" :key="index">
      <span v-if="index > 0" class="text-ink-400">›</span>
      <component
        :is="item.to ? 'RouterLink' : 'span'"
        :to="item.to"
        :class="item.to ? 'hover:text-red-600 transition-colors' : 'text-ink-700 font-medium'"
      >
        {{ item.label }}
      </component>
    </template>
  </nav>
</template>