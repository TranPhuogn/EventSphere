<template>
  <div class="flex flex-col gap-12 py-8">
    <!-- HERO SECTION -->
    <div class="relative h-[400px] md:h-[500px] bg-card rounded-[32px] overflow-hidden shadow-2xl">
      <div 
        v-for="(s, i) in heroSlides" 
        :key="s.id" 
        class="absolute inset-0 transition-opacity duration-700 ease-in-out flex items-center"
        :class="[i === slide ? 'opacity-100 z-10' : 'opacity-0 z-0']"
      >
        <!-- Background with Image and Gradient -->
        <div class="absolute inset-0">
          <img :src="s.event.image" :alt="s.event.title" class="w-full h-full object-cover opacity-40 scale-105" />
          <div class="absolute inset-0 bg-gradient-to-r from-bg via-bg/80 to-transparent"></div>
        </div>

        <!-- Content -->
        <div class="relative z-20 px-8 md:px-16 max-w-2xl">
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-dim border border-primary text-primary text-[12px] font-bold tracking-wider uppercase mb-6">
            <span>🔥</span>
            {{ s.event.category === 'concerts' ? 'Featured Concert' : s.event.category === 'sports' ? 'Big Match' : 'Featured Show' }}
          </div>
          
          <h1 class="font-heading text-4xl md:text-6xl font-bold text-white leading-[1.1] mb-6">
            {{ s.event.title }}
          </h1>
          
          <div class="flex flex-wrap gap-6 mb-8 text-muted">
            <div class="flex items-center gap-2 text-[14px] md:text-[16px]">
              <span class="text-lg">📅</span> {{ formatDate(s.event.dateStart) }}
            </div>
            <div class="flex items-center gap-2 text-[14px] md:text-[16px]">
              <span class="text-lg">📍</span> {{ s.event.location?.name }}
            </div>
          </div>

          <div class="font-heading text-2xl md:text-3xl font-bold text-primary mb-8">
            Từ {{ formatPrice(s.event.priceRange) }}
          </div>

          <div class="flex items-center gap-4">
            <BaseButton variant="primary" size="lg" @click="goToEvent(s.event)">
              Đặt vé ngay
            </BaseButton>
            <BaseButton variant="outline" size="lg" @click="goToEvent(s.event)" class="!border-white/20 !text-white hover:!bg-white/10">
              Chi tiết
            </BaseButton>
          </div>
        </div>
      </div>

      <!-- Controls -->
      <button 
        class="absolute top-1/2 left-6 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-md border border-white/10 text-white text-2xl hover:bg-primary hover:border-primary hover:text-black transition-all"
        @click="goSlide((slide - 1 + heroSlides.length) % heroSlides.length)"
      >
        ‹
      </button>
      <button 
        class="absolute top-1/2 right-6 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-md border border-white/10 text-white text-2xl hover:bg-primary hover:border-primary hover:text-black transition-all"
        @click="goSlide((slide + 1) % heroSlides.length)"
      >
        ›
      </button>

      <!-- Dots -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2.5">
        <div 
          v-for="(_, i) in heroSlides" 
          :key="i" 
          class="h-2 rounded-full cursor-pointer transition-all duration-300" 
          :class="[i === slide ? 'w-8 bg-primary shadow-[0_0_12px_rgba(0,200,83,0.6)]' : 'w-2 bg-white/30']"
          @click="goSlide(i)" 
        />
      </div>
    </div>

    <!-- TRENDING SECTION -->
    <section class="flex flex-col gap-6">
      <div class="flex items-center justify-between">
        <h2 class="font-heading text-2xl font-bold text-main flex items-center gap-3">
          🔥 Xu hướng <span class="px-2 py-0.5 rounded bg-danger/10 text-danger text-[11px] font-bold uppercase tracking-widest">Hot</span>
        </h2>
        <router-link to="/concerts" class="text-sm font-bold text-primary hover:gap-2 flex items-center gap-1 transition-all">
          Xem tất cả <span>→</span>
        </router-link>
      </div>
      
      <div class="flex gap-5 overflow-x-auto pb-4 scroll-smooth hide-scroll">
        <EventCard 
          v-for="e in trending" 
          :key="e.id" 
          :event="e" 
          class="w-[220px] md:w-[240px] flex-shrink-0"
        />
      </div>
    </section>

    <!-- PROMO BANNER 1 -->
    <div class="relative bg-gradient-to-br from-[#001A0A] via-[#003318] to-primary/10 border border-primary/20 rounded-[32px] p-10 md:p-16 overflow-hidden flex items-center justify-between">
      <div class="relative z-10 max-w-xl">
        <div class="text-[12px] text-primary font-bold tracking-[0.1em] uppercase mb-3">Ưu đãi có hạn</div>
        <h2 class="font-heading text-3xl md:text-4xl font-bold text-white mb-4">Vé Sớm Giá Hời 🎟️</h2>
        <p class="text-muted text-lg mb-8 leading-relaxed">
          Giảm đến 40% cho các sự kiện chọn lọc. Nhanh tay săn ngay trước khi hết vé!
        </p>
        <BaseButton variant="primary" size="lg" @click="router.push('/concerts')">
          Xem ưu đãi ngay
        </BaseButton>
      </div>
      <div class="hidden lg:block absolute right-16 top-1/2 -translate-y-1/2 text-[140px] opacity-10 pointer-events-none grayscale">🎵</div>
    </div>

    <!-- CATEGORY SECTIONS -->
    <section v-for="cat in categories" :key="cat.key" class="flex flex-col gap-6">
      <div class="flex items-center justify-between">
        <h2 class="font-heading text-2xl font-bold text-main flex items-center gap-3">
          <span>{{ cat.icon }}</span> {{ cat.label }}
        </h2>
        <router-link :to="'/' + cat.key" class="text-sm font-bold text-primary hover:gap-2 flex items-center gap-1 transition-all">
          Xem tất cả <span>→</span>
        </router-link>
      </div>

      <div class="flex gap-5 overflow-x-auto pb-4 scroll-smooth hide-scroll">
        <EventCard 
          v-for="e in cat.items" 
          :key="e.id" 
          :event="e" 
          class="w-[220px] md:w-[240px] flex-shrink-0"
        />
      </div>

      <!-- PROMO BANNER 2 (After Sports) -->
      <div v-if="cat.key === 'sports'" class="relative mt-8 bg-gradient-to-br from-[#0A001A] via-[#180030] to-purple-500/10 border border-purple-500/20 rounded-[32px] p-10 md:p-16 overflow-hidden flex items-center justify-between">
        <div class="relative z-10 max-w-xl">
          <div class="text-[12px] text-purple-400 font-bold tracking-[0.1em] uppercase mb-3">Dành cho nhà tổ chức</div>
          <h2 class="font-heading text-3xl md:text-4xl font-bold text-white mb-4">Tổ Chức Sự Kiện Của Bạn 🚀</h2>
          <p class="text-muted text-lg mb-8 leading-relaxed">
            Tiếp cận hàng triệu người yêu thích sự kiện. Thiết lập trang bán vé chỉ trong vài phút.
          </p>
          <BaseButton variant="primary" size="lg" @click="router.push('/organizer')" class="!bg-purple-600 hover:!bg-purple-500">
            Tạo sự kiện ngay
          </BaseButton>
        </div>
        <div class="hidden lg:block absolute right-16 top-1/2 -translate-y-1/2 text-[140px] opacity-10 pointer-events-none grayscale">🎪</div>
      </div>
    </section>

    <!-- SUPPORT & COMPANY SECTION -->
    <InfoSection />
  </div>
</template>


<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getEvents, selectEvent } from '../stores/eventStore'
import EventCard from '../components/EventCard.vue'
import BaseButton from '../components/ui/BaseButton.vue'
import InfoSection from '../components/layout/InfoSection.vue'

const router = useRouter()
const allEvents = getEvents()

const slide = ref(0)
let timer = null

const heroSlides = computed(() => {
  const featured = allEvents.filter(e => e.featured).slice(0, 3)
  const bgs = [
    "linear-gradient(135deg, #0A1A0F 0%, #003315 50%, #001A0A 100%)",
    "linear-gradient(135deg, #0A0F1A 0%, #001530 50%, #000A1A 100%)",
    "linear-gradient(135deg, #1A0A10 0%, #300015 50%, #1A000A 100%)"
  ]
  return featured.map((ev, i) => ({ id: ev.id, event: ev, bg: bgs[i % bgs.length] }))
})

const goSlide = (n) => {
  if (heroSlides.value.length === 0) return;
  slide.value = n
  clearInterval(timer)
  timer = setInterval(() => { slide.value = (slide.value + 1) % heroSlides.value.length }, 5000)
}

const goToEvent = (event) => {
  selectEvent(event)
  router.push('/event/' + event.id)
}

onMounted(() => { 
  if (heroSlides.value.length > 0) {
    timer = setInterval(() => { slide.value = (slide.value + 1) % heroSlides.value.length }, 5000) 
  }
})
onUnmounted(() => clearInterval(timer))

const trending = computed(() => allEvents.filter(e => e.featured).slice(0, 10))

const categories = computed(() => {
  const cats = [
    { key: 'concerts', icon: '🎵', label: 'Concerts' },
    { key: 'sports', icon: '⚽', label: 'Sports' },
    { key: 'arts', icon: '🎭', label: 'Arts & Theatre' },
    { key: 'experiences', icon: '🧭', label: 'Experiences' },
    { key: 'workshops', icon: '📚', label: 'Workshops' },
  ]
  return cats.map(c => ({
    ...c,
    items: allEvents.filter(e => e.category === c.key).slice(0, 10)
  })).filter(c => c.items.length > 0)
})

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  try {
    const d = new Date(dateStr)
    return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
  } catch(e) {
    return dateStr
  }
}

const formatPrice = (range) => {
  if (!range) return '0đ'
  if (range.min === 0 && range.max === 0) return 'Free'
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(range.min)
}
</script>
