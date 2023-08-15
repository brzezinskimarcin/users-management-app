<script setup lang="ts">
import { useRouter } from 'vue-router/auto';
import { useI18n } from 'vue-i18n';
import { useUsersStore } from '@/store/users';

const usersStore = useUsersStore();
const { t } = useI18n();
const router = useRouter();
</script>

<template>
  <app-card>
    <header class="flex justify-between items-center">
      <app-input
        v-model="usersStore.query"
        :placeholder="t('search-for-users')"
        variant="filled"
        append-icon="i-material-symbols-search-rounded"
      />
      <app-button
        variant="filled"
        color="primary"
        size="big"
        rounded="full"
        @click="router.push('/users/add')"
      >
        <app-icon icon="i-material-symbols-add" size="big" />
        <p class="ml-2 font-medium">
          Add User
        </p>
      </app-button>
    </header>
    <hr class="my-6 border-gray-200">
    <table>
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
              :src="user.avatar"
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
</template>
