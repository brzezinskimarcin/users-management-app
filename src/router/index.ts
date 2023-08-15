import { createRouter, createWebHashHistory } from 'vue-router/auto';

export const router = createRouter({
  history: createWebHashHistory(),
  extendRoutes: routes => [
    ...routes,
    { path: '/:all(.*)*', redirect: '/users' },
  ],
});
