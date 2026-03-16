<template>
  <div class="page-enter">
    <div class="page-banner">
      <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1400&q=80" alt="Workshops" />
      <div class="page-banner-overlay" style="background: linear-gradient(90deg, rgba(10,10,0,0.92) 0%, rgba(0,0,0,0.3) 100%)">
        <div>
          <div style="font-size: 13px; color: #FBBF24; font-weight: 700; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.08em">📚 Learn & Grow</div>
          <div class="page-banner-title">Workshops</div>
          <div class="page-banner-sub">Skill up with hands-on classes taught by industry experts</div>
        </div>
      </div>
    </div>
    <div class="filter-bar">
      <span class="filter-label">Level:</span>
      <button v-for="l in levels" :key="l" :class="['filter-chip', level === l ? 'active' : '']" @click="level = l">{{ l }}</button>
      <div style="margin-left: auto; display: flex; gap: 8px">
        <select class="filter-select"><option>All Topics</option><option>Technology</option><option>Arts & Crafts</option><option>Culinary</option><option>Business</option></select>
        <select class="filter-select"><option>Sort: Date</option><option>Sort: Price ↑</option><option>Sort: Price ↓</option></select>
      </div>
    </div>
    <div class="events-grid">
      <EventCard v-for="e in filtered" :key="e.id" :event="e" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { EVENTS } from '../data'
import EventCard from '../components/EventCard.vue'
const level = ref('All')
const levels = ['All', 'Beginner', 'Intermediate', 'Advanced']
const filtered = computed(() => EVENTS.workshops.filter(e => level.value === 'All' || e.level === level.value))
</script>
