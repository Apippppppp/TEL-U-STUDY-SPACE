<script setup>
import BaseIcon from '@/components/ui/BaseIcon.vue'

defineProps({
  photos: { type: Array, default: () => [] },
  name: { type: String, default: '' }
})
</script>

<template>
  <div class="grid grid-cols-4 gap-2">
    <div class="col-span-4 md:col-span-2 aspect-[4/3] rounded-xl bg-surface overflow-hidden">
      <div class="w-full h-full flex items-center justify-center">
        <BaseIcon name="DoorOpen" :size="64" class="text-ink-300" />
      </div>
    </div>
    <div class="hidden md:block aspect-[4/3] rounded-xl bg-surface overflow-hidden">
      <div class="w-full h-full flex items-center justify-center">
        <BaseIcon name="DoorOpen" :size="32" class="text-ink-300" />
      </div>
    </div>
    <div class="hidden md:block aspect-[4/3] rounded-xl bg-surface overflow-hidden relative">
      <div class="w-full h-full flex items-center justify-center">
        <BaseIcon name="DoorOpen" :size="32" class="text-ink-300" />
      </div>
      <button class="absolute inset-0 bg-ink-900/40 flex items-center justify-center text-white text-sm font-medium rounded-xl">
        Lihat semua foto
      </button>
    </div>
  </div>
</template>