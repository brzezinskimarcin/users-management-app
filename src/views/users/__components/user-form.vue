<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import type { UserForm } from '@/types/api';

const router = useRouter();
const { t } = useI18n();
const form = ref<UserForm>({
  first_name: '',
  last_name: '',
  avatar: '',
});

function handleSubmitClick() {
  console.log(form.value);
}
</script>

<template>
  <div class="flex gap-8">
    <app-card class="basis-2/3 flex flex-col items-start">
      <div class="flex gap-8 py-8 w-full grow">
        <app-input
          v-model="form.first_name"
          :label="t('first-name')"
          variant="outlined"
          class="w-full"
        />
        <app-input
          v-model="form.last_name"
          :label="t('last-name')"
          variant="outlined"
          class="w-full"
        />
      </div>
      <div class="flex gap-4">
        <app-button
          variant="filled"
          color="primary"
          size="medium"
          rounded="small"
          @click="handleSubmitClick"
        >
          {{ t('update-details') }}
        </app-button>
        <app-button
          variant="outlined"
          color="gray-700"
          size="medium"
          rounded="small"
          @click="router.back()"
        >
          {{ t('cancel') }}
        </app-button>
      </div>
    </app-card>
    <app-card class="basis-1/3 flex flex-col items-start">
      <img src="@/assets/avatar-placeholder.png" class="mx-auto pt-6 pb-8">
      <app-button
        variant="outlined"
        color="gray-700"
        size="medium"
        rounded="small"
        class="w-full"
      >
        <app-icon size="medium" icon="i-material-symbols-android-camera" />
        <p class="ml-2">
          {{ t('change-photo') }}
        </p>
      </app-button>
    </app-card>
  </div>
</template>
