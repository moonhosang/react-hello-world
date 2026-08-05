import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages: 저장소 이름 기준 경로. (사용자/조직 페이지면 '/'로 바꾼다)
  base: '/react-hello-world/',
  // 로컬 개발 서버 포트 (npm run dev). 빌드·배포에는 영향 없음.
  server: {
    port: 5555,
  },
})
