<script setup>
import { ref, nextTick, onMounted } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useRoomsStore } from '@/stores/rooms'
import BaseIcon from '@/components/ui/BaseIcon.vue'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const roomsStore = useRoomsStore()
const isMenuOpen = ref(false)

const searchOpen = ref(false)
const searchQuery = ref('')
const searchInput = ref(null)

const navLinks = [
  { to: '/', label: 'Beranda' },
  { to: '/ruangan', label: 'Cari Ruangan' },
  { to: '/reservasi-saya', label: 'Reservasi Saya' },
]

const toggleSearch = async () => {
  searchOpen.value = !searchOpen.value
  if (searchOpen.value) {
    await nextTick()
    searchInput.value?.focus()
  }
}

const applySearch = () => {
  roomsStore.setFilter({ search: searchQuery.value })
  if (route.path !== '/ruangan') router.push('/ruangan')
}

onMounted(() => {
  auth.init()
})
</script>

<template>
  <header class="sticky top-0 z-40 bg-white border-b border-line">
    <div class="max-w-7xl mx-auto px-4 md:px-8">
      <div class="flex items-center justify-between h-16">
        <RouterLink to="/" class="flex items-center gap-2">
          <img
            src="https://b856188.assetcdn.net/2.0/856188/wp-content/uploads/2022/02/logo3-e1511767184374.png"
            alt="Telkom University"
            class="h-8 w-auto"
          />
          <span class="font-display font-semibold text-lg text-ink-900">StudySpace</span>
        </RouterLink>

        <nav class="hidden md:flex items-center gap-6">
          <RouterLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            :class="[
              'text-sm font-medium transition-colors',
              route.path === link.to ? 'text-red-600' : 'text-ink-500 hover:text-ink-700'
            ]"
          >
            {{ link.label }}
          </RouterLink>
        </nav>

        <div class="flex items-center gap-3">
          <button
            class="p-2 text-ink-500 hover:text-red-600 transition-colors"
            aria-label="Cari ruangan"
            @click="toggleSearch"
          >
            <BaseIcon :name="searchOpen ? 'X' : 'Search'" :size="20" />
          </button>

          <template v-if="auth.isLoggedIn">
            <RouterLink
              to="/profil"
              class="flex items-center gap-2 text-sm text-ink-700 hover:text-red-600 transition-colors"
            >
              <div class="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center text-sm font-medium">
                {{ auth.student?.avatarInitial }}
              </div>
              <span class="hidden sm:block">{{ auth.student?.name?.split(' ')[0] }}</span>
            </RouterLink>
          </template>
          <template v-else>
            <RouterLink to="/masuk" class="text-sm font-medium text-ink-500 hover:text-red-600 transition-colors">
              Masuk
            </RouterLink>
            <RouterLink to="/masuk" class="inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors">
              Daftar
            </RouterLink>
          </template>

          <button
            class="md:hidden p-2 text-ink-500"
            @click="isMenuOpen = !isMenuOpen"
          >
            <BaseIcon :name="isMenuOpen ? 'X' : 'Menu'" :size="24" />
          </button>
        </div>
      </div>
    </div>

    <Transition name="slide">
      <div v-if="searchOpen" class="border-t border-line bg-white">
        <div class="max-w-7xl mx-auto px-4 md:px-8 py-3">
          <div class="relative">
            <BaseIcon name="Search" :size="18" class="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
            <input
              ref="searchInput"
              v-model="searchQuery"
              type="text"
              placeholder="Cari nama ruangan atau gedung..."
              class="w-full h-11 pl-10 pr-4 rounded-lg border border-line bg-white text-ink-700 placeholder:text-ink-400 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
              @input="applySearch"
            />
          </div>
        </div>
      </div>
    </Transition>

    <Transition name="slide">
      <div v-if="isMenuOpen" class="md:hidden border-t border-line bg-white">
        <nav class="flex flex-col p-4 gap-2">
          <RouterLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="px-4 py-3 rounded-lg text-sm font-medium transition-colors"
            :class="route.path === link.to ? 'bg-red-50 text-red-600' : 'text-ink-700 hover:bg-surface'"
            @click="isMenuOpen = false"
          >
            {{ link.label }}
          </RouterLink>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 200ms ease-out;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>