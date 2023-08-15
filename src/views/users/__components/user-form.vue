<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { required, useValidation } from '@/composables/validation';
import type { UserFormData } from '@/types/api';
import defaultAvatar from '@/assets/avatar-placeholder.png';

const props = defineProps<{
  initialData: UserFormData;
  submitButtonLabel: string;
  loading: boolean;
}>();

const emit = defineEmits<{
  'submit': [value: UserFormData];
}>();

const router = useRouter();
const { t } = useI18n();

const showChangePhotoDialog = ref(false);
const formData = ref(props.initialData);
const newAvatarUrl = ref(props.initialData.avatar);

const { error: errorFirstName, validate: validateFirstName } = useValidation({
  ref: () => formData.value.first_name,
  rule: required,
});
const { error: errorLastName, validate: validateLastName } = useValidation({
  ref: () => formData.value.last_name,
  rule: required,
});

function handleSubmitClick() {
  validateFirstName();
  validateLastName();

  if (!errorFirstName.value && !errorLastName.value) {
    emit('submit', formData.value);
  }
}

watch(showChangePhotoDialog, (showDialog) => {
  if (!showDialog) {
    formData.value.avatar = newAvatarUrl.value;
  }
});
</script>

<template>
  <div class="flex flex-col-reverse gap-8 lg:flex-row">
    <app-card class="px-4 basis-2/3 flex flex-col items-start sm:px-0">
      <div class="flex flex-col gap-8 py-8 w-full grow sm:flex-row">
        <app-input
          v-model="formData.first_name"
          :label="t('first-name')"
          :error="errorFirstName"
          variant="outlined"
          class="w-full"
        />
        <app-input
          v-model="formData.last_name"
          :label="t('last-name')"
          :error="errorLastName"
          variant="outlined"
          class="w-full"
        />
      </div>
      <div class="flex gap-4">
        <app-button
          :loading="loading"
          variant="filled"
          color="primary"
          size="medium"
          rounded="small"
          class="min-w-38"
          @click="handleSubmitClick"
        >
          {{ submitButtonLabel }}
        </app-button>
        <app-button
          variant="outlined"
          color="gray-700"
          size="medium"
          rounded="small"
          @click="router.back"
        >
          {{ t('cancel') }}
        </app-button>
      </div>
    </app-card>
    <app-card class="px-4 basis-1/3 flex flex-col items-start sm:px-0">
      <div class="mx-auto pt-6 pb-8">
        <img :src="formData.avatar || defaultAvatar" class="rounded-full w-32 h-32">
      </div>
      <app-button
        variant="outlined"
        color="gray-700"
        size="medium"
        rounded="small"
        class="w-full"
        @click="showChangePhotoDialog = true"
      >
        <app-icon size="medium" icon="i-material-symbols-android-camera" />
        <p class="ml-2">
          {{ t('change-photo') }}
        </p>
      </app-button>
    </app-card>
    <app-dialog v-model="showChangePhotoDialog" :title="t('change-photo')" class="w-4/5 sm:w-1/2">
      <app-input
        v-model="newAvatarUrl"
        :label="t('photo-url')"
        variant="outlined"
      />
    </app-dialog>
  </div>
</template>
