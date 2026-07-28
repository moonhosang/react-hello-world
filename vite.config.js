import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages: 저장소 이름 기준 경로. (사용자/조직 페이지면 '/'로 바꾼다)
  base: '/react-hello-world/',
})
