<template>
  <div class="page-enter">
    <div class="page-banner">
      <img src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1400&q=80" alt="Concerts" />
      <div class="page-banner-overlay">
        <div>
          <div style="font-size: 13px; color: var(--emerald); font-weight: 700; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.08em">🎵 Live Music</div>
          <div class="page-banner-title">Concerts</div>
          <div class="page-banner-sub">From intimate gigs to stadium shows — find your next live experience</div>
        </div>
      </div>
    </div>
    <div class="filter-bar">
      <span class="filter-label">Genre:</span>
      <button v-for="g in genres" :key="g" :class="['filter-chip', genre === g ? 'active' : '']" @click="genre = g">{{ g }}</button>
      <div style="margin-left: auto; display: flex; align-items: center; gap: 8px">
        <span class="filter-label">Sort:</span>
        <select class="filter-select" v-model="sortBy"><option value="date">By Date</option><option value="price">By Price</option><option value="name">By Name</option></select>
        <select class="filter-select"><option>All Locations</option><option>Hà Nội</option><option>Hồ Chí Minh</option><option>Đà Nẵng</option></select>
      </div>
    </div>
    <div style="background: linear-gradient(135deg, #001510 0%, #00260F 100%); border: 1px solid rgba(0,200,83,0.2); border-radius: 14px; padding: 16px 24px; margin-bottom: 24px; display: flex; align-items: center; gap: 16px">
      <span style="font-size: 32px">🎤</span>
      <div>
        <div style="font-weight: 700; margin-bottom: 4px">VIP & SVIP Packages Available</div>
        <div style="font-size: 13px; color: var(--muted)">Backstage access, meet & greet, priority seating on selected concerts</div>
      </div>
      <div style="margin-left: auto; font-size: 13px; color: var(--emerald)">{{ filtered.filter(e => e.featured).length }} featured shows →</div>
    </div>
    <div class="events-grid">
      <EventCard v-for="e in filtered" :key="e.id" :event="{ ...e, category: e.genre }" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { getEvents } from '../stores/eventStore'
import EventCard from '../components/EventCard.vue'
const genre = ref('All')
const sortBy = ref('date')
const genres = ['All', 'Pop', 'Rock', 'EDM', 'Jazz']
const filtered = computed(() => {
  const concerts = getEvents().filter(e => e.category === 'concerts')
  if (genre.value === 'All') return concerts
  return concerts.filter(e => e.performers?.some(p => p.role === genre.value) || true)
})
</script>
