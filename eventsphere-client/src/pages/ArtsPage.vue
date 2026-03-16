<template>
  <div class="page-enter">
    <div class="page-banner">
      <img src="https://images.unsplash.com/photo-1507924538820-ede94a04019d?w=1400&q=80" alt="Arts" />
      <div class="page-banner-overlay" style="background: linear-gradient(90deg, rgba(20,0,10,0.9) 0%, rgba(0,0,0,0.3) 100%)">
        <div>
          <div style="font-size: 13px; color: #f4a0c0; font-weight: 700; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.08em">🎭 Performing Arts</div>
          <div class="page-banner-title">Arts & Theatre</div>
          <div class="page-banner-sub">Where stories come to life on stage — theatre, dance, and cultural performances</div>
        </div>
      </div>
    </div>
    <div class="filter-bar">
      <span class="filter-label">Type:</span>
      <button v-for="t in types" :key="t" :class="['filter-chip', type === t ? 'active' : '']" @click="type = t">{{ t }}</button>
      <div style="margin-left: auto; display: flex; align-items: center; gap: 8px">
        <select class="filter-select"><option>All Dates</option><option>This Week</option><option>This Month</option></select>
        <select class="filter-select"><option>All Cities</option><option>Hà Nội</option><option>Hồ Chí Minh</option></select>
      </div>
    </div>
    <div style="margin-bottom: 24px; background: linear-gradient(135deg, #1A000A 0%, #2A0015 100%); border: 1px solid rgba(244,160,192,0.15); border-radius: 14px; padding: 20px 24px">
      <div style="font-family: Clash Display, sans-serif; font-size: 16px; font-weight: 700; margin-bottom: 8px">🏛️ Featured Venues</div>
      <div style="display: flex; gap: 12px; flex-wrap: wrap">
        <span v-for="v in venues" :key="v" style="padding: 4px 12px; background: rgba(255,255,255,0.05); border-radius: 20px; font-size: 13px; border: 1px solid rgba(244,160,192,0.15)">{{ v }}</span>
      </div>
    </div>
    <div class="events-grid">
      <EventCard v-for="e in filtered" :key="e.id" :event="{ ...e, category: e.type }" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { EVENTS } from '../data'
import EventCard from '../components/EventCard.vue'
const type = ref('All')
const types = ['All', 'Musical', 'Drama', 'Dance', 'Traditional', 'Circus Arts']
const venues = ['Nhà Hát Lớn Hà Nội', 'Saigon Opera House', 'IDECAF Theatre', "L'Espace"]
const filtered = computed(() => EVENTS.arts.filter(e => type.value === 'All' || e.type === type.value))
</script>
