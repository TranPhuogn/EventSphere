<template>
  <div v-if="event" class="flex flex-col gap-8 pb-16 animate-in fade-in duration-500">
    <!-- Premium Hero Banner -->
    <div class="relative w-screen ml-[calc(-50vw+50%)] h-[400px] md:h-[480px] overflow-hidden -mb-24 md:-mb-32">
      <!-- Blurred Background -->
      <div class="absolute inset-0">
        <img :src="event.image" :alt="event.title" class="w-full h-full object-cover blur-2xl brightness-[0.35] saturate-[1.3] scale-110" />
        <div class="absolute inset-0 bg-gradient-to-b from-bg/30 via-bg/70 to-bg"></div>
      </div>

      <!-- Content Container -->
      <div class="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 h-full flex items-end pb-32 md:pb-40 gap-8">
        <!-- Floating Poster -->
        <div class="hidden md:block w-[280px] h-[380px] rounded-2xl overflow-hidden flex-shrink-0 shadow-[0_16px_60px_rgba(0,0,0,0.5)] border-2 border-white/10">
          <img :src="event.image" :alt="event.title" class="w-full h-full object-cover" />
        </div>

        <!-- Event Info -->
        <div class="flex-1 pb-2">
          <div class="text-[12px] font-bold text-primary uppercase tracking-[0.1em] mb-3">
            {{ categoryLabel }}
          </div>
          <h1 class="font-heading text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
            {{ event.title }}
          </h1>
          <div class="flex flex-wrap gap-x-6 gap-y-3">
            <div class="flex items-center gap-2.5 text-[15px] text-white/80">
              <span class="text-lg">📅</span> {{ formatDate(event.dateStart) }}
            </div>
            <div v-if="event.time" class="flex items-center gap-2.5 text-[15px] text-white/80">
              <span class="text-lg">🕐</span> {{ event.time }}
            </div>
            <div class="flex items-center gap-2.5 text-[15px] text-white/80">
              <span class="text-lg">📍</span> {{ event.location?.name }}
            </div>
            <div class="flex items-center gap-2.5 text-[15px] text-white/80">
              <span class="text-lg">{{ event.status === 'upcoming' ? '🟢' : '🔴' }}</span>
              {{ event.status === 'upcoming' ? 'Sắp diễn ra' : 'Đã kết thúc' }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="relative z-20 grid grid-cols-1 lg:grid-cols-[1fr,380px] gap-8 mt-4">
      <!-- Left: Content Sections -->
      <div class="flex flex-col gap-10 min-w-0">
        <!-- Mobile Poster (only on small screens) -->
        <div class="md:hidden w-full aspect-[16/9] rounded-2xl overflow-hidden border border-border-main">
          <img :src="event.image" :alt="event.title" class="w-full h-full object-cover" />
        </div>

        <!-- Quick Meta Row -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="flex flex-col gap-1 p-5 bg-card/80 backdrop-blur-xl border border-border-main rounded-2xl hover:border-primary transition-colors">
            <span class="text-xl mb-2">📅</span>
            <div class="text-[11px] text-muted font-bold uppercase tracking-wider">Ngày diễn ra</div>
            <div class="text-[15px] font-bold text-main">{{ formatDate(event.dateStart) }}</div>
            <div v-if="event.time" class="text-[13px] text-muted">{{ event.time }}</div>
          </div>
          <div class="flex flex-col gap-1 p-5 bg-card/80 backdrop-blur-xl border border-border-main rounded-2xl hover:border-primary transition-colors">
            <span class="text-xl mb-2">📍</span>
            <div class="text-[11px] text-muted font-bold uppercase tracking-wider">Địa điểm</div>
            <div class="text-[15px] font-bold text-main">{{ event.location?.name }}</div>
          </div>
          <div class="flex flex-col gap-1 p-5 bg-card/80 backdrop-blur-xl border border-border-main rounded-2xl hover:border-primary transition-colors">
            <span class="text-xl mb-2">🏷️</span>
            <div class="text-[11px] text-muted font-bold uppercase tracking-wider">Thể loại</div>
            <div class="text-[15px] font-bold text-main">{{ categoryLabel }}</div>
          </div>
        </div>

        <!-- Performers -->
        <section v-if="event.performers && event.performers.length > 0">
          <h2 class="font-heading text-xl font-bold text-main mb-4 flex items-center gap-2">
            <span>🎤</span> Nghệ sĩ / Khách mời
          </h2>
          <div class="flex flex-wrap gap-3">
            <div v-for="p in event.performers" :key="p.name" class="flex items-center gap-3 bg-card border border-border-main rounded-xl p-3 px-4 min-w-[200px] hover:-translate-y-0.5 hover:border-primary transition-all group">
              <div class="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-primary-dark text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-primary/25 group-hover:scale-110 transition-transform">
                {{ p.name.charAt(0) }}
              </div>
              <div>
                <div class="text-[14px] font-bold text-main">{{ p.name }}</div>
                <div class="text-[12px] text-muted">{{ p.role }}</div>
              </div>
            </div>
          </div>
        </section>

        <!-- Description -->
        <section>
          <h2 class="font-heading text-xl font-bold text-main mb-4 flex items-center gap-2">
            <span>📝</span> Giới thiệu sự kiện
          </h2>
          <p class="text-[15px] leading-relaxed text-muted whitespace-pre-wrap">
            {{ event.description || defaultDescription }}
          </p>
        </section>

        <!-- Highlights -->
        <section>
          <h2 class="font-heading text-xl font-bold text-main mb-4 flex items-center gap-2">
            <span>✨</span> Điểm nổi bật
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div v-for="h in highlights" :key="h.text" class="flex items-center gap-3 p-4 bg-card border border-border-main rounded-xl hover:border-primary transition-colors">
              <span class="text-xl flex-shrink-0">{{ h.icon }}</span>
              <span class="text-[14px] text-main">{{ h.text }}</span>
            </div>
          </div>
        </section>

        <!-- Policies -->
        <section>
          <h2 class="font-heading text-xl font-bold text-main mb-4 flex items-center gap-2">
            <span>📋</span> Lưu ý & Chính sách
          </h2>
          <div class="flex flex-col gap-4">
            <div class="flex gap-4 p-5 bg-card border border-border-main rounded-2xl hover:border-primary transition-colors">
              <span class="text-2xl flex-shrink-0 mt-0.5">🎟️</span>
              <div>
                <div class="text-[14px] font-bold text-main mb-1.5">Chính sách vé</div>
                <p class="text-[13px] text-muted leading-relaxed">
                  Vé đã mua không được đổi hoặc trả lại. Mỗi vé chỉ có giá trị sử dụng một lần.
                </p>
              </div>
            </div>
            <div class="flex gap-4 p-5 bg-card border border-border-main rounded-2xl hover:border-primary transition-colors">
              <span class="text-2xl flex-shrink-0 mt-0.5">⏰</span>
              <div>
                <div class="text-[14px] font-bold text-main mb-1.5">Thời gian check-in</div>
                <p class="text-[13px] text-muted leading-relaxed">
                  Cổng mở trước giờ diễn 60 phút. Vui lòng đến sớm để có vị trí tốt nhất.
                </p>
              </div>
            </div>
            <div class="flex gap-4 p-5 bg-card border border-border-main rounded-2xl hover:border-primary transition-colors">
              <span class="text-2xl flex-shrink-0 mt-0.5">🔞</span>
              <div>
                <div class="text-[14px] font-bold text-main mb-1.5">Độ tuổi</div>
                <p class="text-[13px] text-muted leading-relaxed">
                  Sự kiện dành cho khán giả từ 16 tuổi trở lên. Trẻ em dưới 16 tuổi cần có người lớn đi kèm.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Right: Sticky Ticket Sidebar -->
      <aside class="flex flex-col">
        <div class="sticky top-24 bg-card/90 backdrop-blur-2xl border border-border-main rounded-3xl p-6 shadow-2xl overflow-hidden">
          <!-- Backdrop Accent -->
          <div class="absolute -top-12 -right-12 w-32 h-32 bg-primary/10 blur-3xl pointer-events-none"></div>

          <h3 class="font-heading text-lg font-bold text-main mb-6 flex items-center gap-2">
            <span>🎫</span> Chọn vé
          </h3>

          <!-- Tiers List -->
          <div class="flex flex-col gap-3 mb-6">
            <template v-if="tiers.length > 0">
              <button
                v-for="(tier, i) in tiers"
                :key="i"
                @click="selectedTier = i"
                class="flex flex-col gap-1 p-4 text-left rounded-xl border-2 transition-all"
                :class="[
                  selectedTier === i 
                    ? 'bg-primary/10 border-primary shadow-[0_0_20px_rgba(0,200,83,0.1)]' 
                    : 'bg-surface/50 border-border-main hover:border-primary/50'
                ]"
              >
                <div class="flex justify-between items-center w-full">
                  <span class="font-bold text-[15px]" :class="selectedTier === i ? 'text-primary' : 'text-main'">
                    {{ tier.name }}
                  </span>
                  <span class="font-heading font-bold text-lg" :class="selectedTier === i ? 'text-primary' : 'text-primary/70'">
                    {{ formatCurrency(tier.price) }}
                  </span>
                </div>
                <div v-if="tier.price === 0" class="text-[11px] font-bold text-primary uppercase">Miễn phí</div>
              </button>
            </template>
            <template v-else>
              <div class="flex flex-col gap-1 p-4 rounded-xl border-2 border-primary bg-primary/10">
                <div class="flex justify-between items-center w-full">
                  <span class="font-bold text-[15px] text-primary">Vé Phổ Thông</span>
                  <span class="font-heading font-bold text-lg text-primary">
                    {{ formatCurrency(event.priceRange?.min || 0) }}
                  </span>
                </div>
              </div>
            </template>
          </div>

          <!-- Quantity Section -->
          <div class="flex items-center justify-between py-4 border-t border-border-main">
            <span class="text-[14px] font-bold text-muted">Số lượng</span>
            <div class="flex items-center gap-4">
              <button 
                class="w-9 h-9 rounded-lg bg-surface border border-border-main text-main text-xl flex items-center justify-center hover:border-primary hover:text-primary transition-all disabled:opacity-30"
                @click="qty = Math.max(1, qty - 1)"
                :disabled="qty <= 1"
              >
                −
              </button>
              <span class="text-xl font-bold text-main min-w-[32px] text-center">{{ qty }}</span>
              <button 
                class="w-9 h-9 rounded-lg bg-surface border border-border-main text-main text-xl flex items-center justify-center hover:border-primary hover:text-primary transition-all disabled:opacity-30"
                @click="qty = Math.min(10, qty + 1)"
                :disabled="qty >= 10"
              >
                +
              </button>
            </div>
          </div>

          <!-- Total Amount -->
          <div class="flex flex-col gap-1 pt-6 mb-6 border-t border-border-main">
            <span class="text-[14px] text-muted">Tổng cộng</span>
            <div class="font-heading text-3xl font-bold text-primary">{{ formatCurrency(totalPrice) }}</div>
          </div>

          <!-- Buy Button -->
          <BaseButton 
            variant="primary" 
            size="lg" 
            class="w-full !rounded-2xl !py-4 shadow-xl shadow-primary/20"
            :disabled="event.status !== 'upcoming'"
            @click="handleBuyTicket"
          >
            {{ event.status === 'upcoming' ? '🎟️ Mua vé ngay' : '⛔ Đã kết thúc' }}
          </BaseButton>

          <!-- Trust Info -->
          <div class="mt-6 flex flex-col gap-2.5">
            <div class="flex items-center gap-2 text-[12px] text-muted">
              <span class="text-primary">✅</span> Thanh toán an toàn & bảo mật
            </div>
            <div class="flex items-center gap-2 text-[12px] text-muted">
              <span class="text-primary">📱</span> Nhận vé điện tử qua email
            </div>
            <div class="flex items-center gap-2 text-[12px] text-muted">
              <span class="text-primary">💬</span> Hỗ trợ khách hàng 24/7
            </div>
          </div>
        </div>
      </aside>
    </div>
  </div>

  <!-- Not Found State -->
  <div v-else class="flex flex-col items-center justify-center py-32 px-6 text-center animate-in fade-in zoom-in duration-500">
    <div class="text-[80px] mb-6 grayscale opacity-50">🔍</div>
    <h2 class="font-heading text-3xl font-bold text-white mb-3">Không tìm thấy sự kiện</h2>
    <p class="text-muted max-w-md mx-auto mb-10 leading-relaxed">
      Sự kiện này có thể đã bị xóa hoặc không tồn tại trong hệ thống của chúng tôi.
    </p>
    <BaseButton variant="primary" size="lg" @click="router.push('/')">
      ← Quay về trang chủ
    </BaseButton>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getEventById, openBooking } from '../stores/eventStore'
import BaseButton from '../components/ui/BaseButton.vue'

const route = useRoute()
const router = useRouter()
const event = computed(() => getEventById(route.params.id))

const selectedTier = ref(0)
const qty = ref(1)

const CATEGORY_LABELS = {
  concerts: 'Nhạc & Concert',
  arts: 'Sân khấu & Nghệ thuật',
  sports: 'Thể thao',
  experiences: 'Trải nghiệm',
  workshops: 'Workshop',
}

const categoryLabel = computed(() => CATEGORY_LABELS[event.value?.category] || event.value?.category || '')

const tiers = computed(() => event.value?.tiers || [])

const currentTierPrice = computed(() => {
  if (tiers.value.length > 0 && tiers.value[selectedTier.value]) {
    return tiers.value[selectedTier.value].price
  }
  return event.value?.priceRange?.min || 0
})

const totalPrice = computed(() => currentTierPrice.value * qty.value)

const highlights = computed(() => {
  const cat = event.value?.category
  if (cat === 'concerts') return [
    { icon: '🎶', text: 'Âm nhạc sống chất lượng cao' },
    { icon: '📸', text: 'Check-in zone & photo booth' },
    { icon: '🍻', text: 'Khu ẩm thực & đồ uống' },
    { icon: '🎁', text: 'Quà tặng cho Early Bird' },
  ]
  if (cat === 'sports') return [
    { icon: '🏆', text: 'Giải đấu chuyên nghiệp' },
    { icon: '📺', text: 'Màn hình LED khổng lồ' },
    { icon: '🍔', text: 'Food court đa dạng' },
    { icon: '👕', text: 'Quà lưu niệm chính hãng' },
  ]
  if (cat === 'arts') return [
    { icon: '🎭', text: 'Dàn diễn viên chuyên nghiệp' },
    { icon: '🎼', text: 'Dàn nhạc sống' },
    { icon: '📖', text: 'Chương trình tay đầy đủ' },
    { icon: '☕', text: 'Khu vực giải lao sang trọng' },
  ]
  if (cat === 'workshops') return [
    { icon: '📚', text: 'Tài liệu học tập đầy đủ' },
    { icon: '🏅', text: 'Chứng chỉ hoàn thành' },
    { icon: '🤝', text: 'Networking với chuyên gia' },
    { icon: '☕', text: 'Tea break & refreshments' },
  ]
  return [
    { icon: '🌟', text: 'Trải nghiệm độc đáo' },
    { icon: '📸', text: 'Khoảnh khắc đáng nhớ' },
    { icon: '🗺️', text: 'Hướng dẫn chuyên nghiệp' },
    { icon: '🎒', text: 'Trang thiết bị đầy đủ' },
  ]
})

const defaultDescription = computed(() =>
  `Chào mừng bạn đến với sự kiện ${event.value?.title}. Đây là một trong những sự kiện được mong chờ nhất, hứa hẹn mang lại những trải nghiệm tuyệt vời và đáng nhớ cho khán giả.\n\nHãy chuẩn bị tinh thần và tham gia cùng hàng ngàn người hâm mộ trong không gian sôi động. Chương trình được tổ chức chuyên nghiệp với hệ thống âm thanh, ánh sáng hiện đại bậc nhất.`
)

const formatDate = (dateStr) => {
  if (!dateStr) return 'TBA'
  try {
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return dateStr
    return d.toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })
  } catch(e) {
    return dateStr
  }
}

const formatCurrency = (amount) => {
  if (amount === 0) return 'Miễn phí'
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)
}

const handleBuyTicket = () => {
  if (event.value) openBooking(event.value)
}
</script>

