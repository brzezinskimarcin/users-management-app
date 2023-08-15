<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  modelValue: string;
  variant: 'filled';
  placeholder?: string;
  appendIcon?: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const inputModel = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

const variantClassMapping = {
  filled: 'bg-gray-100',
};
</script>

<template>
  <div :class="['h-10 flex items-center rounded-md overflow-hidden px-3', variantClassMapping[variant]]">
    <input
      v-model="inputModel"
      :placeholder="placeholder"
      class="bg-transparent focus:outline-none"
    >
    <app-icon
      v-if="appendIcon"
      :icon="appendIcon"
      size="medium"
    />
  </div>
</template>
