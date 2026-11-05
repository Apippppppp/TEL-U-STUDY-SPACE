<script setup>
import BaseIcon from '@/components/ui/BaseIcon.vue'

defineProps({
  open: { type: Boolean, default: false },
  title: { type: String, default: '' }
})

const emit = defineEmits(['close'])
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="emit('close')">
        <div class="absolute inset-0 bg-ink-900/40" />
        <div class="relative bg-white rounded-xl shadow-float w-full max-w-md p-6">
          <div v-if="title" class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-ink-900">{{ title }}</h3>
            <button @click="emit('close')" class="p-1 text-ink-400 hover:text-ink-700">
              <BaseIcon name="X" :size="20" />
            </button>
          </div>
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 200ms ease-out, transform 200ms ease-out;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>