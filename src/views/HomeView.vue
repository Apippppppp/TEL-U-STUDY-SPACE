<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useRoomsStore } from '@/stores/rooms'
import AppNavbar from '@/components/layout/AppNavbar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import BottomTabBar from '@/components/layout/BottomTabBar.vue'
import HeroSearch from '@/components/home/HeroSearch.vue'
import LiveAvailabilityCard from '@/components/home/LiveAvailabilityCard.vue'
import HowItWorks from '@/components/home/HowItWorks.vue'
import ServiceRules from '@/components/home/ServiceRules.vue'
import FaqList from '@/components/home/FaqList.vue'

const router = useRouter()
const roomsStore = useRoomsStore()

onMounted(() => {
  roomsStore.fetchRooms()
  roomsStore.fetchAvailableNow()
})

const goToRooms = () => {
  router.push('/ruangan')
}
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <AppNavbar />

    <main class="flex-1">
      <HeroSearch />
      <LiveAvailabilityCard
        :rooms="roomsStore.availableNow.rooms"
        :loading="roomsStore.loading"
        @view-all="goToRooms"
      />
      <HowItWorks />
      <ServiceRules />
      <FaqList />
    </main>

    <AppFooter />
    <BottomTabBar />
  </div>
</template>