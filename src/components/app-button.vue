<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  variant: 'filled' | 'icon' | 'outlined';
  color: 'gray-300' | 'gray-500' | 'primary';
  size: 'big' | 'small';
  rounded?: 'full' | 'small';
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
  big: 'px-5 py-3',
  small: 'px-3 py-1.5',
};

const roundedClassMapping = {
  full: 'rounded-full',
  small: 'rounded-md',
};
</script>

<template>
  <button
    :class="[
      'inline-flex items-center',
      variantClassMapping[variant],
      colorClassMapping[color],
      sizeClassMapping[size],
      rounded ? roundedClassMapping[rounded] : '',
    ]"
    type="button"
  >
    <slot />
  </button>
</template>
