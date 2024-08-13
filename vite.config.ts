import { defineConfig } from 'vite';
/**
 * Good for fast loading. But having error with docker
 */
// import react from '@vitejs/plugin-react-swc'
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      include: '**/*.tsx',
    }),
    tsconfigPaths(),
  ],
  build: {
    target: 'esnext',
  },
  server: {
    hmr: {
      overlay: false,
    },
    watch: {
      usePolling: true,
    },
    host: true, // needed for the Docker Container port mapping to work
    strictPort: true,
    port: process.env.PORT ? parseInt(process.env.PORT) : 4001, // you can replace this port with any port
  },
});
