import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { useDebouncedRef } from '@/composables/debounced-ref';
import { useFetch } from '@/composables/fetch';
import type { CreateUserResponse, GetUsersResponse } from '@/types/api';

export const useUsersStore = defineStore('users', () => {
  const page = ref(1);
  const query = useDebouncedRef({
    initialValue: '',
    timeout: 500,
  });
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

  return { page, query, response, loading, createUser };
});
