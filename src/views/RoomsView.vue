<script setup>
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useRoomsStore } from '@/stores/rooms'
import PageContainer from '@/components/layout/PageContainer.vue'
import PageHeader from '@/components/layout/PageHeader.vue'
import AppNavbar from '@/components/layout/AppNavbar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import BottomTabBar from '@/components/layout/BottomTabBar.vue'
import RoomGrid from '@/components/room/RoomGrid.vue'
import RoomFilters from '@/components/room/RoomFilters.vue'

const route = useRoute()
const roomsStore = useRoomsStore()

onMounted(async () => {
  await roomsStore.fetchRooms()

  if (route.query.date) roomsStore.setFilter({ date: route.query.date })
  if (route.query.start) roomsStore.setFilter({ startTime: route.query.start })
  if (route.query.end) roomsStore.setFilter({ endTime: route.query.end })
  if (route.query.participants) {
    const p = parseInt(route.query.participants)
    if (p <= 2) roomsStore.setFilter({ capacity: '1-2' })
    else if (p <= 6) roomsStore.setFilter({ capacity: '3-6' })
    else if (p <= 10) roomsStore.setFilter({ capacity: '7-10' })
    else roomsStore.setFilter({ capacity: '11-20' })
  }

  await roomsStore.applyFilter()
})

watch(() => roomsStore.filter, async () => {
  await roomsStore.applyFilter()
}, { deep: true })
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <AppNavbar />

    <main class="flex-1 pb-20">
      <PageContainer size="lg">
        <PageHeader title="Cari ruangan" subtitle="Pilih ruangan yang sesuai dengan kebutuhanmu" />

        <div class="grid lg:grid-cols-12 gap-8">
          <aside class="lg:col-span-3">
            <div class="lg:sticky lg:top-24">
              <RoomFilters
                v-model:facilities="roomsStore.filter.facilities"
                v-model:only-available="roomsStore.filter.onlyAvailable"
              />
            </div>
          </aside>

          <div class="lg:col-span-9">
            <div class="flex items-center justify-between mb-4">
              <p class="text-sm text-ink-500">
                Menampilkan {{ roomsStore.rooms.length }} ruangan
              </p>
              <select
                :value="roomsStore.filter.sortBy"
                class="text-sm border border-line rounded-md px-3 py-1.5 bg-white"
                @change="roomsStore.setFilter({ sortBy: $event.target.value })"
              >
                <option value="relevant">Paling sesuai</option>
                <option value="capacity">Kapasitas</option>
                <option value="nearest">Terdekat</option>
              </select>
            </div>

            <RoomGrid
              :rooms="roomsStore.rooms"
              :bookings="roomsStore.bookings"
              :date="roomsStore.filter.date"
              :loading="roomsStore.loading"
            />
          </div>
        </div>
      </PageContainer>
    </main>

    <AppFooter />
    <BottomTabBar />
  </div>
</template>