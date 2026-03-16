<template>
  <div :class="['slots-indicator', isLow ? 'slots-low' : '']">
    <div class="slots-bar">
      <div class="slots-fill" :style="{ width: pct + '%' }" />
    </div>
    <span class="slots-text">{{ isLow ? `⚠ ${remaining} slots left` : `${remaining} available` }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({ total: { type: Number, default: 20 }, filled: { type: Number, default: 5 } })
const remaining = computed(() => props.total - props.filled)
const pct = computed(() => (props.filled / props.total) * 100)
const isLow = computed(() => remaining.value <= 5)
</script>
