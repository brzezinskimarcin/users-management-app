import { type MaybeRefOrGetter, isProxy, isRef, ref, toValue, watch } from 'vue';

interface FetchOptions<T, U> {
  url: MaybeRefOrGetter<string>;
  method?: 'DELETE' | 'GET' | 'PATCH' | 'POST';
  query?: MaybeRefOrGetter<Record<string, number | string>>;
  refetch?: boolean;
  mapResponse?: (res: T) => U;
}

const BASE_URL = 'https://reqres.in/api';

export function serializeQueryParams(params: Record<string, number | string>) {
  return Object.entries(params).reduce((queryString, [key, value]) => {
    if (value?.toString()) {
      const operator = queryString ? '&' : '?';
      queryString += `${operator}${key}=${value}`;
    }
    return queryString;
  }, '');
}

export function useFetch<T, U = T>(options: FetchOptions<T, U>) {
  const { url, query = {}, method = 'GET', refetch, mapResponse } = options;
  const loading = ref(false);
  const error = ref<Error>();
  const data = ref<U>();

  async function execute(requestBody?: unknown) {
    loading.value = true;
    error.value = undefined;

    try {
      const serializedQueryParams = serializeQueryParams(toValue(query));
      const response = await fetch(
        `${BASE_URL}${toValue(url)}${serializedQueryParams}`,
        {
          method: toValue(method),
          body: JSON.stringify(requestBody),
        },
      );

      if (response.ok) {
        const responseData = await response.json();
        data.value = mapResponse ? mapResponse(responseData) : responseData;
        return data.value;
      } else {
        throw new Error(response.statusText);
      }
    } catch (err) {
      if (err instanceof Error) {
        error.value = err;
      }
    } finally {
      loading.value = false;
    }
  }

  if (refetch) {
    const reactiveOptions = Object.values(options).filter(option => isProxy(option) || isRef(option));
    watch(reactiveOptions, async () => {
      await execute();
    }, { immediate: true });
  }

  return { execute, data, loading, error };
}

export * from '@/types/api';
