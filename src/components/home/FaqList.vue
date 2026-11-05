<script setup>
import { ref } from 'vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'

const faqItems = [
  {
    id: '1',
    title: 'Siapa yang bisa memesan ruangan?',
    content: 'Semua mahasiswa aktif Telkom University Jakarta yang memiliki akun kampus dapat memesan ruangan melalui sistem StudySpace.'
  },
  {
    id: '2',
    title: 'Berapa lama maksimal durasi reservasi?',
    content: 'Maksimal durasi reservasi adalah 3 jam per sesi. Kamu dapat memesan lagi setelah reservasi selesai jika masih ada waktu kosong.'
  },
  {
    id: '3',
    title: 'Bagaimana cara masuk ke ruangan?',
    content: 'Setelah reservasi berhasil, kamu akan mendapat kode QR yang dapat dipindai di pintu ruangan. QR aktif 15 menit sebelum waktu mulai reservasi.'
  },
  {
    id: '4',
    title: 'Apa yang terjadi jika terlambat datang?',
    content: 'Reservasi akan dibatalkan secara otomatis jika tidak check-in dalam 15 menit setelah waktu mulai. Ruangan akan tersedia untuk mahasiswa lain.'
  },
  {
    id: '5',
    title: 'Bagaimana cara membatalkan reservasi?',
    content: 'Kamu dapat membatalkan reservasi melalui menu "Reservasi Saya" paling lambat 1 jam sebelum waktu mulai.'
  },
  {
    id: '6',
    title: 'Apakah ada biaya pemesanan?',
    content: 'Tidak, pemesanan ruangan melalui StudySpace gratis untuk mahasiswa aktif. Ruangan adalah fasilitas kampus yang sudah termasuk dalam UKT.'
  },
]

const openId = ref(null)

const toggle = (id) => {
  openId.value = openId.value === id ? null : id
}
</script>

<template>
  <section class="py-12 md:py-16 bg-surface">
    <div class="max-w-3xl mx-auto px-4 md:px-8">
      <h2 class="text-xl md:text-2xl font-display font-semibold text-ink-900 mb-6">
        Pertanyaan umum
      </h2>

      <div class="divide-y divide-line bg-white rounded-xl overflow-hidden border border-line">
        <div v-for="item in faqItems" :key="item.id">
          <button
            class="w-full flex items-center justify-between px-4 py-4 text-left hover:bg-surface transition-colors"
            @click="toggle(item.id)"
          >
            <span class="font-medium text-ink-700 pr-4">{{ item.title }}</span>
            <BaseIcon
              name="ChevronDown"
              :size="18"
              class="text-ink-400 flex-shrink-0 transition-transform"
              :class="openId === item.id && 'rotate-180'"
            />
          </button>
          <div v-show="openId === item.id" class="px-4 pb-4 text-sm text-ink-500">
            {{ item.content }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>