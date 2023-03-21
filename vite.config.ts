import { fileURLToPath, URL } from 'node:url'
import EslintPlugin from 'vite-plugin-eslint'
import StyleLintPlugin from 'vite-plugin-stylelint'
import VitePluginFonts from 'vite-plugin-fonts'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

const styleLintConfig = StyleLintPlugin({
  files: ['src/**/*.{vue,scss}'],
  fix: true,
})

const eslintConfig = EslintPlugin({
  fix: true,
  cache: false,
})

const fontsConfig = VitePluginFonts({
  custom: {
    families: [
      {
        name: 'SourceSansPro',
        local: 'SourceSansPro',
        src: './src/styles/fonts/*.ttf',
      },
    ],
  },
})

const autoImportConfig = AutoImport({
  resolvers: [ElementPlusResolver()],
  imports: ['vitest'],
  dts: true,
})

const componentsConfig = Components({
  resolvers: [ElementPlusResolver()],
})

const svgIconsConfig = createSvgIconsPlugin({
  iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
  symbolId: 'icon-[dir]-[name]',
  inject: 'body-first',
  customDomId: '__svg__icons__dom__',
})

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    deps: {
      inline: ['element-plus'],
    },
  },
  plugins: [vue(), styleLintConfig, eslintConfig, fontsConfig, autoImportConfig, componentsConfig, svgIconsConfig],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/styles/resources" as *; @use "@/styles/vendor" as *;',
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
