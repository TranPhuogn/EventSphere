<template>
  <header class="header">
    <div class="header-top">
      <router-link to="/" class="logo">
        <div class="logo-icon">◉</div>
        EventSphere
      </router-link>

      <div class="search-bar" ref="searchRef">
        <span class="search-icon">🔍</span>
        <input
          placeholder="Search events, artists, venues..."
          v-model="searchQuery"
          @input="handleSearch"
          @focus="searchQuery.length >= 2 && (showSearch = true)"
        />
        <div v-if="showSearch && searchResults.length > 0" class="search-results">
          <div v-for="e in searchResults" :key="e.id" class="search-result-item" @click="goToEvent(e)">
            <img class="search-result-img" :src="e.image" :alt="e.title" />
            <div>
              <div class="search-result-title">{{ e.title }}</div>
              <div class="search-result-sub">{{ e.date }} · {{ e.location || e.venue }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="header-actions">
        <button class="btn btn-primary" @click="router.push('/create-event')">+ Create Event</button>
        <button class="btn btn-ghost" @click="router.push('/my-tickets')">
          🎟 My Tickets
          <span v-if="store.tickets.length > 0" style="background: var(--emerald); color: #000; border-radius: 20px; padding: 1px 6px; font-size: 11px; font-weight: 700">{{ store.tickets.length }}</span>
        </button>
        <div style="position: relative">
          <div class="avatar-btn" @click.stop="showDropdown = !showDropdown">N</div>
          <div v-if="showDropdown" class="dropdown">
            <div style="padding: 10px 14px 8px; border-bottom: 1px solid var(--border); margin-bottom: 4px">
              <div style="font-weight: 600; font-size: 14px">Nguyễn Văn A</div>
              <div style="font-size: 12px; color: var(--muted)">user@example.com</div>
            </div>
            <div v-for="[icon, label, path] in dropdownItems" :key="label" class="dropdown-item" @click="router.push(path); showDropdown = false">
              <span>{{ icon }}</span>{{ label }}
            </div>
            <hr class="dropdown-divider" />
            <div class="dropdown-item danger" @click="showDropdown = false"><span>🚪</span>Logout</div>
          </div>
        </div>
      </div>
    </div>

    <nav class="cat-nav">
      <div class="cat-nav-inner">
        <router-link v-for="c in CATS" :key="c.id" :to="c.path" :class="['cat-link', isActiveCategory(c.id) ? 'active' : '']">
          <span>{{ c.icon }}</span>{{ c.label }}
        </router-link>
      </div>
    </nav>
  </header>

  <main class="main">
    <RouterView />
  </main>

  <footer style="border-top: 1px solid var(--border); padding: 40px 40px 24px; background: var(--surface)">
    <div style="max-width: 1400px; margin: 0 auto">
      <div style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; margin-bottom: 32px">
        <div>
          <router-link to="/" class="logo" style="margin-bottom: 12px"><div class="logo-icon">◉</div>EventSphere</router-link>
          <div style="font-size: 14px; color: var(--muted); line-height: 1.7; margin-top: 12px">Vietnam's premier event ticketing platform. Discover, book, and experience the best events across the country.</div>
        </div>
        <div v-for="[title, links] in footerLinks" :key="title">
          <div style="font-family: Clash Display, sans-serif; font-weight: 700; margin-bottom: 14px">{{ title }}</div>
          <div v-for="l in links" :key="l" style="font-size: 14px; color: var(--muted); margin-bottom: 8px; cursor: pointer">{{ l }}</div>
        </div>
      </div>
      <div style="border-top: 1px solid var(--border); padding-top: 20px; display: flex; justify-content: space-between; align-items: center; font-size: 13px; color: var(--muted)">
        <span>© 2025 EventSphere. All rights reserved.</span>
        <span>Made with 💚 in Vietnam</span>
      </div>
    </div>
  </footer>

  <BookingModal v-if="store.showBooking && store.bookingEvent" :event="store.bookingEvent" @close="closeBooking" @success="handleBookingSuccess" />
  <ToastNotification v-if="store.toast" :message="store.toast.message" :icon="store.toast.icon" @close="clearToast" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ALL_EVENTS } from './data'
import { store, selectEvent, closeBooking, addTicket, clearToast } from './stores/eventStore'
import BookingModal from './components/BookingModal.vue'
import ToastNotification from './components/ToastNotification.vue'

const router = useRouter()
const route = useRoute()

const showDropdown = ref(false)
const searchQuery = ref('')
const searchResults = ref([])
const showSearch = ref(false)
const searchRef = ref(null)

const CATS = [
  { id: 'concerts', icon: '🎵', label: 'Concerts', path: '/concerts' },
  { id: 'arts', icon: '🎭', label: 'Arts & Theatre', path: '/arts' },
  { id: 'sports', icon: '⚽', label: 'Sports', path: '/sports' },
  { id: 'experiences', icon: '🧭', label: 'Experiences', path: '/experiences' },
  { id: 'workshops', icon: '📚', label: 'Workshops', path: '/workshops' },
  { id: 'others', icon: '✨', label: 'Others', path: '/workshops' },
]

const dropdownItems = [
  ['🎟️', 'My Tickets', '/my-tickets'],
  ['📅', 'My Events', '/organizer'],
  ['👤', 'My Profile', '/profile'],
  ['🏢', 'Organizer Center', '/organizer'],
]

const footerLinks = [
  ['Events', ['Concerts', 'Arts & Theatre', 'Sports', 'Experiences', 'Workshops']],
  ['Support', ['Help Center', 'Contact Us', 'Refund Policy', 'FAQs']],
  ['Company', ['About EventSphere', 'Press', 'Careers', 'Partner With Us']],
]

const isActiveCategory = (id) => {
  return route.path === '/' + id
}

const goToEvent = (event) => {
  selectEvent(event)
  showSearch.value = false
  searchQuery.value = ''
  router.push('/event/' + event.id)
}

const handleBookingSuccess = (bookedTicket) => {
  addTicket(bookedTicket)
}

const handleSearch = () => {
  const q = searchQuery.value
  if (q.length < 2) { searchResults.value = []; showSearch.value = false; return }
  searchResults.value = ALL_EVENTS.filter(e =>
    e.title.toLowerCase().includes(q.toLowerCase()) ||
    (e.artist || '').toLowerCase().includes(q.toLowerCase())
  ).slice(0, 5)
  showSearch.value = true
}

const handleClickOutside = (e) => {
  if (!searchRef.value?.contains(e.target)) showSearch.value = false
  if (!e.target.closest('.avatar-btn')) showDropdown.value = false
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>
