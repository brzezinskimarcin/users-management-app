<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

const route = useRoute();
const { t } = useI18n();
</script>

<template>
  <main class="pt-6 sm:(pt-10 px-20)">
    <h1 class="text-2xl pb-8 text-center sm:(text-left text-4xl)">
      {{ t(route.path) }}
    </h1>
    <router-view />
  </main>
</template>
