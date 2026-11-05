<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { format, parseISO } from 'date-fns'
import { id } from 'date-fns/locale'
import { useRoomsStore } from '@/stores/rooms'
import { useBookingsStore } from '@/stores/bookings'
import { useUiStore } from '@/stores/ui'
import PageContainer from '@/components/layout/PageContainer.vue'
import AppNavbar from '@/components/layout/AppNavbar.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseSelect from '@/components/ui/BaseSelect.vue'
import BaseCheckbox from '@/components/ui/BaseCheckbox.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import { formatDuration, formatTimeRange } from '@/utils/format'

const route = useRoute()
const router = useRouter()
const roomsStore = useRoomsStore()
const bookingsStore = useBookingsStore()
const ui = useUiStore()

const roomId = computed(() => route.query.ruangan)
const dateParam = computed(() => route.query.tanggal || '')
const startParam = computed(() => route.query.mulai || '')
const endParam = computed(() => route.query.selesai || '')

const room = computed(() => roomsStore.getRoomById(roomId.value))

const form = ref({
  purpose: '',
  note: '',
  attendees: 2,
  agree: false
})

const errors = ref({})
const loading = ref(false)

const purposeOptions = [
  { value: 'diskusi-kelompok', label: 'Diskusi kelompok' },
  { value: 'belajar-mandiri', label: 'Belajar mandiri' },
  { value: 'rapat', label: 'Rapat' },
  { value: 'tutor', label: 'Bimbingan/tutor' },
  { value: 'lainnya', label: 'Lainnya' },
]

const dateDisplay = computed(() => {
  if (!dateParam.value) return ''
  try {
    return format(parseISO(dateParam.value), 'EEEE, d MMMM yyyy', { locale: id })
  } catch {
    return dateParam.value
  }
})

const timeDisplay = computed(() => {
  if (!startParam.value || !endParam.value) return ''
  return formatTimeRange(startParam.value, endParam.value)
})

const durationDisplay = computed(() => {
  if (!startParam.value || !endParam.value) return ''
  return formatDuration(startParam.value, endParam.value)
})

const maxAttendees = computed(() => room.value?.capacityMax || 10)

const validate = () => {
  errors.value = {}

  if (!form.value.purpose) {
    errors.value.purpose = 'Pilih keperluan penggunaan ruangan.'
  }
  if (form.value.attendees < 1) {
    errors.value.attendees = 'Minimal 1 peserta.'
  }
  if (form.value.attendees > maxAttendees.value) {
    errors.value.attendees = `Jumlah peserta melebihi kapasitas (maks. ${maxAttendees.value} orang).`
  }
  if (!form.value.agree) {
    errors.value.agree = 'Setuju dengan aturan penggunaan untuk melanjutkan.'
  }

  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if (!validate() || !room.value) return

  loading.value = true

  const booking = await bookingsStore.createBooking({
    roomId: room.value.id,
    date: dateParam.value,
    start: startParam.value,
    end: endParam.value,
    attendees: form.value.attendees,
    purpose: purposeOptions.find(p => p.value === form.value.purpose)?.label || form.value.purpose,
    note: form.value.note || undefined
  })

  loading.value = false

  if (booking) {
    ui.showToast('Reservasi berhasil dibuat!', 'success')
    router.push(`/reservasi/berhasil/${booking.code}`)
  } else if (bookingsStore.createError) {
    ui.showToast(bookingsStore.createError, 'error')
  }
}

const goBack = () => router.back()

onMounted(async () => {
  await roomsStore.fetchRooms()
  await bookingsStore.fetchBookings()
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <AppNavbar />

    <main class="flex-1 py-8 pb-20">
      <PageContainer size="md">
        <div class="flex items-center justify-center gap-2 md:gap-4 mb-8 flex-wrap">
          <div class="flex items-center gap-2 text-red-600">
            <span class="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-sm">1</span>
            <span class="text-sm font-medium">Pilih waktu</span>
          </div>
          <BaseIcon name="ChevronRight" :size="16" class="text-ink-300" />
          <div class="flex items-center gap-2 text-red-600">
            <span class="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-sm">2</span>
            <span class="text-sm font-medium">Isi detail</span>
          </div>
          <BaseIcon name="ChevronRight" :size="16" class="text-ink-300" />
          <div class="flex items-center gap-2 text-ink-400">
            <span class="w-6 h-6 rounded-full bg-surface flex items-center justify-center text-sm">3</span>
            <span class="text-sm font-medium">Selesai</span>
          </div>
        </div>

        <div v-if="!room" class="text-center py-12">
          <p class="text-ink-500">Ruangan tidak ditemukan</p>
        </div>

        <template v-else>
          <div class="grid md:grid-cols-5 gap-8">
            <div class="md:col-span-3">
              <h1 class="text-2xl font-display font-semibold text-ink-900 mb-6">Detail reservasi</h1>

              <form class="space-y-4" @submit.prevent="handleSubmit">
                <div>
                  <label class="text-sm font-medium text-ink-700 mb-1 block">Ruangan</label>
                  <div class="flex items-center gap-3 p-3 bg-surface rounded-lg">
                    <div class="w-16 h-12 bg-white rounded flex items-center justify-center">
                      <BaseIcon name="DoorOpen" :size="24" class="text-ink-300" />
                    </div>
                    <div>
                      <p class="font-medium text-ink-900">{{ room.name }}</p>
                      <p class="text-sm text-ink-500">{{ room.building }} · Lantai {{ room.floor }}</p>
                    </div>
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="text-sm font-medium text-ink-700 mb-1 block">Tanggal</label>
                    <div class="p-3 bg-surface rounded-lg text-ink-900">{{ dateDisplay }}</div>
                  </div>
                  <div>
                    <label class="text-sm font-medium text-ink-700 mb-1 block">Waktu</label>
                    <div class="p-3 bg-surface rounded-lg text-ink-900">
                      {{ timeDisplay }} ({{ durationDisplay }})
                    </div>
                  </div>
                </div>

                <BaseSelect
                  v-model="form.purpose"
                  label="Keperluan"
                  placeholder="Pilih keperluan"
                  :options="purposeOptions"
                  :error="errors.purpose"
                />

                <div>
                  <label class="text-sm font-medium text-ink-700 mb-1.5 block">Jumlah peserta</label>
                  <div class="flex items-center gap-3">
                    <button
                      type="button"
                      class="w-10 h-10 rounded-lg border border-line bg-white flex items-center justify-center hover:bg-surface"
                      :disabled="form.attendees <= 1"
                      @click="form.attendees--"
                    >
                      <BaseIcon name="Minus" :size="18" />
                    </button>
                    <span class="w-12 text-center font-medium text-ink-900">{{ form.attendees }}</span>
                    <button
                      type="button"
                      class="w-10 h-10 rounded-lg border border-line bg-white flex items-center justify-center hover:bg-surface"
                      :disabled="form.attendees >= maxAttendees"
                      @click="form.attendees++"
                    >
                      <BaseIcon name="Plus" :size="18" />
                    </button>
                    <span class="text-sm text-ink-500">maks. {{ maxAttendees }}</span>
                  </div>
                  <p v-if="errors.attendees" class="text-sm text-red-600 mt-1 flex items-center gap-1">
                    <BaseIcon name="AlertCircle" :size="14" />
                    {{ errors.attendees }}
                  </p>
                </div>

                <BaseInput
                  v-model="form.note"
                  label="Catatan (opsional)"
                  placeholder="Tambahkan catatan jika diperlukan..."
                />

                <div class="pt-2">
                  <BaseCheckbox
                    v-model="form.agree"
                    label="Saya setuju dengan aturan penggunaan ruangan"
                  />
                  <p v-if="errors.agree" class="text-sm text-red-600 mt-1 flex items-center gap-1">
                    <BaseIcon name="AlertCircle" :size="14" />
                    {{ errors.agree }}
                  </p>
                </div>

                <div class="flex gap-3 pt-4">
                  <BaseButton variant="secondary" type="button" @click="goBack">
                    Kembali
                  </BaseButton>
                  <BaseButton variant="primary" type="submit" :loading="loading" class="flex-1">
                    Konfirmasi reservasi
                  </BaseButton>
                </div>
              </form>
            </div>

            <div class="md:col-span-2">
              <div class="md:sticky md:top-24 bg-surface rounded-xl p-4">
                <h2 class="font-display font-semibold text-ink-900 mb-4">Ringkasan reservasi</h2>

                <div class="space-y-3 text-sm">
                  <div class="flex justify-between gap-3">
                    <span class="text-ink-500">Ruangan</span>
                    <span class="text-ink-900 font-medium text-right">{{ room.name }}</span>
                  </div>
                  <div class="flex justify-between gap-3">
                    <span class="text-ink-500">Lokasi</span>
                    <span class="text-ink-900 text-right">{{ room.building }} · Lantai {{ room.floor }}</span>
                  </div>
                  <div class="flex justify-between gap-3">
                    <span class="text-ink-500">Tanggal</span>
                    <span class="text-ink-900 text-right">{{ dateDisplay }}</span>
                  </div>
                  <div class="flex justify-between gap-3">
                    <span class="text-ink-500">Waktu</span>
                    <span class="text-ink-900 text-right">{{ timeDisplay }}</span>
                  </div>
                  <div class="flex justify-between gap-3">
                    <span class="text-ink-500">Durasi</span>
                    <span class="text-ink-900 text-right">{{ durationDisplay }}</span>
                  </div>
                  <div class="flex justify-between gap-3">
                    <span class="text-ink-500">Peserta</span>
                    <span class="text-ink-900 text-right">{{ form.attendees }} orang</span>
                  </div>
                  <div v-if="form.purpose" class="flex justify-between gap-3">
                    <span class="text-ink-500">Keperluan</span>
                    <span class="text-ink-900 text-right">
                      {{ purposeOptions.find(p => p.value === form.purpose)?.label }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </PageContainer>
    </main>
  </div>
</template>