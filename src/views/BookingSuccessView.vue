<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { format, parseISO, subMinutes } from 'date-fns'
import { id } from 'date-fns/locale'
import { useBookingsStore } from '@/stores/bookings'
import { useRoomsStore } from '@/stores/rooms'
import PageContainer from '@/components/layout/PageContainer.vue'
import AppNavbar from '@/components/layout/AppNavbar.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import { formatDuration, formatTimeRange } from '@/utils/format'
import { generateQrDataUrl } from '@/utils/qr'
import { downloadIcsFile } from '@/utils/ics'

const route = useRoute()
const router = useRouter()
const bookingsStore = useBookingsStore()
const roomsStore = useRoomsStore()

const code = route.params.kode
const booking = computed(() => bookingsStore.getBookingByCode(code))
const room = computed(() => booking.value ? roomsStore.getRoomById(booking.value.roomId) : null)

const qrDataUrl = ref('')
const showAnimation = ref(false)

const dateDisplay = computed(() => {
  if (!booking.value) return ''
  try {
    return format(parseISO(booking.value.date), 'EEEE, d MMMM yyyy', { locale: id })
  } catch {
    return booking.value.date
  }
})

const activeTime = computed(() => {
  if (!booking.value) return ''
  const startDate = parseISO(`${booking.value.date}T${booking.value.start}:00`)
  return format(subMinutes(startDate, 15), 'HH:mm')
})

const generateQr = async () => {
  if (booking.value) qrDataUrl.value = await generateQrDataUrl(booking.value)
}

const handleAddToCalendar = () => {
  if (booking.value) downloadIcsFile(booking.value)
}

const goToDetail = () => router.push(`/reservasi-saya/${code}`)
const goHome = () => router.push('/')

onMounted(async () => {
  await bookingsStore.fetchBookings()
  await roomsStore.fetchRooms()
  await generateQr()
  showAnimation.value = true
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <AppNavbar />

    <main class="flex-1 py-8 pb-20">
      <PageContainer size="sm">
        <div v-if="!booking" class="text-center py-12">
          <p class="text-ink-500">Reservasi tidak ditemukan</p>
          <BaseButton variant="secondary" class="mt-4" @click="goHome">Kembali ke beranda</BaseButton>
        </div>

        <template v-else>
          <div
            class="text-center mb-8 transition-all duration-300"
            :class="showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          >
            <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-free-50 flex items-center justify-center">
              <BaseIcon name="Check" :size="32" class="text-free-600" />
            </div>
            <h1 class="text-2xl font-display font-semibold text-ink-900">Reservasi berhasil</h1>
            <p class="text-ink-500 mt-1">Tunjukkan QR ini di pintu ruangan.</p>
          </div>

          <div
            class="bg-white rounded-2xl shadow-float overflow-hidden transition-all duration-300 delay-100"
            :class="showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          >
            <div class="relative h-px bg-line">
              <div class="absolute left-1/2 -translate-x-1/2 -top-3 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <div class="w-1 h-1 rounded-full bg-line" />
              </div>
            </div>

            <div class="p-6">
              <div class="flex flex-col sm:flex-row gap-6">
                <div class="flex-1">
                  <h2 class="font-display font-semibold text-xl text-ink-900">{{ room?.name }}</h2>
                  <p class="text-ink-500 mt-1">{{ room?.building }} · Lantai {{ room?.floor }}</p>

                  <div class="mt-4 space-y-2 text-sm">
                    <p class="text-ink-700">{{ dateDisplay }}</p>
                    <p class="text-ink-700 font-medium">
                      {{ formatTimeRange(booking.start, booking.end) }} ({{ formatDuration(booking.start, booking.end) }})
                    </p>

                    <div class="flex gap-0.5 h-2 mt-3">
                      <div
                        v-for="i in 14"
                        :key="i"
                        :class="[
                          'flex-1 first:rounded-l-sm last:rounded-r-sm',
                          i >= parseInt(booking.start.split(':')[0]) - 6 && i < parseInt(booking.end.split(':')[0]) - 6
                            ? 'bg-red-600'
                            : 'bg-surface'
                        ]"
                      />
                    </div>
                  </div>

                  <p class="mt-4 text-xs text-ink-400">
                    Kode booking: <span class="font-mono font-medium text-ink-700">{{ booking.code }}</span>
                  </p>
                </div>

                <div class="flex flex-col items-center">
                  <div class="p-2 bg-white border border-line rounded-lg">
                    <img
                      v-if="qrDataUrl"
                      :src="qrDataUrl"
                      alt="QR akses ruangan"
                      class="w-32 h-32"
                    />
                    <div v-else class="w-32 h-32 bg-surface animate-pulse" />
                  </div>
                  <p class="text-xs text-ink-400 mt-2">Aktif {{ activeTime }}</p>
                </div>
              </div>
            </div>
          </div>

          <div
            class="flex flex-col sm:flex-row gap-3 mt-6 transition-all duration-300 delay-200"
            :class="showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          >
            <BaseButton variant="secondary" class="flex-1" @click="goToDetail">
              Lihat detail reservasi
            </BaseButton>
            <BaseButton variant="secondary" class="flex-1" @click="handleAddToCalendar">
              Tambah ke kalender
            </BaseButton>
          </div>

          <div class="text-center mt-8">
            <button class="text-sm text-red-600 hover:text-red-700 transition-colors" @click="goHome">
              Kembali ke beranda
            </button>
          </div>
        </template>
      </PageContainer>
    </main>
  </div>
</template>