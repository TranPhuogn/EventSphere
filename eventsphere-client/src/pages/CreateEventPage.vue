<template>
  <div class="page-enter">
    <div v-if="submitted" style="text-align: center; padding: 80px 0">
      <div style="font-size: 64px; margin-bottom: 16px">🎉</div>
      <div style="font-family: Clash Display, sans-serif; font-size: 32px; font-weight: 700; color: var(--emerald); margin-bottom: 8px">Event Created!</div>
      <div style="color: var(--muted); margin-bottom: 24px">Your event is under review and will go live within 24 hours.</div>
      <button class="btn btn-primary" @click="submitted = false">Create Another</button>
    </div>
    <template v-else>
      <div style="margin: 24px 0 24px; font-family: Clash Display, sans-serif; font-size: 28px; font-weight: 700">Create New Event</div>
      <div style="display: grid; grid-template-columns: 1fr 360px; gap: 24px">
        <div style="background: var(--card); border: 1px solid var(--border); border-radius: 20px; padding: 28px">
          <div class="detail-section-title">Event Details</div>
          <div class="form-group"><label class="form-label">Event Title *</label><input class="form-input" placeholder="Enter your event name" v-model="form.title" /></div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px">
            <div class="form-group"><label class="form-label">Category</label>
              <select class="form-input" v-model="form.category"><option value="concerts">Concerts</option><option value="arts">Arts & Theatre</option><option value="sports">Sports</option><option value="experiences">Experiences</option><option value="workshops">Workshops</option></select>
            </div>
            <div class="form-group"><label class="form-label">Date</label><input class="form-input" type="date" v-model="form.date" /></div>
            <div class="form-group"><label class="form-label">Time</label><input class="form-input" type="time" v-model="form.time" /></div>
            <div class="form-group"><label class="form-label">Ticket Price (đ)</label><input class="form-input" placeholder="e.g. 500000" v-model="form.price" /></div>
          </div>
          <div class="form-group"><label class="form-label">Venue / Location</label><input class="form-input" placeholder="Full address" v-model="form.location" /></div>
          <div class="form-group"><label class="form-label">Description</label><textarea class="form-input" rows="4" placeholder="Describe your event..." style="resize: vertical" v-model="form.description"></textarea></div>
        </div>
        <div style="display: flex; flex-direction: column; gap: 16px">
          <div style="background: var(--card); border: 1px solid var(--border); border-radius: 20px; padding: 24px">
            <div class="detail-section-title">Event Cover Image</div>
            <div style="border: 2px dashed var(--border); border-radius: 12px; padding: 32px 20px; text-align: center; cursor: pointer">
              <div style="font-size: 40px; margin-bottom: 8px">📸</div>
              <div style="font-size: 14px; color: var(--muted)">Click to upload image</div>
              <div style="font-size: 12px; color: var(--muted); margin-top: 4px">PNG, JPG up to 10MB</div>
            </div>
          </div>
          <div style="background: var(--card); border: 1px solid var(--border); border-radius: 20px; padding: 24px">
            <div style="font-weight: 600; margin-bottom: 12px">Ticket Types</div>
            <div v-for="t in ['Standard', 'VIP', 'SVIP']" :key="t" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid var(--border); font-size: 14px">
              <span>{{ t }}</span><span style="color: var(--muted)">+ Add pricing</span>
            </div>
          </div>
          <button class="btn btn-primary" style="width: 100%; justify-content: center; padding: 14px; font-size: 16px" @click="submitted = true">🚀 Publish Event</button>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const form = ref({ title: '', category: 'concerts', date: '', time: '', location: '', price: '', description: '' })
const submitted = ref(false)
</script>
