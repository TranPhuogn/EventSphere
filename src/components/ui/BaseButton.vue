<template>
  <button
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
    <slot v-else name="icon-left"></slot>
    <slot></slot>
    <slot name="icon-right"></slot>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'ghost', 'outline', 'danger'].includes(v)
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v)
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click'])

const buttonClasses = computed(() => {
  return [
    // Base styles
    'inline-flex items-center justify-center rounded-xl font-sans font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap',
    
    // Sizes
    props.size === 'sm' ? 'px-3 py-1.5 text-xs gap-1.5' : '',
    props.size === 'md' ? 'px-4 py-2.5 text-sm gap-2' : '',
    props.size === 'lg' ? 'px-6 py-3.5 text-base gap-2.5' : '',
    
    // Variants
    props.variant === 'primary' ? 'bg-primary text-black font-semibold hover:bg-primary/90 shadow-lg shadow-primary/10' : '',
    props.variant === 'ghost' ? 'bg-transparent text-main hover:bg-card hover:text-primary' : '',
    props.variant === 'outline' ? 'bg-transparent border border-border-main text-main hover:border-primary hover:text-primary' : '',
    props.variant === 'danger' ? 'bg-danger text-white hover:bg-danger/90' : ''
  ]
})
</script>
