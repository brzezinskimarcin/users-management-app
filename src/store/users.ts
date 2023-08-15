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
  const editingUser = ref<User>();
  const { data: response, loading } = useFetch<GetUsersResponse>({
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

  const { execute: editUser } = useFetch<CreateUserResponse>({
    url: computed(() => `/users/${editingUser.value?.id}`),
    method: 'PATCH',
  });

  return { page, query, response, loading, editingUser, createUser, editUser };
});
