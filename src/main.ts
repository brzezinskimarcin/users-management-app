import { createApp } from 'vue';
import { router } from '@/router';
import { store } from '@/store';
import { i18n } from '@/i18n';
import app from '@/app.vue';
import '@unocss/reset/tailwind.css';
import 'uno.css';
import '@/assets/main.scss';

createApp(app)
  .use(router)
  .use(store)
  .use(i18n)
  .mount('#app');
