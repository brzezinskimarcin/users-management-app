import { type PrettyDOMOptions, getQueriesForElement, prettyDOM } from '@testing-library/dom';
import { type MountingOptions, mount } from '@vue/test-utils';
import { mountedWrappers } from './cleanup';

export function render(component: any, options?: MountingOptions<any>) {
  const div = document.createElement('div');
  const baseElement = document.body;
  const container = baseElement.appendChild(div);

  const wrapper = mount(component, {
    ...options,
    attachTo: container,
  });

  const parentElement = 'parentElement';
  wrapper[parentElement].replaceWith(...wrapper[parentElement].childNodes);
  mountedWrappers.add(wrapper);

  return {
    container,
    baseElement,
    /* eslint-disable no-console */
    debug: (el = baseElement, maxLength?: number, options?: PrettyDOMOptions) =>
      Array.isArray(el)
        ? el.forEach(e => console.log(prettyDOM(e, maxLength, options)))
        : console.log(prettyDOM(el, maxLength, options)),
    /* eslint-enable */
    unmount: wrapper.unmount.bind(wrapper),
    html: wrapper.html.bind(wrapper),
    emitted: wrapper.emitted.bind(wrapper),
    rerender: wrapper.setProps.bind(wrapper),
    findComponent: wrapper.findComponent.bind(wrapper),
    findAllComponents: wrapper.findAllComponents.bind(wrapper),
    ...getQueriesForElement(baseElement),
  };
}

export type RenderResult = ReturnType<typeof render>;
