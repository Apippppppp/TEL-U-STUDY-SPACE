<script setup>
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' }
})
</script>

<template>
  <div class="mb-6">
    <h1 class="text-2xl md:text-3xl font-display font-semibold text-ink-900">{{ title }}</h1>
    <p v-if="subtitle" class="mt-1 text-ink-500">{{ subtitle }}</p>
  </div>
</template>