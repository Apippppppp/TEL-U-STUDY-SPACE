<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBookingsStore } from '@/stores/bookings'
import { useRoomsStore } from '@/stores/rooms'
import { useUiStore } from '@/stores/ui'
import PageContainer from '@/components/layout/PageContainer.vue'
import PageHeader from '@/components/layout/PageHeader.vue'
import AppNavbar from '@/components/layout/AppNavbar.vue'
import BottomTabBar from '@/components/layout/BottomTabBar.vue'
import BaseTabs from '@/components/ui/BaseTabs.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import BaseEmptyState from '@/components/ui/BaseEmptyState.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import { format, parseISO, isSameDay, isBefore } from 'date-fns'
import { id } from 'date-fns/locale'

const router = useRouter()
const bookingsStore = useBookingsStore()
const roomsStore = useRoomsStore()
const uiStore = useUiStore()

const activeTab = ref('upcoming')

const tabs = computed(() => [
  { value: 'upcoming', label: 'Mendatang', count: bookingsStore.upcomingCount },
  { value: 'completed', label: 'Selesai', count: bookingsStore.completedCount },
  { value: 'cancelled', label: 'Dibatalkan', count: bookingsStore.cancelledCount },
])

const nextBooking = computed(() => {
  const now = new Date()
  return bookingsStore.upcomingBookings.find(b => {
    const bookingDate = parseISO(b.date)
    return isSameDay(bookingDate, now) || isBefore(now, bookingDate)
  })
})

const currentBookings = computed(() => {
  switch (activeTab.value) {
    case 'upcoming':
      return bookingsStore.upcomingBookings.filter(b => b.code !== nextBooking.value?.code)
    case 'completed': return bookingsStore.completedBookings
    case 'cancelled': return bookingsStore.cancelledBookings
    default: return []
  }
})

const getRoomName = (roomId) => roomsStore.getRoomById(roomId)?.name || 'Ruangan'

const formatDateDisplay = (dateStr) => {
  try {
    return format(parseISO(dateStr), 'EEE, d MMM', { locale: id })
  } catch {
    return dateStr
  }
}

const showQr = (code) => router.push(`/reservasi-saya/${code}`)
const goToSearch = () => router.push('/ruangan')

const handleCheckout = async (code) => {
  const success = await bookingsStore.checkoutBooking(code)
  if (success) {
    uiStore.showToast('Reservasi berhasil di-checkout', 'success')
  } else {
    uiStore.showToast('Gagal melakukan checkout', 'error')
  }
}

// Auto-detect: reservasi berstatus "upcoming" = siap checkout
const canCheckout = (booking) => booking.status === 'upcoming'

onMounted(async () => {
  await bookingsStore.fetchBookings()
  await roomsStore.fetchRooms()
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <AppNavbar />

    <main class="flex-1 pb-20">
      <PageContainer size="lg">
        <PageHeader title="Reservasi saya" />

        <BaseTabs v-model="activeTab" :tabs="tabs" />

        <div v-if="activeTab === 'upcoming' && nextBooking" class="mt-6">
          <p class="text-sm text-ink-500 mb-3">Berikutnya, hari ini</p>
          <div class="bg-white border border-line rounded-xl p-4 flex gap-4">
            <div class="w-20 h-16 bg-surface rounded-lg flex items-center justify-center flex-shrink-0">
              <BaseIcon name="DoorOpen" :size="24" class="text-ink-300" />
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="font-medium text-ink-900 truncate">{{ getRoomName(nextBooking.roomId) }}</h3>
              <p class="text-sm text-ink-500">
                {{ formatDateDisplay(nextBooking.date) }} · {{ nextBooking.start }}–{{ nextBooking.end }}
              </p>
              <div class="flex flex-col items-end gap-2 mt-2">
                <BaseBadge variant="success" size="sm">Reservasi</BaseBadge>
                <div class="flex items-center gap-3">
                  <button
                    class="min-w-[120px] px-3 py-1 border border-line rounded text-xs text-ink-600 hover:border-ink-400 hover:text-ink-900 transition-colors"
                    @click="showQr(nextBooking.code)"
                  >
                    Lihat detail
                  </button>
                  <button
                    v-if="canCheckout(nextBooking)"
                    class="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded transition-colors"
                    @click="handleCheckout(nextBooking.code)"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-4 space-y-3">
          <template v-if="currentBookings.length > 0">
            <div
              v-for="booking in currentBookings"
              :key="booking.code"
              class="bg-white border border-line rounded-xl p-4 flex gap-4"
            >
              <div class="w-16 h-14 bg-surface rounded-lg flex items-center justify-center flex-shrink-0">
                <BaseIcon name="DoorOpen" :size="20" class="text-ink-300" />
              </div>
              <div class="flex-1 min-w-0">
                <div>
                  <h3 class="font-medium text-ink-900 truncate">{{ getRoomName(booking.roomId) }}</h3>
                  <p class="text-sm text-ink-500">
                    {{ formatDateDisplay(booking.date) }} · {{ booking.start }}–{{ booking.end }}
                  </p>
                </div>
                <div class="flex flex-col items-end gap-2 mt-2 text-xs">
                  <BaseBadge
                    size="sm"
                    :variant="booking.status === 'upcoming' ? 'success' : booking.status === 'cancelled' ? 'error' : 'default'"
                  >
                    {{ booking.status === 'upcoming' ? 'Reservasi' : booking.status === 'completed' ? 'Selesai' : 'Dibatalkan' }}
                  </BaseBadge>
                  <div class="flex items-center gap-3">
                    <button
                      class="min-w-[120px] px-3 py-1 border border-line rounded text-ink-600 hover:border-ink-400 hover:text-ink-900 transition-colors"
                      @click="showQr(booking.code)"
                    >
                      Lihat detail
                    </button>
                    <button
                      v-if="canCheckout(booking)"
                      class="px-3 py-1 bg-red-600 hover:bg-red-700 text-white font-medium rounded transition-colors"
                      @click="handleCheckout(booking.code)"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <BaseEmptyState
            v-else-if="activeTab !== 'upcoming' || !nextBooking"
            :title="activeTab === 'upcoming' ? 'Belum ada reservasi mendatang' : activeTab === 'completed' ? 'Belum ada riwayat' : 'Tidak ada pembatalan'"
            :description="activeTab === 'upcoming' ? 'Pilih ruangan dan jam yang kamu butuhkan. Reservasi akan muncul di sini.' : ''"
          >
            <template v-if="activeTab === 'upcoming'" #action>
              <BaseButton variant="secondary" @click="goToSearch">Cari ruangan</BaseButton>
            </template>
          </BaseEmptyState>
        </div>
      </PageContainer>
    </main>

    <BottomTabBar />
  </div>
</template>