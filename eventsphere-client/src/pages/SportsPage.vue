<template>
  <div class="page-enter">
    <div class="page-banner">
      <img src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1400&q=80" alt="Sports" />
      <div class="page-banner-overlay" style="background: linear-gradient(90deg, rgba(0,10,30,0.92) 0%, rgba(0,0,0,0.3) 100%)">
        <div>
          <div style="font-size: 13px; color: #60A5FA; font-weight: 700; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.08em">⚽ Live Sports</div>
          <div class="page-banner-title">Sports Events</div>
          <div class="page-banner-sub">Cheer for your team, feel the crowd energy</div>
        </div>
      </div>
    </div>
    <!-- Countdown -->
    <div style="background: linear-gradient(135deg, #000A1A 0%, #00102A 100%); border: 1px solid rgba(96,165,250,0.2); border-radius: 14px; padding: 20px 28px; margin-bottom: 24px; display: flex; align-items: center; justify-content: space-between">
      <div>
        <div style="font-size: 12px; color: #60A5FA; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px">🔴 Next Match Countdown</div>
        <div style="font-family: Clash Display, sans-serif; font-size: 16px; font-weight: 600">HCMC FC vs. Hà Nội FC · Sat 15 Mar</div>
      </div>
      <div style="display: flex; gap: 12px">
        <div v-for="[label, val] in countdownDisplay" :key="label" style="text-align: center; background: rgba(96,165,250,0.1); border: 1px solid rgba(96,165,250,0.2); border-radius: 10px; padding: 10px 16px">
          <div style="font-family: JetBrains Mono, monospace; font-size: 28px; font-weight: 700; color: #60A5FA">{{ val }}</div>
          <div style="font-size: 11px; color: var(--muted)">{{ label }}</div>
        </div>
      </div>
    </div>
    <div class="filter-bar">
      <span class="filter-label">Sport:</span>
      <button v-for="s in sports" :key="s" :class="['filter-chip', sport === s ? 'active' : '']" @click="sport = s">{{ s }}</button>
      <div style="margin-left: auto"><select class="filter-select"><option>All Locations</option><option>Hà Nội</option><option>Hồ Chí Minh</option></select></div>
    </div>
    <div style="margin-bottom: 16px">
      <div v-for="e in filtered" :key="e.id" class="match-card" @click="goToEvent(e)">
        <div>
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px">
            <span style="font-size: 12px; color: #60A5FA; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em">{{ e.sport }}</span>
            <span v-if="e.countdown" class="countdown-badge">🔴 Upcoming</span>
          </div>
          <div v-if="e.teams" style="display: flex; align-items: center; gap: 0">
            <span class="team-name">{{ e.teams[0] }}</span>
            <span class="vs-badge">VS</span>
            <span class="team-name">{{ e.teams[1] }}</span>
          </div>
          <span v-else class="team-name">{{ e.title }}</span>
          <div style="display: flex; gap: 16px; margin-top: 8px; font-size: 13px; color: var(--muted)">
            <span>📅 {{ e.date }}</span><span>⏰ {{ e.time }}</span><span>📍 {{ e.location }}</span>
          </div>
        </div>
        <div style="text-align: right; flex-shrink: 0">
          <div style="color: var(--muted); font-size: 11px; margin-bottom: 4px">from</div>
          <div style="font-size: 20px; font-weight: 700; color: var(--emerald); margin-bottom: 10px">{{ e.price }}</div>
          <button class="btn btn-primary btn-sm" @click.stop="goToEvent(e)">Get Tickets</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { EVENTS } from '../data'
import { selectEvent } from '../stores/eventStore'

const router = useRouter()
const sport = ref('All')
const sports = ['All', 'Football', 'Basketball', 'Tennis', 'Running']
const filtered = computed(() => EVENTS.sports.filter(e => sport.value === 'All' || e.sport === sport.value))

const goToEvent = (event) => {
  selectEvent(event)
  router.push('/event/' + event.id)
}

const countdown = ref({ h: 11, m: 34, s: 22 })
let timer = null
onMounted(() => {
  timer = setInterval(() => {
    let { h, m, s } = countdown.value
    s--
    if (s < 0) { s = 59; m-- }
    if (m < 0) { m = 59; h-- }
    if (h < 0) { h = 23; m = 59; s = 59 }
    countdown.value = { h, m, s }
  }, 1000)
})
onUnmounted(() => clearInterval(timer))
const pad = n => String(n).padStart(2, '0')
const countdownDisplay = computed(() => [['Hours', pad(countdown.value.h)], ['Minutes', pad(countdown.value.m)], ['Seconds', pad(countdown.value.s)]])
</script>
