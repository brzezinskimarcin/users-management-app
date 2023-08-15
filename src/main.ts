import { createApp } from 'vue';
import { router } from '@/router';
import { store } from '@/store';
import app from '@/app.vue';
import '@unocss/reset/tailwind.css';
import 'uno.css';
import '@/assets/main.scss';

createApp(app)
  .use(router)
  .use(store)
  .mount('#app');
