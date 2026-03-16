<template>
  <div class="page-enter">
    <div v-if="store.tickets.length === 0" style="text-align: center; padding: 80px 0">
      <div style="font-size: 64px; margin-bottom: 16px">🎟️</div>
      <div style="font-family: Clash Display, sans-serif; font-size: 28px; font-weight: 700; margin-bottom: 8px">No tickets yet</div>
      <div style="color: var(--muted); margin-bottom: 24px">Your purchased tickets will appear here</div>
      <router-link to="/" class="btn btn-primary">Browse Events</router-link>
    </div>
    <template v-else>
      <div style="margin: 24px 0 20px; font-family: Clash Display, sans-serif; font-size: 28px; font-weight: 700">My Tickets</div>
      <div v-for="(t, i) in store.tickets" :key="i" class="ticket-card">
        <img class="ticket-img" :src="t.image" :alt="t.title" />
        <div class="ticket-info">
          <div class="ticket-status status-confirmed">✓ Confirmed</div>
          <div class="ticket-name">{{ t.title }}</div>
          <div style="display: flex; gap: 16px; margin-bottom: 8px; font-size: 13px; color: var(--muted)">
            <span>📅 {{ t.date || 'Upcoming' }}</span><span>📍 {{ t.location || t.venue }}</span>
          </div>
          <div style="display: flex; gap: 12px; margin-bottom: 8px">
            <span style="background: var(--card2); border: 1px solid var(--border); padding: 3px 10px; border-radius: 6px; font-size: 13px">{{ t.tierName || 'Standard' }} × {{ t.qty || 1 }}</span>
            <span style="color: var(--emerald); font-weight: 700">{{ t.total ? t.total.toLocaleString('vi-VN') + 'đ' : t.price }}</span>
          </div>
          <div class="ticket-code">Booking: {{ t.bookingCode || 'ES-XXXXXXXX' }}</div>
        </div>
        <div style="padding: 20px; display: flex; flex-direction: column; justify-content: center; gap: 8px">
          <button class="btn btn-outline btn-sm">📥 Download</button>
          <button class="btn btn-outline btn-sm">📤 Share</button>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { store } from '../stores/eventStore'
</script>
