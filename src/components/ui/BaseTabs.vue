<script setup>
defineProps({
  tabs: { type: Array, default: () => [] },
  modelValue: { type: String, default: '' }
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="flex border-b border-line overflow-x-auto">
    <button
      v-for="tab in tabs"
      :key="tab.value"
      :class="[
        'relative px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap',
        modelValue === tab.value ? 'text-red-600' : 'text-ink-500 hover:text-ink-700'
      ]"
      @click="emit('update:modelValue', tab.value)"
    >
      {{ tab.label }}
      <span v-if="tab.count !== undefined" class="ml-1.5 text-ink-400">({{ tab.count }})</span>
      <span
        v-if="modelValue === tab.value"
        class="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"
      />
    </button>
  </div>
</template>