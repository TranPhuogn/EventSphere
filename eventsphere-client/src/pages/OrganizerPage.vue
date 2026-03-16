<template>
  <div class="page-enter">
    <div style="margin: 24px 0 0; font-family: Clash Display, sans-serif; font-size: 28px; font-weight: 700">Organizer Center</div>
    <div class="organizer-layout">
      <div class="sidebar-nav">
        <div class="sidebar-section-title">Manage</div>
        <div v-for="l in links" :key="l.id" :class="['sidebar-link', activeSection === l.id ? 'active' : '']" @click="activeSection = l.id">
          <span>{{ l.icon }}</span>{{ l.label }}
        </div>
      </div>
      <div class="organizer-content">
        <!-- My Events -->
        <div v-if="activeSection === 'my-events'">
          <div class="stat-grid">
            <div v-for="[label, val, sub] in stats" :key="label" class="stat-card">
              <div class="stat-label">{{ label }}</div><div class="stat-value">{{ val }}</div><div class="stat-sub">{{ sub }}</div>
            </div>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px">
            <div style="font-family: Clash Display, sans-serif; font-size: 18px; font-weight: 700">My Events</div>
            <button class="btn btn-primary btn-sm">+ Create New Event</button>
          </div>
          <div style="background: var(--card); border: 1px solid var(--border); border-radius: 16px; overflow: hidden">
            <table class="data-table">
              <thead><tr><th>Event Name</th><th>Date</th><th>Tickets Sold</th><th>Revenue</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                <tr v-for="(e, i) in myEvents" :key="i">
                  <td style="font-weight: 500">{{ e.name }}</td>
                  <td style="color: var(--muted)">{{ e.date }}</td>
                  <td>{{ e.tickets }}</td>
                  <td style="color: var(--emerald); font-weight: 600">{{ e.revenue }}</td>
                  <td><span :style="{ padding: '3px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, background: e.status === 'Active' ? 'rgba(0,200,83,0.15)' : 'rgba(255,255,255,0.05)', color: e.status === 'Active' ? 'var(--emerald)' : 'var(--muted)' }">{{ e.status }}</span></td>
                  <td><div style="display: flex; gap: 6px"><button class="btn btn-outline btn-sm">Edit</button><button class="btn btn-outline btn-sm">Stats</button></div></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- Reports -->
        <div v-if="activeSection === 'reports'">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px">
            <div style="font-family: Clash Display, sans-serif; font-size: 20px; font-weight: 700">Report Management</div>
            <div style="display: flex; gap: 8px">
              <button v-if="selected.length > 0" class="btn btn-danger btn-sm">🗑 Delete ({{ selected.length }})</button>
              <button class="btn btn-primary btn-sm">+ Generate Report</button>
            </div>
          </div>
          <div style="background: var(--card); border: 1px solid var(--border); border-radius: 16px; overflow: hidden">
            <table class="data-table">
              <thead><tr><th><input type="checkbox" @change="e => selected = e.target.checked ? reports.map((_, i) => i) : []" /></th><th>File Name</th><th>Created Date</th><th>Creator</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                <tr v-for="(r, i) in reports" :key="i">
                  <td><input type="checkbox" :checked="selected.includes(i)" @change="e => selected = e.target.checked ? [...selected, i] : selected.filter(s => s !== i)" /></td>
                  <td style="font-weight: 500">📄 {{ r.file }}</td>
                  <td style="color: var(--muted)">{{ r.created }}</td>
                  <td>{{ r.creator }}</td>
                  <td><span :style="{ padding: '3px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, background: r.status === 'Complete' ? 'rgba(0,200,83,0.15)' : 'rgba(255,165,0,0.15)', color: r.status === 'Complete' ? 'var(--emerald)' : 'orange' }">{{ r.status }}</span></td>
                  <td><div style="display: flex; gap: 6px"><button class="btn btn-outline btn-sm">View</button><button class="btn btn-outline btn-sm">📥</button><button class="btn btn-danger btn-sm">🗑</button></div></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- Terms -->
        <div v-if="activeSection === 'terms'">
          <div style="font-family: Clash Display, sans-serif; font-size: 20px; font-weight: 700; margin-bottom: 6px">Terms for Organizers</div>
          <div style="color: var(--muted); font-size: 14px; margin-bottom: 24px">Please review all policies before hosting events on EventSphere.</div>
          <div v-for="(d, i) in docs" :key="i" class="doc-item">
            <div style="display: flex; align-items: center; flex: 1">
              <span class="doc-icon">{{ d.icon }}</span>
              <div><div class="doc-title">{{ d.title }}</div><div class="doc-meta">{{ d.desc }}</div><div style="font-size: 11px; color: var(--muted); margin-top: 3px">{{ d.meta }}</div></div>
            </div>
            <button class="btn btn-outline btn-sm" @click.stop>📥 Download</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const activeSection = ref('my-events')
const selected = ref([])
const links = [{ id: 'my-events', icon: '📅', label: 'My Events' }, { id: 'reports', icon: '📊', label: 'Report Management' }, { id: 'terms', icon: '📋', label: 'Terms for Organizers' }]
const stats = [['Total Events', '3', 'All time'], ['Active Events', '2', 'Currently live'], ['Total Tickets', '402', 'Sold'], ['Revenue', '100.5M đ', 'This year']]
const myEvents = [
  { name: 'Tech Summit HCM 2025', date: '15 Mar 2025', status: 'Active', tickets: 234, revenue: '58,500,000đ' },
  { name: 'Coffee & Code Workshop', date: '22 Mar 2025', status: 'Active', tickets: 18, revenue: '4,500,000đ' },
  { name: 'Digital Art Exhibition', date: '28 Feb 2025', status: 'Ended', tickets: 150, revenue: '37,500,000đ' },
]
const reports = [
  { file: 'Sales_Report_Feb_2025.xlsx', created: '01 Mar 2025', creator: 'Auto', status: 'Complete' },
  { file: 'Attendee_List_Summit.csv', created: '16 Mar 2025', creator: 'Admin', status: 'Complete' },
  { file: 'Revenue_Q1_2025.pdf', created: '01 Mar 2025', creator: 'System', status: 'Processing' },
]
const docs = [
  { icon: '🚫', title: 'Prohibited Goods and Services', meta: 'Updated 01 Jan 2025 · PDF · 2.4 MB', desc: 'List of items and services not permitted for sale or promotion through EventSphere' },
  { icon: '📢', title: 'Prohibited Advertising Categories', meta: 'Updated 15 Jan 2025 · PDF · 1.8 MB', desc: 'Categories of advertising content that are restricted on the platform' },
  { icon: '🖼', title: 'Content and Image Moderation Regulations', meta: 'Updated 10 Feb 2025 · PDF · 3.1 MB', desc: 'Standards and guidelines for all visual and written content submitted by organizers' },
]
</script>
