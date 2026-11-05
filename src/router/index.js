import { createRouter, createWebHistory } from 'vue-router'
import { authService } from '@/services/authService'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: () => import('@/views/HomeView.vue') },
    { path: '/ruangan', name: 'rooms', component: () => import('@/views/RoomsView.vue') },
    { path: '/ruangan/:id', name: 'room-detail', component: () => import('@/views/RoomDetailView.vue') },
    { path: '/reservasi/baru', name: 'booking-new', component: () => import('@/views/BookingNewView.vue'), meta: { requiresAuth: true } },
    { path: '/reservasi/berhasil/:kode', name: 'booking-success', component: () => import('@/views/BookingSuccessView.vue'), meta: { requiresAuth: true } },
    { path: '/reservasi-saya', name: 'my-bookings', component: () => import('@/views/MyBookingsView.vue'), meta: { requiresAuth: true } },
    { path: '/reservasi-saya/:kode', name: 'booking-detail', component: () => import('@/views/BookingDetailView.vue'), meta: { requiresAuth: true } },
    { path: '/profil', name: 'profile', component: () => import('@/views/ProfileView.vue'), meta: { requiresAuth: true } },
    { path: '/masuk', name: 'login', component: () => import('@/views/LoginView.vue') },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/views/NotFoundView.vue') }
  ]
})

router.beforeEach(async (to, _from, next) => {
  if (to.meta.requiresAuth) {
    const isLoggedIn = await authService.isLoggedIn()
    if (!isLoggedIn) {
      next({ name: 'login', query: { next: to.fullPath } })
      return
    }
  }
  next()
})

export default router