<template>
  <div class="page-enter">
    <div style="margin: 24px 0 20px; font-family: Clash Display, sans-serif; font-size: 28px; font-weight: 700">My Profile</div>
    <div class="profile-header">
      <div class="profile-avatar">N</div>
      <div>
        <div class="profile-name">{{ form.name }}</div>
        <div class="profile-email">{{ form.email }}</div>
        <div style="display: flex; gap: 8px; margin-top: 10px">
          <span style="background: var(--emerald-dim); color: var(--emerald); padding: 3px 10px; border-radius: 20px; font-size: 12px; font-weight: 600">⭐ EventSphere Member</span>
          <span style="background: var(--card); border: 1px solid var(--border); padding: 3px 10px; border-radius: 20px; font-size: 12px">Since 2024</span>
        </div>
      </div>
    </div>
    <div style="background: var(--card); border: 1px solid var(--border); border-radius: 20px; padding: 28px">
      <div class="detail-section-title">Personal Information</div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px">
        <div class="form-group"><label class="form-label">Full Name</label><input class="form-input" v-model="form.name" /></div>
        <div class="form-group"><label class="form-label">Email</label><input class="form-input" v-model="form.email" /></div>
        <div class="form-group"><label class="form-label">Phone</label><input class="form-input" v-model="form.phone" /></div>
        <div class="form-group"><label class="form-label">City</label><input class="form-input" v-model="form.city" /></div>
      </div>
      <button class="btn btn-primary" @click="saved = true" style="margin-top: 8px">{{ saved ? '✓ Saved!' : 'Save Changes' }}</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const form = ref({ name: 'Nguyễn Văn A', email: 'user@example.com', phone: '0901 234 567', city: 'Hồ Chí Minh' })
const saved = ref(false)
</script>
