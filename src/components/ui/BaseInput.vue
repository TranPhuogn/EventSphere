<template>
  <div class="flex flex-col gap-1.5 w-full">
    <label v-if="label" :for="id" class="text-[13px] font-medium text-muted tracking-wide">
      {{ label }}
    </label>
    
    <div class="relative flex items-center">
      <div v-if="$slots['icon-left']" class="absolute left-3.5 text-muted pointer-events-none">
        <slot name="icon-left"></slot>
      </div>
      
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="inputClasses"
        @input="$emit('update:modelValue', $event.target.value)"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
      />
      
      <div v-if="$slots['icon-right']" class="absolute right-3.5 text-muted">
        <slot name="icon-right"></slot>
      </div>
    </div>
    
    <span v-if="error" class="text-xs text-danger mt-1">
      {{ error }}
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  id: {
    type: String,
    default: () => `input-${Math.random().toString(36).substring(2, 9)}`
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  },
  hasLeftIcon: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:modelValue', 'blur', 'focus'])

const inputClasses = computed(() => {
  return [
    // Base styles
    'w-full bg-card border rounded-xl px-4 py-2.5 text-main font-sans text-[15px] outline-none transition-colors duration-200',
    'placeholder:text-muted',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    
    // Icon padding
    props.hasLeftIcon ? 'pl-11' : '',
    
    // State styles
    props.error 
      ? 'border-danger focus:border-danger focus:ring-1 focus:ring-danger' 
      : 'border-border-main focus:border-primary focus:bg-card-2'
  ]
})
</script>
