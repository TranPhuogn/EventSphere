<template>
  <div class="toast">
    <span class="toast-icon">{{ icon }}</span>
    <span>{{ message }}</span>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
const props = defineProps({ message: String, icon: { type: String, default: '✅' } })
const emit = defineEmits(['close'])
onMounted(() => { setTimeout(() => emit('close'), 3500) })
</script>
