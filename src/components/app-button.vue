<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  variant: 'filled' | 'icon' | 'outlined';
  color: 'gray-300' | 'gray-500' | 'primary';
  size: 'small';
}>();

const variantClassMapping = {
  filled: '',
  icon: '',
  outlined: 'bg-white border',
};

const colorClassMapping = computed(() => ({
  filled: {
    'gray-300': 'bg-gray-300 text-white',
    'gray-500': 'bg-gray-500 text-white',
    'primary': 'bg-primary text-white',
  },
  icon: {
    'gray-300': 'text-gray-300',
    'gray-500': 'text-gray-500',
    'primary': 'text-primary',
  },
  outlined: {
    'gray-300': 'border-gray-300',
    'gray-500': 'border-gray-500',
    'primary': 'border-primary',
  },
})[props.variant]);

const sizeClassMapping = {
  small: 'px-3 py-1.5',
};
</script>

<template>
  <button
    :class="[
      variantClassMapping[variant],
      colorClassMapping[color],
      sizeClassMapping[size],
    ]"
    type="button"
  >
    <slot />
  </button>
</template>
