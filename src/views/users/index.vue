<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useUsersStore } from '@/store/users';

const usersStore = useUsersStore();
const { t } = useI18n();
</script>

<template>
  <app-card>
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
          <td class="whitespace-nowrap px-3">
            <app-button>
              <app-icon
                icon="i-material-symbols-edit-rounded"
                size="big"
              />
            </app-button>
            <app-button class="ml-3">
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
</template>
