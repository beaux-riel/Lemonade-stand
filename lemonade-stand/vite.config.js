import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { splitVendorChunkPlugin } from 'vite';
import { compression } from 'vite-plugin-compression2';
import { visualizer } from 'rollup-plugin-visualizer';

// Get the repository name from environment or package.json homepage
const getBase = () => {
  // For GitHub Pages deployment via environment variable
  if (process.env.GITHUB_REPOSITORY) {
    const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/');
    return `/${repo}/`;
  }
  
  // For GitHub Pages deployment via package.json homepage
  try {
    const packageJson = require('./package.json');
    if (packageJson.homepage) {
      const url = new URL(packageJson.homepage);
      const pathSegments = url.pathname.split('/').filter(Boolean);
      if (pathSegments.length > 0) {
        return `/${pathSegments.join('/')}/`;
      }
    }
  } catch (e) {
    console.warn('Could not parse homepage from package.json:', e);
  }
  
  // For local development or custom domain
  return '/';
};

// https://vitejs.dev/config/
export default defineConfig({
  base: getBase(),
  plugins: [
    react({
      // Add JSX runtime for React 19
      jsxRuntime: 'automatic',
      // Include all JSX files
      include: '**/*.{jsx,js,ts,tsx}',
    }),
    splitVendorChunkPlugin(),
    compression({
      algorithm: 'gzip',
      exclude: [/\.(br)$/, /\.(gz)$/],
    }),
    compression({
      algorithm: 'brotliCompress',
      exclude: [/\.(br)$/, /\.(gz)$/],
    }),
    visualizer({
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  build: {
    // Generate source maps for production build
    sourcemap: true,
    // Minify output
    minify: 'terser',
    // Terser options
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Configure rollup options
    rollupOptions: {
      output: {
        // Chunk files by type
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router'],
          'vendor-leaflet': ['leaflet', 'react-leaflet'],
          'vendor-supabase': ['@supabase/supabase-js'],
          'vendor-ui': ['./src/components/ui/index.js'],
        },
        // Customize chunk filenames
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')) {
            return 'assets/images/[name]-[hash][extname]';
          }
          if (/\.css$/.test(name ?? '')) {
            return 'assets/css/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 12000,
    allowedHosts: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
    // Add historyApiFallback for SPA routing
    historyApiFallback: {
      disableDotRule: true,
      index: '/',
    },
    // We'll handle HTTPS differently - removing this for now
    https: false,
  },
  preview: {
    host: '0.0.0.0',
    port: 12000,
    allowedHosts: true,
    // Add historyApiFallback for SPA routing
    historyApiFallback: {
      disableDotRule: true,
      index: '/',
    },
    // We'll handle HTTPS differently - removing this for now
    https: false,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router', 'leaflet', 'react-leaflet'],
  },
});