import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
    proxy: {
      '/api/idx': {
        target: 'https://api.idxbroker.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/idx/, ''),
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            // Add the accesskey header for IDX API
            const apiKey = process.env.VITE_IDX_API_KEY || '';
            if (apiKey) {
              proxyReq.setHeader('accesskey', apiKey);
              console.log('🔑 Added accesskey to proxy request');
            }
          });
          proxy.on('error', (err) => {
            console.error('❌ Proxy error:', err);
          });
        },
      },
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
