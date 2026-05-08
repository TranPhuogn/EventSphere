<template>
  <div class="max-w-[1000px] mx-auto py-10 px-4 min-h-[70vh]">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
      <div>
        <h1 class="font-heading text-4xl font-bold text-main mb-2">Vé của tôi</h1>
        <p class="text-muted font-medium">Quản lý và xem lại tất cả các vé bạn đã đặt</p>
      </div>
      <div class="flex gap-2">
        <div class="bg-card border border-border-main rounded-full px-4 py-1.5 text-[13px] font-bold text-muted">
          Tổng cộng: <span class="text-primary">{{ store.tickets.length }}</span>
        </div>
      </div>
    </div>

    <!-- Tickets List -->
    <div v-if="store.tickets.length > 0" class="flex flex-col gap-6">
      <div 
        v-for="ticket in store.tickets" 
        :key="ticket.id" 
        class="group relative flex flex-col md:flex-row bg-card border border-border-main rounded-[32px] overflow-hidden hover:border-primary/50 transition-all duration-300 shadow-xl hover:shadow-primary/5"
      >
        <!-- Left: Image -->
        <div class="md:w-64 h-48 md:h-auto overflow-hidden relative">
          <img :src="ticket.event?.image" :alt="ticket.event?.title" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div class="absolute bottom-4 left-4">
            <BaseBadge variant="primary" size="sm" class="!bg-primary !text-black shadow-lg">
              {{ ticket.tier }}
            </BaseBadge>
          </div>
        </div>

        <!-- Middle: Info -->
        <div class="flex-1 p-6 md:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-dashed border-border-main relative">
          <!-- Ticket Notches -->
          <div class="hidden md:block absolute -right-[12px] -top-[12px] w-6 h-6 rounded-full bg-surface border border-border-main"></div>
          <div class="hidden md:block absolute -right-[12px] -bottom-[12px] w-6 h-6 rounded-full bg-surface border border-border-main"></div>

          <div>
            <div class="flex items-center gap-3 mb-2">
              <span class="text-[12px] font-bold uppercase tracking-widest text-primary">Sự kiện đã xác nhận</span>
              <div class="w-1 h-1 rounded-full bg-muted"></div>
              <span class="text-[12px] font-bold text-muted uppercase tracking-widest">{{ formatDate(ticket.date) }}</span>
            </div>
            <h2 class="font-heading text-2xl font-bold text-main mb-4 leading-tight group-hover:text-primary transition-colors">
              {{ ticket.event?.title }}
            </h2>
            
            <div class="grid grid-cols-2 gap-6">
              <div class="flex flex-col gap-1">
                <span class="text-[11px] font-bold uppercase tracking-wider text-muted">Mã vé</span>
                <span class="font-mono text-[15px] font-bold text-main tracking-widest">{{ ticket.code }}</span>
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-[11px] font-bold uppercase tracking-wider text-muted">Số lượng</span>
                <span class="text-[15px] font-bold text-main">x{{ ticket.qty }}</span>
              </div>
            </div>
          </div>

          <div class="mt-6 flex items-center gap-2 text-[14px] text-muted">
            <span class="p-1.5 rounded-lg bg-surface border border-border-main">📍</span>
            <span class="font-medium">{{ ticket.event?.location?.name || ticket.event?.location || 'Hồ Chí Minh' }}</span>
          </div>
        </div>

        <!-- Right: Actions -->
        <div class="w-full md:w-56 p-6 md:p-8 flex flex-col items-center justify-center gap-4 bg-card/30">
          <div class="w-24 h-24 bg-white/10 rounded-xl flex items-center justify-center text-4xl bg-[repeating-linear-gradient(45deg,rgba(0,200,83,0.1)_0,rgba(0,200,83,0.1)_10px,transparent_10px,transparent_20px)] shadow-inner">
            QR
          </div>
          <BaseButton variant="outline" size="sm" class="w-full !rounded-xl !border-border-main hover:!border-primary">
            Chi tiết vé
          </BaseButton>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="flex flex-col items-center justify-center py-24 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div class="w-32 h-32 bg-card border border-border-main rounded-full flex items-center justify-center text-6xl mb-8 shadow-2xl relative">
        🎟️
        <div class="absolute -right-2 -bottom-2 w-12 h-12 bg-surface border border-border-main rounded-full flex items-center justify-center text-2xl shadow-lg">❓</div>
      </div>
      <h3 class="font-heading text-2xl font-bold text-main mb-3">Bạn chưa có vé nào</h3>
      <p class="text-muted max-w-sm mb-10 font-medium">Khám phá các sự kiện hấp dẫn và đặt vé ngay hôm nay để trải nghiệm những khoảnh khắc tuyệt vời!</p>
      <router-link to="/">
        <BaseButton variant="primary" size="lg" class="!px-10 !rounded-2xl shadow-xl shadow-primary/20">
          Khám phá sự kiện
        </BaseButton>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { store } from '../stores/eventStore'
import BaseBadge from '../components/ui/BaseBadge.vue'
import BaseButton from '../components/ui/BaseButton.vue'

const formatDate = (dateStr) => {
  if (!dateStr) return 'Gần đây'
  const d = new Date(dateStr)
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
}
</script>

