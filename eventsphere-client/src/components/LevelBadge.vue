<template>
  <span :class="['level-badge', cls]">{{ level }}</span>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({ level: String })
const cls = computed(() => props.level === 'Beginner' ? 'level-beginner' : props.level === 'Intermediate' ? 'level-intermediate' : 'level-advanced')
</script>
