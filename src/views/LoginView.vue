<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import PageContainer from '@/components/layout/PageContainer.vue'
import AppNavbar from '@/components/layout/AppNavbar.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseInput from '@/components/ui/BaseInput.vue'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

const form = ref({
  nim: '',
  password: ''
})

const errors = ref({})
const loading = ref(false)

const validate = () => {
  errors.value = {}
  if (!form.value.nim.trim()) errors.value.nim = 'Masukkan NIM.'
  if (!form.value.password.trim()) errors.value.password = 'Masukkan kata sandi.'
  return Object.keys(errors.value).length === 0
}

const handleLogin = async () => {
  if (!validate()) return

  loading.value = true
  const success = await auth.login(form.value.nim, form.value.password)
  loading.value = false

  if (success) {
    const next = route.query.next
    router.push(next || '/')
  } else {
    errors.value.password = auth.error || 'Login gagal.'
  }
}

onMounted(() => {
  if (auth.isLoggedIn) router.push('/')
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <AppNavbar />

    <main class="flex-1 flex items-center justify-center py-8 px-4">
      <PageContainer size="sm">
        <div class="max-w-sm mx-auto">
          <div class="text-center mb-8">
            <h1 class="text-2xl font-display font-semibold text-ink-900">Masuk</h1>
            <p class="text-ink-500 mt-1">Masuk dengan akun kampusmu</p>
          </div>

          <form class="space-y-4" @submit.prevent="handleLogin">
            <BaseInput
              v-model="form.nim"
              label="NIM"
              placeholder="Masukkan NIM"
              :error="errors.nim"
              autocomplete="username"
            />

            <BaseInput
              v-model="form.password"
              label="Kata sandi"
              type="password"
              placeholder="Masukkan kata sandi"
              :error="errors.password"
              autocomplete="current-password"
            />

            <BaseButton type="submit" variant="primary" class="w-full" :loading="loading">
              Masuk
            </BaseButton>
          </form>

          <p class="mt-6 text-xs text-ink-400 text-center">
            Untuk demo, gunakan NIM dan kata sandi sembarang.
          </p>
        </div>
      </PageContainer>
    </main>
  </div>
</template>