const path = require('path');
const { defineConfig } = require('vite');
const vue = require('@vitejs/plugin-vue');
import eslintPlugin from 'vite-plugin-eslint';

const PROJECT_NAME = 'vue-img-mapper';
const MAIN_FILE_PATH = 'src/ImageMapper/ImageMapper.vue';

export default defineConfig({
  plugins: [vue(), eslintPlugin()],
  build: {
    lib: {
      entry: path.resolve(__dirname, MAIN_FILE_PATH),
      name: PROJECT_NAME,
      fileName: format => `${PROJECT_NAME}.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
