import { type UnwrapRef, computed, ref } from 'vue';

interface DebouncedRefOptions<T> {
  initialValue: T;
  timeout: number;
}

function debounce<T extends (...args: never[]) => unknown>(func: T, timeout: number) {
  let timer: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}

export function useDebouncedRef<T>(options: DebouncedRefOptions<T>) {
  const { initialValue, timeout } = options;
  const proxiedRef = ref(initialValue);

  return computed({
    get: () => proxiedRef.value,
    set: debounce((value: UnwrapRef<T>) => {
      proxiedRef.value = value;
    }, timeout),
  });
}
