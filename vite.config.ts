import { URL, fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import Vue from '@vitejs/plugin-vue';
import VueRouter from 'unplugin-vue-router/vite';
import VueComponents from 'unplugin-vue-components/vite';
import UnoCSS from 'unocss/vite';
import { presetIcons, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss';

export default defineConfig({
  plugins: [
    Vue(),
    UnoCSS({
      theme: {
        colors: {
          primary: '#449571',
          gray: {
            100: '#f8f9fa',
            200: '#f5f7f9',
            300: '#e1e4e8',
            400: '#c8cfd5',
            500: '#adb5bb',
            600: '#6c737b',
            700: '#636c73',
            800: '#4a5056',
            900: '#23252a',
          },
        },
      },
      presets: [
        presetUno(),
        presetIcons(),
      ],
      transformers: [
        transformerDirectives(),
        transformerVariantGroup(),
      ],
    }),
    VueRouter({
      routesFolder: 'src/views',
      exclude: ['**/__components/**/*'],
      dts: 'src/router/automated-routes.d.ts',
    }),
    VueComponents({
      dts: 'src/components/global-components.d.ts',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: 'tests/vitest.setup.ts',
  },
});
