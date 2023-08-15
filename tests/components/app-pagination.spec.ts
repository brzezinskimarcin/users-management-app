import { describe, expect, it } from 'vitest';
import { fireEvent } from '@testing-library/dom';
import AppPagination from '@/components/app-pagination.vue';
import { type RenderResult, render } from '@/../tests/utils';

describe('@/components/app-pagination.vue', () => {
  let wrapper: RenderResult;

  const createComponent = (currentPage: number, totalPages: number) => {
    wrapper = render(AppPagination, {
      props: { currentPage, totalPages },
    });
  };
  const findPageButton = (page: string) => wrapper.getByRole('button', { name: page });

  it('currentPage is selected and disabled', () => {
    createComponent(1, 10);
    const firstPageButton = findPageButton('1');
    expect(firstPageButton).toHaveClass('bg-primary');
    expect(firstPageButton).toBeDisabled();
  });

  it('clicking on page button redirects to that page', () => {
    createComponent(1, 10);
    const seventhPageButton = findPageButton('7');
    expect(seventhPageButton).toHaveClass('bg-white');
    expect(seventhPageButton).toBeEnabled();

    fireEvent.click(seventhPageButton);
    expect(wrapper).toHaveEmitted('update:currentPage', 7);
  });

  it('clicking on next page button redirects to next page', () => {
    createComponent(3, 10);
    const nextPageButton = findPageButton('next');
    expect(nextPageButton).toBeEnabled();

    fireEvent.click(nextPageButton);
    expect(wrapper).toHaveEmitted('update:currentPage', 4);
  });

  it('is not possible to go to next page if current page is last', () => {
    createComponent(10, 10);
    const nextPageButton = findPageButton('next');
    expect(nextPageButton).toBeDisabled();
  });

  it('clicking on previous page button redirects to previous page', () => {
    createComponent(3, 10);
    const prevPageButton = findPageButton('previous');
    expect(prevPageButton).toBeEnabled();

    fireEvent.click(prevPageButton);
    expect(wrapper).toHaveEmitted('update:currentPage', 2);
  });

  it('is not possible to go to previous page if current page is 1', () => {
    createComponent(1, 10);
    const prevPageButton = findPageButton('previous');
    expect(prevPageButton).toBeDisabled();
  });
});
