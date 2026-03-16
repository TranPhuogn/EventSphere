<template>
  <div class="page-enter">
    <!-- HERO -->
    <div class="hero">
      <div v-for="(s, i) in HERO_SLIDES" :key="s.id" :class="['hero-slide', i === slide ? 'active' : '']" :style="{ background: s.bg }">
        <div class="hero-bg">
          <img :src="s.event.image" :alt="s.event.title" />
          <div class="hero-gradient" />
        </div>
        <div class="hero-content">
          <div class="hero-badge">
            <span>🔥</span>
            {{ s.event.category === 'concerts' ? 'Featured Concert' : s.event.category === 'sports' ? 'Big Match' : 'Featured Show' }}
          </div>
          <div class="hero-title">{{ s.event.title }}</div>
          <div class="hero-meta">
            <span class="hero-meta-item"><span>📅</span>{{ s.event.date }}</span>
            <span class="hero-meta-item"><span>📍</span>{{ s.event.location }}</span>
          </div>
          <div class="hero-price">From {{ s.event.price }}</div>
          <div class="hero-actions">
            <button class="btn btn-primary" @click="goToEvent(s.event)">Book Now</button>
            <button class="btn btn-outline" style="border-color: rgba(255,255,255,0.2); color: #fff" @click="goToEvent(s.event)">View Details</button>
          </div>
        </div>
      </div>
      <div class="hero-arrow left" @click="goSlide((slide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)">‹</div>
      <div class="hero-arrow right" @click="goSlide((slide + 1) % HERO_SLIDES.length)">›</div>
      <div class="hero-dots">
        <div v-for="(_, i) in HERO_SLIDES" :key="i" :class="['hero-dot', i === slide ? 'active' : '']" @click="goSlide(i)" />
      </div>
    </div>

    <!-- Trending -->
    <div class="section">
      <div class="section-header">
        <div class="section-title">🔥 Trending Now <span class="section-badge">Hot</span></div>
        <router-link to="/concerts" class="see-all">See all →</router-link>
      </div>
      <div class="scroll-row">
        <EventCard v-for="e in trending" :key="e.id" :event="e" />
      </div>
    </div>

    <!-- Promo 1 -->
    <div class="promo-banner promo-1">
      <div>
        <div style="font-size: 12px; color: var(--emerald); font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px">Limited Time Offer</div>
        <div class="promo-title">Early Bird Deals 🎟️</div>
        <div class="promo-sub">Save up to 40% on selected events. Grab your tickets before they're gone!</div>
        <router-link to="/concerts" class="btn btn-primary">Browse Deals</router-link>
      </div>
      <div class="promo-deco">🎵</div>
    </div>

    <!-- Category sections -->
    <div v-for="cat in categories" :key="cat.key" class="section">
      <div class="section-header">
        <div class="section-title">{{ cat.icon }} {{ cat.label }}</div>
        <router-link :to="'/' + cat.key" class="see-all">See all →</router-link>
      </div>
      <div class="scroll-row">
        <EventCard v-for="e in cat.items" :key="e.id" :event="e" />
      </div>
      <!-- Promo 2 after sports -->
      <div v-if="cat.key === 'sports'" class="promo-banner promo-2" style="margin-top: 52px">
        <div>
          <div style="font-size: 12px; color: #A78BFA; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px">For Organizers</div>
          <div class="promo-title">Host Your Event 🚀</div>
          <div class="promo-sub">Reach millions of event-goers. Set up your event page in minutes with our powerful tools.</div>
          <router-link to="/organizer" class="btn btn-primary" style="background: #7C3AED">Create Event Free</router-link>
        </div>
        <div class="promo-deco">🎪</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { EVENTS, HERO_SLIDES } from '../data'
import { selectEvent } from '../stores/eventStore'
import EventCard from '../components/EventCard.vue'

const router = useRouter()

const slide = ref(0)
let timer = null

const goSlide = (n) => {
  slide.value = n
  clearInterval(timer)
  timer = setInterval(() => { slide.value = (slide.value + 1) % HERO_SLIDES.length }, 5000)
}

const goToEvent = (event) => {
  selectEvent(event)
  router.push('/event/' + event.id)
}

onMounted(() => { timer = setInterval(() => { slide.value = (slide.value + 1) % HERO_SLIDES.length }, 5000) })
onUnmounted(() => clearInterval(timer))

const trending = computed(() => [
  ...EVENTS.concerts.slice(0, 3).map(e => ({ ...e, category: e.genre })),
  ...EVENTS.sports.slice(0, 2).map(e => ({ ...e, category: e.sport })),
  ...EVENTS.arts.slice(0, 2).map(e => ({ ...e, category: e.type })),
])

const categories = computed(() => [
  { key: 'concerts', icon: '🎵', label: 'Concerts', items: EVENTS.concerts.map(e => ({ ...e, category: e.genre })) },
  { key: 'sports', icon: '⚽', label: 'Sports', items: EVENTS.sports.map(e => ({ ...e, category: e.sport })) },
  { key: 'arts', icon: '🎭', label: 'Arts & Theatre', items: EVENTS.arts.map(e => ({ ...e, category: e.type })) },
  { key: 'experiences', icon: '🧭', label: 'Experiences', items: EVENTS.experiences },
  { key: 'workshops', icon: '📚', label: 'Workshops', items: EVENTS.workshops },
])
</script>
