<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import type { UserFormData } from '@/types/api';
import { useUsersStore } from '@/store/users';
import UserForm from './__components/user-form.vue';

const { t } = useI18n();
const router = useRouter();
const usersStore = useUsersStore();
const initialData = ref<UserFormData>({
  first_name: '',
  last_name: '',
  avatar: '',
});

async function handleSubmitClick(formData: UserFormData) {
  await usersStore.createUser(formData);
  router.back();
  await usersStore.fetchUsers();
}
</script>

<template>
  <user-form
    :initial-data="initialData"
    :submit-button-label="t('add-user')"
    :loading="usersStore.creatingUser"
    @submit="handleSubmitClick"
  />
</template>
