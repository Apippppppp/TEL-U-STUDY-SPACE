<script setup>
import BaseIcon from '@/components/ui/BaseIcon.vue'
import { useUiStore } from '@/stores/ui'

const ui = useUiStore()

const getIcon = (type) => {
  switch (type) {
    case 'success': return 'CheckCircle'
    case 'error': return 'AlertCircle'
    default: return 'Info'
  }
}
</script>

<template>
  <Teleport to="body">
    <div class="fixed z-50 bottom-4 right-4 md:top-4 md:bottom-auto flex flex-col gap-2">
      <TransitionGroup name="toast">
        <div
          v-for="toast in ui.toasts"
          :key="toast.id"
          :class="[
            'flex items-center gap-2 px-4 py-3 rounded-lg shadow-float min-w-[280px] max-w-sm',
            toast.type === 'success' ? 'bg-free-50 text-free-600' :
            toast.type === 'error' ? 'bg-red-50 text-red-600' :
            'bg-white text-ink-700'
          ]"
        >
          <BaseIcon :name="getIcon(toast.type)" :size="18" />
          <span class="text-sm flex-1">{{ toast.message }}</span>
          <button @click="ui.dismissToast(toast.id)" class="p-0.5 hover:opacity-70">
            <BaseIcon name="X" :size="16" />
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 180ms ease-out;
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(12px);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(12px);
}
</style>