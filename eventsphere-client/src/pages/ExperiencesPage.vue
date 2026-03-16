<template>
  <div class="page-enter">
    <div class="page-banner">
      <img src="https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?w=1400&q=80" alt="Experiences" />
      <div class="page-banner-overlay" style="background: linear-gradient(90deg, rgba(0,15,20,0.92) 0%, rgba(0,0,0,0.3) 100%)">
        <div>
          <div style="font-size: 13px; color: #34D399; font-weight: 700; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.08em">🧭 Discover</div>
          <div class="page-banner-title">Experiences</div>
          <div class="page-banner-sub">Tours, expeditions, and unforgettable moments across Vietnam</div>
        </div>
      </div>
    </div>
    <div class="filter-bar">
      <span class="filter-label">Duration:</span>
      <button v-for="d in durations" :key="d" class="filter-chip">{{ d }}</button>
      <div style="margin-left: auto">
        <select class="filter-select"><option>All Regions</option><option>Hồ Chí Minh</option><option>Hà Nội</option><option>Central Vietnam</option><option>South Islands</option></select>
      </div>
    </div>
    <div class="events-grid">
      <EventCard v-for="e in EVENTS.experiences" :key="e.id" :event="{ ...e, category: 'Experience' }" />
    </div>
  </div>
</template>

<script setup>
import { EVENTS } from '../data'
import EventCard from '../components/EventCard.vue'
const durations = ['All', '< 3 hrs', 'Half Day', 'Full Day', 'Multi-Day']
</script>
