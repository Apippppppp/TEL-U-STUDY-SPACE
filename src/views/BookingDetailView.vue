<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { format, parseISO, subMinutes } from 'date-fns'
import { id } from 'date-fns/locale'
import { useBookingsStore } from '@/stores/bookings'
import { useRoomsStore } from '@/stores/rooms'
import { useUiStore } from '@/stores/ui'
import PageContainer from '@/components/layout/PageContainer.vue'
import AppNavbar from '@/components/layout/AppNavbar.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import { formatDuration, formatTimeRange } from '@/utils/format'
import { generateQrDataUrl } from '@/utils/qr'

const route = useRoute()
const router = useRouter()
const bookingsStore = useBookingsStore()
const roomsStore = useRoomsStore()
const ui = useUiStore()

const code = route.params.kode
const booking = computed(() => bookingsStore.getBookingByCode(code))
const room = computed(() => booking.value ? roomsStore.getRoomById(booking.value.roomId) : null)

const qrDataUrl = ref('')
const cancelDialogOpen = ref(false)
const cancelling = ref(false)

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

const canCancel = computed(() => {
  if (!booking.value || booking.value.status !== 'upcoming') return false
  const startDate = parseISO(`${booking.value.date}T${booking.value.start}:00`)
  return new Date() < subMinutes(startDate, 60)
})

const generateQr = async () => {
  if (booking.value) qrDataUrl.value = await generateQrDataUrl(booking.value)
}

const handleCancel = async () => {
  if (!booking.value) return

  cancelling.value = true
  const success = await bookingsStore.cancelBooking(booking.value.code)
  cancelling.value = false

  if (success) {
    cancelDialogOpen.value = false
    ui.showToast('Reservasi dibatalkan.', 'success')
    router.push('/reservasi-saya')
  } else {
    ui.showToast('Gagal membatalkan reservasi.', 'error')
  }
}

const goBack = () => router.push('/reservasi-saya')

onMounted(async () => {
  await bookingsStore.fetchBookings()
  await roomsStore.fetchRooms()
  await generateQr()
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <AppNavbar />

    <main class="flex-1 py-8 pb-20">
      <PageContainer size="sm">
        <button
          class="flex items-center gap-1 text-sm text-ink-500 hover:text-ink-700 mb-4"
          @click="goBack"
        >
          <BaseIcon name="ChevronLeft" :size="16" />
          Kembali
        </button>

        <div v-if="!booking" class="text-center py-12">
          <p class="text-ink-500">Reservasi tidak ditemukan</p>
        </div>

        <template v-else>
          <div class="mb-6">
            <BaseBadge
              :variant="booking.status === 'upcoming' ? 'success' : booking.status === 'completed' ? 'default' : 'error'"
            >
              {{ booking.status === 'upcoming' ? 'Mendatang' : booking.status === 'completed' ? 'Selesai' : 'Dibatalkan' }}
            </BaseBadge>
          </div>

          <div class="bg-white rounded-2xl shadow-float overflow-hidden">
            <div class="relative h-px bg-line">
              <div class="absolute left-1/2 -translate-x-1/2 -top-3 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <div class="w-1 h-1 rounded-full bg-line" />
              </div>
            </div>

            <div class="p-6">
              <div v-if="booking.status === 'upcoming'" class="flex flex-col items-center mb-6">
                <div class="p-2 bg-white border border-line rounded-lg">
                  <img
                    v-if="qrDataUrl"
                    :src="qrDataUrl"
                    alt="QR akses ruangan"
                    class="w-40 h-40"
                  />
                </div>
                <p class="text-xs text-ink-400 mt-2">Aktif mulai {{ activeTime }}</p>
              </div>

              <div class="space-y-3 text-sm">
                <div class="flex justify-between gap-3">
                  <span class="text-ink-500">Kode booking</span>
                  <span class="font-mono font-medium text-ink-900">{{ booking.code }}</span>
                </div>
                <div class="flex justify-between gap-3">
                  <span class="text-ink-500">Ruangan</span>
                  <span class="text-ink-900 font-medium text-right">{{ room?.name }}</span>
                </div>
                <div class="flex justify-between gap-3">
                  <span class="text-ink-500">Lokasi</span>
                  <span class="text-ink-900 text-right">{{ room?.building }} · Lantai {{ room?.floor }}</span>
                </div>
                <div class="flex justify-between gap-3">
                  <span class="text-ink-500">Tanggal</span>
                  <span class="text-ink-900 text-right">{{ dateDisplay }}</span>
                </div>
                <div class="flex justify-between gap-3">
                  <span class="text-ink-500">Waktu</span>
                  <span class="text-ink-900 text-right">
                    {{ formatTimeRange(booking.start, booking.end) }} ({{ formatDuration(booking.start, booking.end) }})
                  </span>
                </div>
                <div class="flex justify-between gap-3">
                  <span class="text-ink-500">Peserta</span>
                  <span class="text-ink-900 text-right">{{ booking.attendees }} orang</span>
                </div>
                <div class="flex justify-between gap-3">
                  <span class="text-ink-500">Keperluan</span>
                  <span class="text-ink-900 text-right">{{ booking.purpose }}</span>
                </div>
                <div v-if="booking.note" class="flex justify-between gap-3">
                  <span class="text-ink-500">Catatan</span>
                  <span class="text-ink-900 text-right">{{ booking.note }}</span>
                </div>
                <div class="flex justify-between gap-3">
                  <span class="text-ink-500">Dibuat pada</span>
                  <span class="text-ink-900 text-right">{{ booking.createdAt }}</span>
                </div>
              </div>
            </div>
          </div>

          <div v-if="canCancel" class="mt-6">
            <BaseButton
              variant="secondary"
              class="w-full border-red-200 text-red-600 hover:bg-red-50"
              @click="cancelDialogOpen = true"
            >
              Batalkan reservasi
            </BaseButton>
          </div>
        </template>
      </PageContainer>
    </main>

    <BaseModal
      :open="cancelDialogOpen"
      title="Batalkan reservasi?"
      @close="cancelDialogOpen = false"
    >
      <p class="text-ink-500 mb-4">
        Batalkan reservasi {{ room?.name }}, {{ dateDisplay }} {{ booking?.start }}–{{ booking?.end }}?
      </p>
      <div class="flex gap-3">
        <BaseButton variant="secondary" class="flex-1" @click="cancelDialogOpen = false">
          Tetap pesan
        </BaseButton>
        <BaseButton
          variant="primary"
          class="flex-1"
          :loading="cancelling"
          @click="handleCancel"
        >
          Batalkan reservasi
        </BaseButton>
      </div>
    </BaseModal>
  </div>
</template>