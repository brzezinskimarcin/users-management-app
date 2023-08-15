import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { useDebouncedRef } from '@/composables/debounced-ref';
import { useFetch } from '@/composables/fetch';
import type { CreateUserResponse, GetUsersResponse, User } from '@/types/api';

export const useUsersStore = defineStore('users', () => {
  const page = ref(1);
  const query = useDebouncedRef({
    initialValue: '',
    timeout: 500,
  });
  const modifiedUser = ref<User>();
  const { execute: fetchUsers, data: response, loading } = useFetch<GetUsersResponse>({
    url: '/users',
    query: computed(() => ({
      per_page: 8,
      page: page.value,
      query: query.value,
    })),
    refetch: true,
  });

  const { execute: createUser } = useFetch<CreateUserResponse>({
    url: '/users',
    method: 'POST',
  });

  const { execute: editUser } = useFetch({
    url: computed(() => `/users/${modifiedUser.value?.id}`),
    method: 'PATCH',
  });

  const { execute: deleteUser } = useFetch({
    url: computed(() => `/users/${modifiedUser.value?.id}`),
    method: 'DELETE',
  });

  return { page, query, response, loading, modifiedUser, fetchUsers, createUser, editUser, deleteUser };
});
