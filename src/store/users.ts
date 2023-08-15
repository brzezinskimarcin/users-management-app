import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { useDebouncedRef } from '@/composables/debounced-ref';
import { type GetUsersResponse, useFetch } from '@/composables/fetch';

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

  return { page, query, response, loading };
});
