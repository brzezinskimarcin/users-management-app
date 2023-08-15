<script setup lang="ts">
defineProps<{
  icon?: string;
  size: 'big' | 'medium' | 'small';
}>();

const sizeClassMapping = {
  big: 'w-6 h-6',
  medium: 'w-5 h-5',
  small: 'w-4 h-4',
};
</script>

<template>
  <i :class="['block', sizeClassMapping[size], icon]" />
</template>
