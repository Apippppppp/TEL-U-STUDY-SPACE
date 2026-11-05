<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useUiStore } from '@/stores/ui'
import PageContainer from '@/components/layout/PageContainer.vue'
import PageHeader from '@/components/layout/PageHeader.vue'
import AppNavbar from '@/components/layout/AppNavbar.vue'
import BottomTabBar from '@/components/layout/BottomTabBar.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const router = useRouter()
const auth = useAuthStore()
const ui = useUiStore()

const handleLogout = async () => {
  await auth.logout()
  ui.showToast('Keluar berhasil.', 'success')
  router.push('/')
}

onMounted(() => {
  auth.init()
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <AppNavbar />

    <main class="flex-1 pb-20">
      <PageContainer size="md">
        <PageHeader title="Profil" />

        <div v-if="!auth.isLoggedIn" class="text-center py-12">
          <p class="text-ink-500 mb-4">Silakan masuk untuk melihat profil.</p>
          <BaseButton variant="primary" @click="router.push('/masuk')">Masuk</BaseButton>
        </div>

        <template v-else>
          <div class="flex gap-6">
            <div class="flex-shrink-0">
              <div class="w-20 h-20 rounded-full bg-red-600 text-white flex items-center justify-center text-2xl font-display font-semibold">
                {{ auth.student?.avatarInitial }}
              </div>
            </div>

            <div class="flex-1">
              <h2 class="text-xl font-display font-semibold text-ink-900">{{ auth.student?.name }}</h2>
              <p class="text-ink-500">{{ auth.student?.major }}</p>
            </div>
          </div>

          <div class="mt-8 bg-surface rounded-xl p-4 space-y-4">
            <div class="flex justify-between py-2 border-b border-line gap-3">
              <span class="text-ink-500">NIM</span>
              <span class="text-ink-900 font-medium text-right">{{ auth.student?.nim }}</span>
            </div>
            <div class="flex justify-between py-2 border-b border-line gap-3">
              <span class="text-ink-500">Email</span>
              <span class="text-ink-900 text-right break-all">{{ auth.student?.email }}</span>
            </div>
            <div class="flex justify-between py-2 border-b border-line gap-3">
              <span class="text-ink-500">Program studi</span>
              <span class="text-ink-900 text-right">{{ auth.student?.major }}</span>
            </div>
            <div class="flex justify-between py-2 border-b border-line gap-3">
              <span class="text-ink-500">Status akun</span>
              <span class="text-free-600 font-medium text-right">{{ auth.student?.status }}</span>
            </div>
            <div class="flex justify-between py-2 gap-3">
              <span class="text-ink-500">Terakhir masuk</span>
              <span class="text-ink-900 text-right">{{ auth.student?.lastLogin }}</span>
            </div>
          </div>

          <p class="mt-4 text-xs text-ink-400 text-center">Data mengikuti akun kampus.</p>

          <BaseButton variant="secondary" class="w-full mt-6" @click="handleLogout">
            Keluar
          </BaseButton>
        </template>
      </PageContainer>
    </main>

    <BottomTabBar />
  </div>
</template>