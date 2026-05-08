<template>
  <header class="sticky top-0 z-[100] bg-surface/90 backdrop-blur-xl border-b border-border-main transition-all duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between py-3 gap-6">
        <!-- Logo -->
        <router-link to="/" class="flex items-center gap-2 group flex-shrink-0">
          <div class="w-9 h-9 bg-primary text-black rounded-xl flex items-center justify-center font-bold text-lg shadow-lg group-hover:scale-105 transition-transform duration-200">
            ◉
          </div>
          <span class="font-heading font-bold text-2xl tracking-tight text-white hidden sm:block">EventSphere</span>
        </router-link>

        <!-- Search Bar -->
        <div class="flex-1 max-w-2xl relative" ref="searchRef">
          <div class="relative flex items-center">
            <span class="absolute left-3.5 text-muted text-lg pointer-events-none">🔍</span>
            <input
              type="text"
              placeholder="Tìm kiếm sự kiện, nghệ sĩ, địa điểm..."
              v-model="searchQuery"
              @input="handleSearch"
              @focus="handleSearch(); showSearch = true"
              class="w-full bg-card border border-border-main rounded-2xl py-2.5 pl-11 pr-4 text-[14px] text-main font-sans outline-none focus:border-primary focus:bg-card-2 transition-colors duration-200 placeholder:text-muted"
            />
          </div>
          
          <!-- Search Dropdown -->
          <div 
            v-if="showSearch && searchResults.length > 0" 
            class="absolute top-[calc(100%+8px)] left-0 right-0 bg-surface border border-border-main rounded-2xl shadow-2xl overflow-hidden z-[200]"
          >
            <div 
              v-for="e in searchResults" 
              :key="e.id" 
              class="flex items-center gap-3 p-3 cursor-pointer hover:bg-card transition-colors border-b border-border-main last:border-0"
              @click="goToEvent(e)"
            >
              <img :src="e.image" :alt="e.title" class="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
              <div class="flex-1 min-w-0">
                <div class="text-[14px] font-semibold text-main truncate">{{ e.title }}</div>
                <div class="text-[12px] text-muted truncate">{{ e.dateStart }} · {{ e.location?.name || '' }}</div>
              </div>
            </div>
          </div>
          
          <div 
            v-if="showSearch && searchResults.length === 0 && searchQuery" 
            class="absolute top-[calc(100%+8px)] left-0 right-0 bg-surface border border-border-main rounded-2xl shadow-2xl p-4 text-center text-[14px] text-muted z-[200]"
          >
            Không tìm thấy kết quả nào
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-2 flex-shrink-0">
          <BaseButton variant="ghost" size="sm" class="hidden md:flex" @click="router.push('/wishlist')">
            ❤️
            <BaseBadge v-if="store.wishlist.length > 0" variant="danger" size="sm" class="ml-1">{{ store.wishlist.length }}</BaseBadge>
          </BaseButton>
          
          <BaseButton variant="primary" size="sm" class="hidden lg:flex" @click="router.push('/create-event')">
            + Tạo sự kiện
          </BaseButton>
          
          <BaseButton variant="ghost" size="sm" class="hidden sm:flex" @click="router.push('/my-tickets')">
            🎟 Vé của tôi
            <BaseBadge v-if="store.tickets.length > 0" variant="primary" size="sm" class="ml-1 text-black bg-primary border-none">{{ store.tickets.length }}</BaseBadge>
          </BaseButton>
          
          <!-- User Dropdown / Auth -->
          <div v-if="store.user" class="relative ml-2">
            <button 
              @click.stop="showDropdown = !showDropdown"
              class="w-9 h-9 rounded-full bg-primary-dim border-2 border-primary text-primary font-bold text-[14px] flex items-center justify-center cursor-pointer hover:bg-primary/20 transition-colors"
            >
              {{ store.user.initial }}
            </button>
            
            <div 
              v-if="showDropdown" 
              class="absolute top-[calc(100%+8px)] right-0 bg-surface border border-border-main rounded-2xl min-w-[200px] p-2 shadow-2xl z-[200]"
            >
              <div class="px-3 py-2 border-b border-border-main mb-1">
                <div class="font-semibold text-[14px] text-main">{{ store.user.name }}</div>
                <div class="text-[12px] text-muted truncate">{{ store.user.email }}</div>
              </div>
              
              <button 
                v-for="[icon, label, path] in dropdownItems" 
                :key="label" 
                @click="router.push(path); showDropdown = false"
                class="w-full text-left flex items-center gap-2 px-3 py-2 rounded-xl text-[14px] text-main hover:bg-card hover:text-primary transition-colors"
              >
                <span>{{ icon }}</span>{{ label }}
              </button>
              
              <div class="h-px bg-border-main my-1"></div>
              
              <button 
                @click="handleLogout"
                class="w-full text-left flex items-center gap-2 px-3 py-2 rounded-xl text-[14px] text-main hover:bg-danger/10 hover:text-danger transition-colors"
              >
                <span>🚪</span> Đăng xuất
              </button>
            </div>
          </div>
          <div v-else class="flex gap-2 ml-2">
            <BaseButton variant="ghost" size="sm" @click="openAuth('login')">Đăng nhập</BaseButton>
            <BaseButton variant="primary" size="sm" @click="openAuth('register')">Đăng ký</BaseButton>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Category Nav -->
    <nav class="border-t border-border-main bg-card">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center gap-8 overflow-x-auto hide-scroll">
          <router-link 
            v-for="c in CATS" 
            :key="c.id" 
            :to="c.path"
            class="flex items-center gap-2 py-3 text-[14px] font-medium text-muted hover:text-main whitespace-nowrap border-b-2 border-transparent transition-all"
            active-class="!text-primary !border-primary"
          >
            <span>{{ c.icon }}</span> {{ c.label }}
          </router-link>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { store, selectEvent, openAuth, logout } from '../../stores/eventStore'
import { getEvents } from '../../stores/eventStore'
import BaseButton from '../ui/BaseButton.vue'
import BaseBadge from '../ui/BaseBadge.vue'

const router = useRouter()
const route = useRoute()

const showDropdown = ref(false)
const searchQuery = ref('')
const searchResults = ref([])
const showSearch = ref(false)
const searchRef = ref(null)

const CATS = [
  { id: 'concerts', icon: '🎵', label: 'Concerts', path: '/concerts' },
  { id: 'arts', icon: '🎭', label: 'Arts & Theatre', path: '/arts' },
  { id: 'sports', icon: '⚽', label: 'Sports', path: '/sports' },
  { id: 'experiences', icon: '🧭', label: 'Experiences', path: '/experiences' },
  { id: 'workshops', icon: '📚', label: 'Workshops', path: '/workshops' },
]

const dropdownItems = [
  ['🎟️', 'Vé của tôi', '/my-tickets'],
  ['📅', 'Sự kiện của tôi', '/organizer'],
  ['👤', 'Hồ sơ cá nhân', '/profile'],
  ['🏢', 'Trung tâm tổ chức', '/organizer'],
]

const goToEvent = (event) => {
  selectEvent(event)
  showSearch.value = false
  searchQuery.value = ''
  router.push('/event/' + event.id)
}

const handleLogout = () => {
  logout()
  showDropdown.value = false
}

const handleSearch = () => {
  const q = searchQuery.value.toLowerCase()
  
  if (!q) { 
    searchResults.value = []; 
    showSearch.value = false; 
    return 
  }
  
  const allEvents = getEvents()
  let filtered = allEvents.filter(e =>
    e.title.toLowerCase().includes(q) ||
    (e.performers?.map(p => p.name).join(' ') || '').toLowerCase().includes(q)
  )
  
  searchResults.value = filtered.slice(0, 6)
  showSearch.value = true
}

const handleClickOutside = (e) => {
  if (!searchRef.value?.contains(e.target)) showSearch.value = false
  if (!e.target.closest('button')) showDropdown.value = false // Simple dropdown outside click
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>

<style scoped>
.hide-scroll::-webkit-scrollbar {
  display: none;
}
.hide-scroll {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
