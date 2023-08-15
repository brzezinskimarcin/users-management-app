import { type MaybeRefOrGetter, ref, toValue } from 'vue';

interface ValidationOptions<T> {
  ref: MaybeRefOrGetter<T>;
  rule: (value: T) => string | true;
}

export function required(value?: string) {
  return !!value?.trim() || 'Field is required';
}

export function useValidation<T>(options: ValidationOptions<T>) {
  const error = ref('');

  function validate() {
    const result = options.rule(toValue(options.ref));
    if (result !== true) {
      error.value = result;
    } else {
      error.value = '';
    }
  }

  return { error, validate };
}
