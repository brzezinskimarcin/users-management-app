import matchers from '@testing-library/jest-dom/matchers';
import { afterEach, expect } from 'vitest';
import { cleanup } from './cleanup';
import type { RenderResult } from '@/../tests/utils';
import '@testing-library/jest-dom/vitest';

afterEach(cleanup);
expect.extend(matchers);
expect.extend({
  toHaveEmitted(wrapper: RenderResult, eventName: string, ...payload: unknown[]) {
    const { isNot, equals } = this;
    const emitted: unknown[][] = wrapper.emitted(eventName) || [];

    if (arguments.length >= 3) {
      return {
        pass: emitted
          .some((event: unknown[]) =>
            payload.length === event.length && payload.every((payload, i) => equals(event[i], payload)),
          ),
        message: () => `The "${eventName}" event was${isNot ? '' : ' not'} emitted with the payload: [${payload}]${isNot ? ', while it shouldn\'t.' : `. Received: [${emitted}].`}`,
      };
    } else {
      return {
        pass: emitted.length > 0,
        message: () => `The "${eventName}" event was${isNot ? '' : ' not'} emitted${isNot ? ', while it shouldn\'t.' : '.'}`,
      };
    }
  },
});
