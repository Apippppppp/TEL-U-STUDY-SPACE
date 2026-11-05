<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { format, addDays } from 'date-fns'
import { OPERATIONAL_HOURS } from '@/utils/time'
import BaseIcon from '@/components/ui/BaseIcon.vue'

const router = useRouter()

const date = ref(format(new Date(), 'yyyy-MM-dd'))
const startTime = ref('09:00')
const endTime = ref('12:00')
const participants = ref(2)

const dateOptions = Array.from({ length: 14 }, (_, i) => {
  const d = addDays(new Date(), i)
  return {
    value: format(d, 'yyyy-MM-dd'),
    label: format(d, 'EEE, d MMM')
  }
})

const handleSearch = () => {
  const query = new URLSearchParams({
    date: date.value,
    start: startTime.value,
    end: endTime.value,
    participants: participants.value.toString()
  }).toString()
  router.push(`/ruangan?${query}`)
}
</script>

<template>
  <section class="relative bg-white overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20">
      <div class="grid lg:grid-cols-12 gap-8 items-center">
        <div class="lg:col-span-7">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-ink-900 leading-tight">
            Find Your Space.<br/>
            <span class="text-red-600">Focus on Your Goals.</span>
          </h1>
          <p class="mt-4 text-lg text-ink-500 max-w-lg">
            Pesan ruang belajar dan ruang diskusi di Telkom University Jakarta.
            Pilih waktu, konfirmasi, lalu masuk dengan QR.
          </p>

          <form class="mt-8 flex flex-wrap gap-3 items-end" @submit.prevent="handleSearch">
            <div class="flex flex-col gap-1">
              <label class="text-xs font-medium text-ink-500">Tanggal</label>
              <select
                v-model="date"
                class="h-11 px-3 rounded-lg border border-line bg-white text-ink-700 min-w-[160px]"
              >
                <option v-for="opt in dateOptions" :key="opt.value" :value="opt.value">
                  {{ opt.label }}
                </option>
              </select>
            </div>

            <div class="flex flex-col gap-1">
              <label class="text-xs font-medium text-ink-500">Mulai</label>
              <select
                v-model="startTime"
                class="h-11 px-3 rounded-lg border border-line bg-white text-ink-700 min-w-[90px]"
              >
                <option v-for="h in OPERATIONAL_HOURS" :key="h" :value="h">{{ h }}</option>
              </select>
            </div>

            <div class="flex flex-col gap-1">
              <label class="text-xs font-medium text-ink-500">Selesai</label>
              <select
                v-model="endTime"
                class="h-11 px-3 rounded-lg border border-line bg-white text-ink-700 min-w-[90px]"
              >
                <option v-for="h in OPERATIONAL_HOURS" :key="h" :value="h">{{ h }}</option>
              </select>
            </div>

            <div class="flex flex-col gap-1">
              <label class="text-xs font-medium text-ink-500">Peserta</label>
              <select
                v-model="participants"
                class="h-11 px-3 rounded-lg border border-line bg-white text-ink-700 min-w-[90px]"
              >
                <option v-for="n in 12" :key="n" :value="n">{{ n }} org</option>
              </select>
            </div>

            <button
              type="submit"
              class="h-11 px-6 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
            >
              Cari ruangan
            </button>
          </form>
        </div>

        <div class="hidden lg:block lg:col-span-5 relative">
          <div class="aspect-[4/5] rounded-2xl bg-surface overflow-hidden">
            <div class="w-full h-full flex items-center justify-center">
              <BaseIcon name="DoorOpen" :size="120" class="text-ink-200" />
            </div>
          </div>
          <div class="absolute bottom-8 left-8 right-8 bg-white rounded-xl shadow-float p-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-ink-500">Kosong sekarang</p>
                <p class="text-2xl font-display font-semibold text-ink-900">6 dari 14</p>
              </div>
              <div class="w-12 h-12 rounded-full bg-free-50 flex items-center justify-center">
                <BaseIcon name="CheckCircle" :size="24" class="text-free-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>