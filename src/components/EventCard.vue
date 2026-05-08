<template>
  <div 
    class="group relative flex flex-col bg-card border border-border-main rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:border-primary hover:shadow-[0_16px_48px_rgba(0,200,83,0.15),0_4px_16px_rgba(0,0,0,0.3)]"
    @click="goToEvent"
  >
    <!-- Poster Image Wrapper -->
    <div class="relative w-full aspect-[3/4] overflow-hidden">
      <img 
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
        :src="event.image" 
        :alt="event.title" 
        loading="lazy" 
      />
      
      <!-- Gradient overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none"></div>

      <!-- Wishlist -->
      <button 
        class="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-lg transition-all duration-200 hover:scale-110 hover:bg-black/70 z-10"
        @click.stop="toggleWishlist(event.id)"
      >
        {{ isWishlisted ? '❤️' : '🤍' }}
      </button>

      <!-- Status / Featured badges -->
      <div v-if="event.featured" class="absolute top-3 left-3 px-3 py-1 rounded-lg bg-danger/90 backdrop-blur-md text-white text-[11px] font-bold tracking-wider uppercase z-10">
        🔥 HOT
      </div>
      <div v-else-if="event.status === 'ended'" class="absolute top-3 left-3 px-3 py-1 rounded-lg bg-black/75 backdrop-blur-md text-muted text-[11px] font-bold tracking-wider uppercase z-10">
        Đã kết thúc
      </div>
      <div v-else-if="event.status === 'sold-out'" class="absolute top-3 left-3 px-3 py-1 rounded-lg bg-danger/85 backdrop-blur-md text-white text-[11px] font-bold tracking-wider uppercase z-10">
        Hết vé
      </div>
      <div v-else-if="event.status === 'upcoming'" class="absolute top-3 left-3 px-3 py-1 rounded-lg bg-primary/20 backdrop-blur-md border border-primary/50 text-primary text-[11px] font-bold tracking-wider uppercase z-10">
        Sắp diễn ra
      </div>

      <!-- Price overlay -->
      <div class="absolute bottom-3 left-3 flex items-baseline gap-1.5 z-10">
        <span class="text-[12px] text-white/70 font-medium">Từ</span>
        <span class="font-heading text-lg font-bold text-primary drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">{{ lowestPrice }}</span>
      </div>
    </div>

    <!-- Body -->
    <div class="flex flex-col gap-1 p-4 pb-4.5 flex-1">
      <div class="text-[11px] font-bold text-primary uppercase tracking-wider">
        {{ categoryLabel }}
        <span v-if="primaryPerformer" class="text-muted font-medium lowercase first-letter:uppercase"> · {{ primaryPerformer }}</span>
      </div>
      <div class="font-heading text-[15px] font-bold text-main line-clamp-2 leading-snug my-0.5">
        {{ event.title }}
      </div>
      <div class="flex items-center gap-1.5 text-[12px] text-muted">
        <span>📅</span> {{ formatDate(event.dateStart) }}
      </div>
      <div class="flex items-center gap-1.5 text-[12px] text-muted">
        <span>📍</span> {{ event.location?.name || '' }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { selectEvent, store, toggleWishlist as storeToggleWishlist } from '../stores/eventStore'

const props = defineProps({ event: { type: Object, required: true } })
const router = useRouter()

const isWishlisted = computed(() => store.wishlist.includes(props.event.id))

const CATEGORY_LABELS = {
  concerts: 'Nhạc & Concert',
  arts: 'Sân khấu & Nghệ thuật',
  sports: 'Thể thao',
  experiences: 'Trải nghiệm',
  workshops: 'Workshop',
}

const categoryLabel = computed(() => CATEGORY_LABELS[props.event.category] || props.event.category || '')

const primaryPerformer = computed(() => {
  if (props.event.performers && props.event.performers.length > 0) {
    return props.event.performers[0].name
  }
  return null
})

const lowestPrice = computed(() => {
  if (props.event.priceRange && props.event.priceRange.min > 0) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(props.event.priceRange.min)
  }
  return 'Miễn phí'
})

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  try {
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return dateStr
    return d.toLocaleDateString('vi-VN', { day: '2-digit', month: 'short', year: 'numeric' })
  } catch(e) {
    return dateStr
  }
}

const toggleWishlist = (id) => {
  storeToggleWishlist(id)
}

const goToEvent = () => {
  selectEvent(props.event)
  router.push('/event/' + props.event.id)
}
</script>

<style scoped>
.event-info-item {
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>
