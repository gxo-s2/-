import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // 1. 모든 네트워크 인터페이스에서 접근 허용 (WSL2에서 Windows 접근 시 필요)
    host: '0.0.0.0',
    
    // 2. WSL2 환경의 HMR 연결 오류를 해결하기 위한 명시적 설정
    hmr: {
      host: 'localhost',
      protocol: 'ws',
      clientPort: 5173, // vite 기본 포트
    },
  },
  
  // 3. WSL2에서 파일 변경 감지(Watch) 문제를 방지하기 위해 Polling 사용
  watch: {
    usePolling: true,
  },
});