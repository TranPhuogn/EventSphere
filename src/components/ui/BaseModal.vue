<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <!-- Overlay -->
    <div 
      class="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
      @click="closeOnOutsideClick && $emit('close')"
    ></div>

    <!-- Modal Panel -->
    <div 
      class="relative bg-surface border border-border-main rounded-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-8 transform transition-all duration-300"
      :class="maxWidthClass"
    >
      <!-- Header -->
      <div class="flex items-start justify-between mb-6">
        <div>
          <h2 v-if="title" class="font-heading text-2xl font-bold text-white mb-1">{{ title }}</h2>
          <p v-if="subtitle" class="text-sm text-muted">{{ subtitle }}</p>
        </div>
        
        <button 
          @click="$emit('close')"
          class="text-muted hover:text-white transition-colors rounded-full p-1 hover:bg-card"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <!-- Content slot -->
      <div class="mt-2">
        <slot></slot>
      </div>

      <!-- Footer slot (optional) -->
      <div v-if="$slots.footer" class="mt-8 pt-6 border-t border-border-main flex justify-end gap-3">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  maxWidth: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg', 'xl'].includes(v)
  },
  closeOnOutsideClick: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['close'])

const maxWidthClass = computed(() => {
  switch (props.maxWidth) {
    case 'sm': return 'max-w-md'
    case 'md': return 'max-w-lg'
    case 'lg': return 'max-w-2xl'
    case 'xl': return 'max-w-4xl'
    default: return 'max-w-lg'
  }
})

// Prevent body scroll when modal is open
watch(() => props.show, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

// Cleanup on unmount
onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>
