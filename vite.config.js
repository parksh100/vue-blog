import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    hmr: {
      timeout: 600000,
    },
    proxy: {
      '/api': {
        target: 'https://n8n.ai.kr',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/webhook-test'),
        configure: (proxy, options) => {
          proxy.timeout = 600000;
          proxy.proxyTimeout = 600000;
          proxy.on('proxyReq', function (proxyReq, req, res) {
            console.log('프록시 요청 시작:', new Date(), req.url);
            console.log('요청 헤더:', proxyReq.getHeaders());
          });
          proxy.on('proxyRes', function(proxyRes, req, res) {
            console.log('프록시 응답 수신:', new Date(), req.url, '상태 코드:', proxyRes.statusCode);
          });
          proxy.on('error', function(err, req, res) {
            console.error('프록시 오류 발생:', err.code, err.message);
            console.error('요청 URL:', req.url);
            if (err.code === 'ECONNRESET' || err.code === 'ETIMEDOUT') {
              res.writeHead(504, {'Content-Type': 'application/json'});
              res.end(JSON.stringify({
                error: '요청 처리 타임아웃',
                message: '서버에서 응답을 처리하는 데 시간이 너무 오래 걸립니다. 나중에 다시 시도하거나 관리자에게 문의하세요.'
              }));
            }
          });
        }
      },
    },
  },
});
