<script setup lang="ts">
defineProps<{
  currentPage: number;
  totalPages: number;
}>();

const emit = defineEmits<{
  'update:currentPage': [value: number];
}>();

function handleButtonClick(page: number) {
  emit('update:currentPage', page);
}
</script>

<template>
  <div class="flex items-stretch justify-center pb-18 sm:(justify-start pb-6)">
    <app-button
      :disabled="currentPage === 1"
      aria-label="previous"
      variant="outlined"
      color="gray-300"
      size="small"
      class="rounded-l-md enabled:text-primary"
      @click="handleButtonClick(currentPage - 1)"
    >
      <app-icon
        icon="i-material-symbols-keyboard-double-arrow-left"
        size="small"
      />
    </app-button>

    <app-button
      v-for="page in totalPages"
      :key="page"
      :variant="page === currentPage ? 'filled' : 'outlined'"
      :color="page === currentPage ? 'primary' : 'gray-300'"
      :disabled="page === currentPage"
      size="small"
      class="-ml-px enabled:text-primary"
      @click="handleButtonClick(page)"
    >
      {{ page }}
    </app-button>

    <app-button
      :disabled="currentPage === totalPages"
      aria-label="next"
      variant="outlined"
      color="gray-300"
      size="small"
      class="rounded-r-md -ml-px enabled:text-primary"
      @click="handleButtonClick(currentPage + 1)"
    >
      <app-icon
        icon="i-material-symbols-keyboard-double-arrow-right"
        size="small"
      />
    </app-button>
  </div>
</template>
