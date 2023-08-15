<script setup lang="ts">
import { useUsersStore } from '@/store/users';

const usersStore = useUsersStore();
</script>

<template>
  <pre>
    {{ usersStore.data }}
  </pre>
</template>
