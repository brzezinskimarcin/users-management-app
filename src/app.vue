<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

const route = useRoute();
const { t } = useI18n();
</script>

<template>
  <main class="pt-10 px-20">
    <h1 class="text-4xl pb-8">
      {{ t(route.path) }}
    </h1>
    <router-view />
  </main>
</template>
