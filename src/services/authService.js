import { SAMPLE_STUDENT } from '@/data/student'

const STORAGE_KEY = 'telu-studyspace-auth'
const SIMULATED_DELAY = 500

const simulateDelay = (ms = SIMULATED_DELAY) =>
  new Promise(resolve => setTimeout(resolve, ms))

const loadFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch {
    // ignore corrupted storage
  }
  return { isLoggedIn: false, student: null }
}

const saveToStorage = (state) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export const authService = {
  async login(nim, password) {
    await simulateDelay()

    if (!nim.trim()) return { success: false, error: 'Masukkan NIM.' }
    if (!password.trim()) return { success: false, error: 'Masukkan kata sandi.' }

    // Accept any valid-looking credentials for the demo
    const state = {
      isLoggedIn: true,
      student: { ...SAMPLE_STUDENT, nim }
    }

    saveToStorage(state)
    return { success: true, student: state.student }
  },

  async logout() {
    await simulateDelay(200)
    localStorage.removeItem(STORAGE_KEY)
  },

  async getCurrentUser() {
    await simulateDelay(100)
    return loadFromStorage().student
  },

  async isLoggedIn() {
    return loadFromStorage().isLoggedIn
  }
}