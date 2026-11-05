<script setup>
const steps = [
  { num: '1', title: 'Pilih ruangan', desc: 'Cari ruangan sesuai kebutuhanmu' },
  { num: '2', title: 'Pilih jam', desc: 'Tentukan waktu yang tepat' },
  { num: '3', title: 'Konfirmasi', desc: 'Isi detail reservasi' },
  { num: '4', title: 'Pindai QR', desc: 'Masuk ruangan dengan QR' },
]
</script>

<template>
  <section class="py-12 md:py-16 bg-surface">
    <div class="max-w-7xl mx-auto px-4 md:px-8">
      <h2 class="text-xl md:text-2xl font-display font-semibold text-ink-900 text-center mb-10">
        Cara memesan
      </h2>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div
          v-for="step in steps"
          :key="step.num"
          class="flex flex-col items-center text-center"
        >
          <div class="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center text-xl font-display font-semibold mb-3">
            {{ step.num }}
          </div>
          <h3 class="font-display font-semibold text-ink-900">{{ step.title }}</h3>
          <p class="text-sm text-ink-500 mt-1">{{ step.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>