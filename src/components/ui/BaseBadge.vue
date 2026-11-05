<script setup>
defineProps({
  variant: { type: String, default: 'default' },
  size: { type: String, default: 'md' }
})
</script>

<template>
  <span
    :class="[
      'inline-flex items-center rounded font-medium',
      size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2 py-0.5 text-xs',
      variant === 'success' ? 'bg-free-50 text-free-600' :
      variant === 'warning' ? 'bg-busy-50 text-busy-600' :
      variant === 'error' ? 'bg-red-50 text-red-600' :
      'bg-surface text-ink-500'
    ]"
  >
    <slot />
  </span>
</template>