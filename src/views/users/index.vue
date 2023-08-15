<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router/auto';
import { useI18n } from 'vue-i18n';
import type { User } from '@/types/api';
import { useUsersStore } from '@/store/users';
import defaultAvatar from '@/assets/avatar-placeholder.png';

const usersStore = useUsersStore();
const { t } = useI18n();
const router = useRouter();
const showConfirmationDialog = ref(false);

function handleEditClick(user: User) {
  usersStore.modifiedUser = user;
  router.push('/users/edit');
}

function handleRemoveClick(user: User) {
  usersStore.modifiedUser = user;
  showConfirmationDialog.value = true;
}

async function handleConfirmRemoveClick() {
  await usersStore.deleteUser();
  showConfirmationDialog.value = false;

  if (usersStore.response?.data?.length === 1) {
    usersStore.page = 1;
  } else {
    await usersStore.fetchUsers();
  }
}

watch(() => usersStore.query, () => {
  usersStore.page = 1;
}, { flush: 'sync' });
</script>

<template>
  <app-card>
    <header class="flex justify-between items-center">
      <app-input
        v-model="usersStore.query"
        :placeholder="t('search-for-users')"
        variant="filled"
        append-icon="i-material-symbols-search-rounded"
        class="px-3 w-full sm:(px-0 w-auto)"
      />
      <app-button
        variant="filled"
        color="primary"
        size="big"
        rounded="full"
        class="fixed bottom-3 right-3 sm:static z-1"
        @click="router.push('/users/add')"
      >
        <app-icon icon="i-material-symbols-add" size="big" />
        <p class="ml-2 font-medium">
          {{ t('add-user') }}
        </p>
      </app-button>
    </header>
    <hr class="my-6 border-gray-200">
    <app-loader
      v-if="usersStore.loadingUsers"
      :label="t('loading-users')"
      color="primary"
      size="big"
    />
    <table v-else>
      <thead class="h-14">
        <th class="px-3" />
        <th class="px-3">
          {{ t('full-name') }}
        </th>
        <th class="px-3">
          {{ t('action') }}
        </th>
      </thead>
      <tbody>
        <tr
          v-for="user in usersStore.response?.data"
          :key="user.id"
          class="odd:bg-gray-200 even:bg-white"
        >
          <td class="py-3 px-3">
            <img
              :src="user.avatar || defaultAvatar"
              alt="avatar"
              class="min-w-12 min-h-12 rounded-full object-cover"
            >
          </td>
          <td class="w-full text-gray-900 px-3">
            {{ user.first_name }} {{ user.last_name }}
          </td>
          <td class="whitespace-nowrap pr-3">
            <app-button
              variant="icon"
              color="gray-500"
              size="small"
              @click="handleEditClick(user)"
            >
              <app-icon
                icon="i-material-symbols-edit-rounded"
                size="big"
              />
            </app-button>
            <app-button
              variant="icon"
              color="gray-500"
              size="small"
              @click="handleRemoveClick(user)"
            >
              <app-icon
                icon="i-material-symbols-delete-rounded"
                size="big"
              />
            </app-button>
          </td>
        </tr>
      </tbody>
    </table>
  </app-card>
  <app-pagination
    v-model:current-page="usersStore.page"
    :total-pages="usersStore.response?.total_pages || 0"
    class="pt-5"
  />
  <app-dialog v-model="showConfirmationDialog" :title="t('delete-user')" class="w-4/5 sm:w-1/2">
    <div class="text-center">
      <p class="pb-4">
        {{ t('confirm-delete-message') }}
      </p>
      <div class="inline-flex gap-4">
        <app-button
          :loading="usersStore.deletingUser"
          variant="filled"
          color="primary"
          size="medium"
          rounded="small"
          class="min-w-18"
          @click="handleConfirmRemoveClick"
        >
          {{ t('yes') }}
        </app-button>
        <app-button
          variant="outlined"
          color="gray-700"
          size="medium"
          rounded="small"
          @click="showConfirmationDialog = false"
        >
          {{ t('no') }}
        </app-button>
      </div>
    </div>
  </app-dialog>
</template>
