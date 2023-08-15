<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import type { UserFormData } from '@/types/api';
import defaultAvatar from '@/assets/avatar-placeholder.png';

const props = defineProps<{
  initialData: UserFormData;
  submitButtonLabel: string;
}>();

const emit = defineEmits<{
  'submit': [value: UserFormData];
}>();

const router = useRouter();
const { t } = useI18n();

const showChangePhotoDialog = ref(false);
const formData = ref(props.initialData);
const newAvatarUrl = ref(props.initialData.avatar);

watch(showChangePhotoDialog, (showDialog) => {
  if (!showDialog) {
    formData.value.avatar = newAvatarUrl.value;
  }
});
</script>

<template>
  <div class="flex gap-8">
    <app-card class="basis-2/3 flex flex-col items-start">
      <div class="flex gap-8 py-8 w-full grow">
        <app-input
          v-model="formData.first_name"
          :label="t('first-name')"
          variant="outlined"
          class="w-full"
        />
        <app-input
          v-model="formData.last_name"
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
          @click="emit('submit', formData)"
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
    <app-card class="basis-1/3 flex flex-col items-start">
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
    <app-dialog v-model="showChangePhotoDialog" :title="t('change-photo')" class="w-1/2">
      <app-input
        v-model="newAvatarUrl"
        :label="t('photo-url')"
        variant="outlined"
      />
    </app-dialog>
  </div>
</template>
