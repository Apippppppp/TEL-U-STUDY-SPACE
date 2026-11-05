<script setup>
import RoomCard from '@/components/room/RoomCard.vue'

defineProps({
  rooms: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false }
})

defineEmits(['view-all'])
</script>

<template>
  <section class="py-12 md:py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 md:px-8">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl md:text-2xl font-display font-semibold text-ink-900">Kosong hari ini</h2>
        <button
          class="text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
          @click="$emit('view-all')"
        >
          Lihat semua ruangan →
        </button>
      </div>

      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div v-for="i in 4" :key="i" class="animate-pulse">
          <div class="aspect-[4/3] bg-surface rounded-xl" />
          <div class="p-4 space-y-3">
            <div class="h-5 bg-surface rounded w-3/4" />
            <div class="h-4 bg-surface rounded w-1/2" />
          </div>
        </div>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <RoomCard v-for="room in rooms" :key="room.id" :room="room" />
      </div>
    </div>
  </section>
</template>