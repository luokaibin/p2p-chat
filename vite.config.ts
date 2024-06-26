import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import {resolve} from 'path'
import svgr from 'vite-plugin-svgr'
// https://vitejs.dev/config/
export default defineConfig({
  define: {
    global: 'window'
  },
  plugins: [react(), svgr({
    include: "**/*.svg?react"
  })],
  resolve: {
    alias: {
      '@pages': resolve(__dirname, 'src/pages'),
      "@ui": resolve(__dirname, 'src/components/global'),
      '@components': resolve(__dirname, 'src/components'),
      'cn': resolve(__dirname, 'src/plugins/cn.ts'),
      'relativeTime': resolve(__dirname, 'src/plugins/relativeTime.ts'),
      '@global': resolve(__dirname, 'src/global'),
      '@icons': resolve(__dirname, 'src/icons'),
      '@plugins': resolve(__dirname, 'src/plugins'),
      '@hooks': resolve(__dirname, 'src/hooks'),
    }
  },
  server: {
    host: true,
  }
})
