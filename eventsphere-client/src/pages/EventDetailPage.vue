<template>
  <div v-if="event" class="page-enter">
    <div style="padding: 12px 0"><button class="btn btn-ghost btn-sm" @click="router.back()">← Back</button></div>
    <div class="detail-grid">
      <div>
        <img class="detail-cover" :src="event.image" :alt="event.title" />
        <div class="detail-title">{{ event.title }}</div>
        <div class="detail-meta-row">
          <div v-if="event.date" class="detail-meta-item">
            <span class="detail-meta-icon">📅</span>
            <div><div class="detail-meta-label">Date & Time</div><div class="detail-meta-value">{{ event.date }} {{ event.time || '' }}</div></div>
          </div>
          <div class="detail-meta-item">
            <span class="detail-meta-icon">📍</span>
            <div><div class="detail-meta-label">Location</div><div class="detail-meta-value">{{ event.location || event.venue || 'TBA' }}</div></div>
          </div>
          <div v-if="event.artist" class="detail-meta-item">
            <span class="detail-meta-icon">🎤</span>
            <div><div class="detail-meta-label">Artist</div><div class="detail-meta-value">{{ event.artist }}</div></div>
          </div>
          <div v-if="event.duration" class="detail-meta-item">
            <span class="detail-meta-icon">⏱</span>
            <div><div class="detail-meta-label">Duration</div><div class="detail-meta-value">{{ event.duration }}</div></div>
          </div>
        </div>
        <div style="margin-bottom: 28px">
          <div class="detail-section-title">About This Event</div>
          <div class="detail-desc">
            Experience an unforgettable evening at <strong style="color: var(--text)">{{ event.title }}</strong>.
            <template v-if="event.artist"> {{ event.artist }} delivers a world-class performance, bringing together fans from across Vietnam and beyond.</template>
            <template v-if="event.type"> This {{ event.type }} performance features talented artists and a captivating production.</template>
            Whether you're a long-time fan or a first-time attendee, this is an event you won't want to miss. Doors open 1 hour before the show.
          </div>
        </div>
        <div style="margin-bottom: 28px">
          <div class="detail-section-title">Organizer Information</div>
          <div style="display: flex; align-items: center; gap: 14px; background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 16px">
            <div style="width: 48px; height: 48px; border-radius: 12px; background: var(--emerald-dim); border: 1px solid var(--emerald); display: flex; align-items: center; justify-content: center; font-size: 24px">🏢</div>
            <div>
              <div style="font-weight: 600; margin-bottom: 3px">EventSphere Official</div>
              <div style="font-size: 13px; color: var(--muted)">Verified Organizer · 48 events hosted · ⭐ 4.9 rating</div>
            </div>
          </div>
        </div>
        <div>
          <div class="detail-section-title">You May Also Like</div>
          <div class="scroll-row">
            <EventCard v-for="e in relatedEvents" :key="e.id" :event="e" />
          </div>
        </div>
      </div>
      <!-- Ticket sidebar -->
      <div class="ticket-sidebar">
        <div style="font-family: Clash Display, sans-serif; font-size: 18px; font-weight: 700; margin-bottom: 16px">Select Tickets</div>
        <div v-for="(t, i) in tiers" :key="i" :class="['ticket-type', selectedTier === i ? 'selected' : '']" @click="selectedTier = i">
          <div style="display: flex; justify-content: space-between">
            <div><div class="ticket-type-name">{{ t.name }}</div><div class="ticket-type-avail">{{ t.avail }} seats remaining</div></div>
            <div class="ticket-type-price">{{ fmt(t.price) }}</div>
          </div>
        </div>
        <div class="qty-control">
          <span style="font-size: 14px; color: var(--muted)">Qty:</span>
          <button class="qty-btn" @click="qty = Math.max(1, qty - 1)">−</button>
          <span class="qty-display">{{ qty }}</span>
          <button class="qty-btn" @click="qty = Math.min(8, qty + 1)">+</button>
        </div>
        <div class="total-row">
          <span class="total-label">Total</span>
          <span class="total-amount">{{ fmt(total) }}</span>
        </div>
        <button class="btn btn-primary" style="width: 100%; justify-content: center; padding: 14px; margin-top: 12px; font-size: 16px" @click="handleBook">🎟 Book Now</button>
        <div style="text-align: center; margin-top: 12px; font-size: 12px; color: var(--muted)">🔒 Secure payment · Free cancellation within 24h</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ALL_EVENTS } from '../data'
import { store, selectEvent, openBooking, getEventById } from '../stores/eventStore'
import EventCard from '../components/EventCard.vue'

const router = useRouter()
const route = useRoute()

const selectedTier = ref(0)
const qty = ref(1)
const tiers = [{ name: 'Standard', price: 500000, avail: 45 }, { name: 'VIP', price: 1200000, avail: 20 }, { name: 'SVIP', price: 2500000, avail: 5 }]
const total = computed(() => tiers[selectedTier.value].price * qty.value)
const fmt = p => p.toLocaleString('vi-VN') + 'đ'

const event = computed(() => {
  // First try the store (for events navigated via selectEvent)
  if (store.selectedEvent && store.selectedEvent.id === route.params.id) {
    return store.selectedEvent
  }
  // Fall back to looking up by ID (for direct URL access)
  return getEventById(route.params.id)
})

const relatedEvents = computed(() => ALL_EVENTS.filter(e => e.id !== event.value?.id).slice(0, 4))

const handleBook = () => {
  if (event.value) {
    openBooking(event.value)
  }
}
</script>
