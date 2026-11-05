import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authService } from '@/services/authService'

export const useAuthStore = defineStore('auth', () => {
  const student = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const isLoggedIn = computed(() => !!student.value)

  const login = async (nim, password) => {
    loading.value = true
    error.value = null

    const result = await authService.login(nim, password)

    if (result.success && result.student) {
      student.value = result.student
    } else {
      error.value = result.error || 'Login gagal'
    }

    loading.value = false
    return !!result.success
  }

  const logout = async () => {
    await authService.logout()
    student.value = null
  }

  const init = async () => {
    const user = await authService.getCurrentUser()
    if (user) {
      student.value = user
    }
  }

  return {
    student,
    loading,
    error,
    isLoggedIn,
    login,
    logout,
    init
  }
})