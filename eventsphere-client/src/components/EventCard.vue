<template>
  <div class="event-card" @click="goToEvent">
    <img class="card-img" :src="event.image" :alt="event.title" loading="lazy" />
    <div class="card-body">
      <div v-if="event.category" class="card-category">{{ event.category }}</div>
      <div v-if="event.artist" class="card-category">{{ event.artist }}</div>
      <div v-if="event.instructor" class="instructor-badge">
        <div class="instructor-avatar">{{ event.instructor[0] }}</div>
        <span style="font-size: 12px; color: var(--muted)">{{ event.instructor }}</span>
      </div>
      <div class="card-title">{{ event.title }}</div>
      <div v-if="event.date" class="card-meta"><span>📅</span>{{ event.date }} {{ event.time || '' }}</div>
      <div v-if="event.location" class="card-meta"><span>📍</span>{{ event.location }}</div>
      <div v-if="event.venue" class="card-meta"><span>🎭</span>{{ event.venue }}</div>
      <div v-if="event.duration" class="card-meta"><span>⏱</span>{{ event.duration }}</div>
      <div v-if="event.slots !== undefined" style="margin-top: 8px">
        <SlotsBadge :total="20" :filled="20 - event.slots" />
      </div>
      <div v-if="event.level" style="margin-top: 8px">
        <LevelBadge :level="event.level" />
      </div>
      <div class="card-footer">
        <div>
          <div class="card-price-label">from</div>
          <div class="card-price">{{ event.price }}</div>
        </div>
        <button class="btn btn-primary btn-sm" @click.stop="goToEvent">Details →</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { selectEvent } from '../stores/eventStore'
import SlotsBadge from './SlotsBadge.vue'
import LevelBadge from './LevelBadge.vue'

const props = defineProps({ event: { type: Object, required: true } })
const router = useRouter()

const goToEvent = () => {
  selectEvent(props.event)
  router.push('/event/' + props.event.id)
}
</script>
