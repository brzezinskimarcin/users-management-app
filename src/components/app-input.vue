<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  modelValue: string;
  variant: 'filled' | 'outlined';
  placeholder?: string;
  appendIcon?: string;
  label?: string;
  error?: string;
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
  outlined: 'border border-gray-400',
};
</script>

<template>
  <div>
    <label v-if="label" class="block font-medium text-sm pb-2">{{ label }}</label>
    <div :class="['h-10 flex items-center rounded-md overflow-hidden px-3', variantClassMapping[variant]]">
      <input
        v-model="inputModel"
        :placeholder="placeholder"
        class="bg-transparent focus:outline-none w-full"
      >
      <app-icon
        v-if="appendIcon"
        :icon="appendIcon"
        size="medium"
      />
    </div>
    <p v-if="error" class="text-sm text-red font-medium pt-1.5">
      {{ error }}
    </p>
  </div>
</template>
