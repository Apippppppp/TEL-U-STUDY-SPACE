<script setup>
defineProps({
  active: { type: Boolean, default: false },
  clickable: { type: Boolean, default: false }
})
</script>

<template>
  <span
    :class="[
      'inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
      active
        ? 'bg-red-600 text-white'
        : clickable
          ? 'bg-white border border-line text-ink-700 hover:border-ink-400 cursor-pointer'
          : 'bg-surface text-ink-500'
    ]"
  >
    <slot />
  </span>
</template>