import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { type GetUsersResponse, useFetch } from '@/composables/fetch';

export const useUsersStore = defineStore('users', () => {
  const page = ref(1);
  const query = ref('');
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
