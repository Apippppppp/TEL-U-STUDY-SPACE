<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { format } from 'date-fns'
import { useRoomsStore } from '@/stores/rooms'
import { useBookingsStore } from '@/stores/bookings'
import PageContainer from '@/components/layout/PageContainer.vue'
import AppNavbar from '@/components/layout/AppNavbar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import BottomTabBar from '@/components/layout/BottomTabBar.vue'
import BaseBreadcrumb from '@/components/ui/BaseBreadcrumb.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import RoomGallery from '@/components/room/RoomGallery.vue'
import BookingPanel from '@/components/schedule/BookingPanel.vue'
import { FACILITIES } from '@/data/facilities'
import { formatCapacity } from '@/utils/format'

const route = useRoute()
const router = useRouter()
const roomsStore = useRoomsStore()
const bookingsStore = useBookingsStore()

const roomId = route.params.id
const room = computed(() => roomsStore.getRoomById(roomId))

const selectedDate = ref(format(new Date(), 'yyyy-MM-dd'))
const selectedStart = ref('')
const selectedEnd = ref('')

const roomBookings = computed(() => bookingsStore.getRoomBookings(roomId, selectedDate.value))

const facilitiesList = computed(() => {
  if (!room.value) return []
  return room.value.facilities.map(f => FACILITIES[f]).filter(Boolean)
})

const openNow = computed(() => {
  if (!room.value) return false
  const now = new Date()
  return room.value.openDays.includes(now.getDay()) &&
    now.getHours() >= room.value.openHour &&
    now.getHours() < room.value.closeHour
})

const getCrowdLevel = (hour) => {
  if (!room.value) return 'low'
  const idx = hour - room.value.openHour
  if (idx < 0 || idx >= room.value.crowd.length) return 'low'
  const val = room.value.crowd[idx]
  if (val < 0.33) return 'low'
  if (val < 0.66) return 'medium'
  return 'high'
}

const handleReserve = () => {
  if (!selectedStart.value || !selectedEnd.value) return
  const query = new URLSearchParams({
    ruangan: roomId,
    tanggal: selectedDate.value,
    mulai: selectedStart.value,
    selesai: selectedEnd.value
  }).toString()
  router.push(`/reservasi/baru?${query}`)
}

onMounted(async () => {
  await roomsStore.fetchRooms()
  await bookingsStore.fetchBookings()

  if (route.query.tanggal) selectedDate.value = route.query.tanggal
  if (route.query.mulai) selectedStart.value = route.query.mulai
  if (route.query.selesai) selectedEnd.value = route.query.selesai
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <AppNavbar />

    <main class="flex-1 pb-20">
      <PageContainer size="lg">
        <div class="py-4">
          <BaseBreadcrumb :items="[
            { label: 'Home', to: '/' },
            { label: 'Cari Ruangan', to: '/ruangan' },
            { label: room?.name || 'Ruangan' }
          ]" />
        </div>

        <div v-if="!room" class="py-12 text-center">
          <p class="text-ink-500">Ruangan tidak ditemukan</p>
        </div>

        <template v-else>
          <RoomGallery :photos="room.photos" :name="room.name" />

          <div class="grid lg:grid-cols-12 gap-8 mt-6">
            <div class="lg:col-span-8">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <h1 class="text-2xl md:text-3xl font-display font-semibold text-ink-900">
                    {{ room.name }}
                  </h1>
                  <p class="text-ink-500 mt-1">{{ room.building }} · Lantai {{ room.floor }}</p>
                </div>
                <BaseBadge :variant="openNow ? 'success' : 'warning'">
                  {{ openNow ? 'Buka sekarang' : 'Tutup' }}
                </BaseBadge>
              </div>

              <div class="flex items-center gap-4 mt-3 text-sm text-ink-500 flex-wrap">
                <span class="flex items-center gap-1">
                  <BaseIcon name="Users" :size="16" />
                  {{ formatCapacity(room.capacityMin, room.capacityMax) }}
                </span>
                <span class="flex items-center gap-1">
                  <BaseIcon name="Clock" :size="16" />
                  Buka {{ room.openHour }}:00–{{ room.closeHour }}:00
                </span>
                <span>{{ room.type === 'belajar-mandiri' ? 'Belajar Mandiri' : room.type === 'diskusi' ? 'Diskusi' : room.type === 'rapat' ? 'Rapat' : 'Kolaborasi' }}</span>
              </div>

              <section class="mt-8">
                <h2 class="text-lg font-display font-semibold text-ink-900 mb-2">Deskripsi</h2>
                <p class="text-ink-500">{{ room.description }}</p>
              </section>

              <section class="mt-8">
                <h2 class="text-lg font-display font-semibold text-ink-900 mb-3">Fasilitas</h2>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div
                    v-for="fac in facilitiesList"
                    :key="fac.id"
                    class="flex items-center gap-2 text-sm text-ink-700"
                  >
                    <BaseIcon :name="fac.icon" :size="18" class="text-ink-400" />
                    {{ fac.label }}
                  </div>
                </div>
              </section>

              <section class="mt-8">
                <h2 class="text-lg font-display font-semibold text-ink-900 mb-2">Aturan penggunaan</h2>
                <ul class="list-disc list-inside text-ink-500 space-y-1">
                  <li v-for="rule in room.rules" :key="rule">{{ rule }}</li>
                </ul>
              </section>

              <section class="mt-8">
                <h2 class="text-lg font-display font-semibold text-ink-900 mb-3">Keramaian per jam</h2>
                <div class="flex gap-1 h-8">
                  <div
                    v-for="h in 14"
                    :key="h"
                    :class="[
                      'flex-1 rounded-sm',
                      getCrowdLevel(room.openHour + h - 1) === 'low' ? 'bg-free-600' :
                      getCrowdLevel(room.openHour + h - 1) === 'medium' ? 'bg-busy-600' :
                      'bg-ink-400'
                    ]"
                    :title="`${(room.openHour + h - 1).toString().padStart(2, '0')}:00`"
                  />
                </div>
                <div class="flex justify-between text-xs text-ink-400 mt-1">
                  <span>{{ room.openHour }}:00</span>
                  <span>{{ room.closeHour }}:00</span>
                </div>
              </section>

              <section class="mt-8">
                <h2 class="text-lg font-display font-semibold text-ink-900 mb-3">
                  Ruangan lain di {{ room.building }}
                </h2>
                <p class="text-sm text-ink-500">Lihat ruangan lain di gedung yang sama.</p>
              </section>
            </div>

            <aside class="lg:col-span-4">
              <BookingPanel
                v-model:date="selectedDate"
                v-model:start="selectedStart"
                v-model:end="selectedEnd"
                :bookings="roomBookings"
                @reserve="handleReserve"
              />
            </aside>
          </div>
        </template>
      </PageContainer>
    </main>

    <AppFooter />
    <BottomTabBar />
  </div>
</template>