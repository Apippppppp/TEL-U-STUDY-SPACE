<script setup>
defineProps({
  variant: { type: String, default: 'primary' },
  size: { type: String, default: 'md' },
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  type: { type: String, default: 'button' }
})

const emit = defineEmits(['click'])
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="[
      'inline-flex items-center justify-center font-medium transition-all duration-100 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed',
      variant === 'secondary'
        ? 'border border-line bg-white text-ink-700 hover:bg-surface hover:border-ink-400'
        : variant === 'text'
          ? 'text-red-600 hover:text-red-700 hover:bg-red-50'
          : 'bg-red-600 text-white hover:bg-red-700',
      size === 'sm' ? 'h-8 px-3 text-sm rounded-md' :
      size === 'lg' ? 'h-12 px-6 text-base rounded-lg' :
      'h-11 px-5 text-base rounded-md'
    ]"
    @click="emit('click', $event)"
  >
    <span v-if="loading" class="mr-2 animate-spin">
      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
      </svg>
    </span>
    <slot />
  </button>
</template>