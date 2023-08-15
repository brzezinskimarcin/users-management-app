<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  modelValue: boolean;
  title: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

const dialog = ref<HTMLDialogElement>();

watch(() => props.modelValue, (newModelValue) => {
  if (newModelValue) {
    dialog.value?.showModal();
  } else {
    dialog.value?.close();
  }
});
</script>

<template>
  <dialog ref="dialog">
    <header class="flex justify-between pb-8">
      <h1 class="text-2xl">
        {{ title }}
      </h1>
      <app-button
        variant="icon"
        color="gray-500"
        size="small"
        @click="emit('update:modelValue', false)"
      >
        <app-icon
          icon="i-material-symbols-close-rounded"
          size="big"
        />
      </app-button>
    </header>
    <slot />
  </dialog>
</template>
