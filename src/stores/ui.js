import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  const toasts = ref([])
  const mobileMenuOpen = ref(false)
  const filterSheetOpen = ref(false)

  const showToast = (message, type = 'info', duration = 4000) => {
    const id = Date.now().toString()
    toasts.value.push({ id, message, type, duration })

    setTimeout(() => dismissToast(id), duration)

    return id
  }

  const dismissToast = (id) => {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index !== -1) toasts.value.splice(index, 1)
  }

  const toggleMobileMenu = () => {
    mobileMenuOpen.value = !mobileMenuOpen.value
  }

  const toggleFilterSheet = () => {
    filterSheetOpen.value = !filterSheetOpen.value
  }

  return {
    toasts,
    mobileMenuOpen,
    filterSheetOpen,
    showToast,
    dismissToast,
    toggleMobileMenu,
    toggleFilterSheet
  }
})