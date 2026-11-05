<script setup>
defineProps({
  size: { type: String, default: 'md' }
})
</script>

<template>
  <div
    :class="[
      'mx-auto w-full px-4 md:px-8',
      size === 'sm' ? 'max-w-3xl' : size === 'lg' ? 'max-w-7xl' : 'max-w-5xl'
    ]"
  >
    <slot />
  </div>
</template>