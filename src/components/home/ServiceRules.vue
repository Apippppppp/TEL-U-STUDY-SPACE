<script setup>
const rules = [
  { term: 'Jam operasional', definition: '07:00–21:00, Senin–Sabtu' },
  { term: 'Durasi maksimal', definition: '3 jam per reservasi' },
  { term: 'Check-in', definition: 'QR aktif 15 menit sebelum mulai' },
  { term: 'Pembatalan', definition: 'Bisa dibatalkan hingga 1 jam sebelum mulai' },
]
</script>

<template>
  <section class="py-12 md:py-16 bg-white">
    <div class="max-w-3xl mx-auto px-4 md:px-8">
      <h2 class="text-xl md:text-2xl font-display font-semibold text-ink-900 mb-6">
        Aturan layanan
      </h2>

      <dl class="grid md:grid-cols-2 gap-4">
        <div
          v-for="rule in rules"
          :key="rule.term"
          class="p-4 rounded-lg bg-surface"
        >
          <dt class="font-medium text-ink-900">{{ rule.term }}</dt>
          <dd class="text-sm text-ink-500 mt-1">{{ rule.definition }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>