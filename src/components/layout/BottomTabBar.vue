<script setup>
import { useRoute } from 'vue-router'
import BaseIcon from '@/components/ui/BaseIcon.vue'

const route = useRoute()

const tabs = [
  { to: '/', icon: 'Home', label: 'Beranda' },
  { to: '/ruangan', icon: 'Search', label: 'Cari' },
  { to: '/reservasi-saya', icon: 'CalendarCheck', label: 'Reservasi' },
  { to: '/profil', icon: 'User', label: 'Profil' },
]
</script>

<template>
  <nav class="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-line md:hidden safe-area-bottom">
    <div class="flex items-center justify-around h-16">
      <RouterLink
        v-for="tab in tabs"
        :key="tab.to"
        :to="tab.to"
        :class="[
          'flex flex-col items-center justify-center w-full h-full gap-1 transition-colors',
          route.path === tab.to ? 'text-red-600' : 'text-ink-400'
        ]"
      >
        <BaseIcon :name="tab.icon" :size="22" />
        <span class="text-[10px] font-medium">{{ tab.label }}</span>
      </RouterLink>
    </div>
  </nav>
</template>

<style scoped>
.safe-area-bottom {
  padding-bottom: env(safe-area-inset-bottom, 0);
}
</style>