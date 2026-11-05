<script setup>
import RoomCard from './RoomCard.vue'

defineProps({
  rooms: { type: Array, default: () => [] },
  bookings: { type: Array, default: () => [] },
  date: { type: String, default: '' },
  loading: { type: Boolean, default: false }
})
</script>

<template>
  <div>
    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="i in 6" :key="i" class="animate-pulse">
        <div class="aspect-[4/3] bg-surface rounded-xl" />
        <div class="p-4 space-y-3">
          <div class="h-5 bg-surface rounded w-3/4" />
          <div class="h-4 bg-surface rounded w-1/2" />
          <div class="h-4 bg-surface rounded w-1/3" />
        </div>
      </div>
    </div>

    <div v-else-if="rooms.length === 0" class="text-center py-12">
      <p class="text-ink-500">Tidak ada ruangan yang cocok.</p>
      <p class="text-sm text-ink-400 mt-1">Kurangi filter atau ganti tanggal.</p>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <RoomCard
        v-for="room in rooms"
        :key="room.id"
        :room="room"
        :bookings="bookings"
        :date="date"
      />
    </div>
  </div>
</template>