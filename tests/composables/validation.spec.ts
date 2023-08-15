import { ref } from 'vue';
import { describe, expect, it } from 'vitest';
import { required, useValidation } from '@/composables/validation';

describe('@/composables/validation.ts', () => {
  it('sets error when required rule is applied and value is undefined', () => {
    const input = ref();
    const { error, validate } = useValidation({
      ref: input,
      rule: required,
    });
    expect(error.value).toBe('');
    validate();
    expect(error.value).toBe('Field is required');
  });

  it('sets error when required rule is applied and value is only whitespaces', () => {
    const input = ref('    ');
    const { error, validate } = useValidation({
      ref: input,
      rule: required,
    });
    expect(error.value).toBe('');
    validate();
    expect(error.value).toBe('Field is required');
  });

  it('does not set error when required rule is applied and value has some non-whitespace value', () => {
    const input = ref('John Smith');
    const { error, validate } = useValidation({
      ref: input,
      rule: required,
    });
    expect(error.value).toBe('');
    validate();
    expect(error.value).toBe('');
  });

  it('removes error when required rule is applied and value gets some value', () => {
    const input = ref('');
    const { error, validate } = useValidation({
      ref: input,
      rule: required,
    });
    validate();
    expect(error.value).toBe('Field is required');
    input.value = 'John Smith';
    validate();
    expect(error.value).toBe('');
  });
});
