<script setup>
import { useRouter } from 'vue-router'
import PageContainer from '@/components/layout/PageContainer.vue'
import AppNavbar from '@/components/layout/AppNavbar.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const router = useRouter()

const goHome = () => router.push('/')
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <AppNavbar />

    <main class="flex-1 flex items-center justify-center py-20">
      <PageContainer size="sm">
        <div class="text-center">
          <h1 class="text-4xl font-display font-semibold text-ink-900 mb-2">404</h1>
          <p class="text-ink-500 mb-6">Halaman tidak ditemukan. Alamat mungkin salah atau halaman sudah dipindahkan.</p>
          <BaseButton variant="primary" @click="goHome">Kembali ke beranda</BaseButton>
        </div>
      </PageContainer>
    </main>
  </div>
</template>