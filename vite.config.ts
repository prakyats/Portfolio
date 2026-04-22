import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

/**
 * Vite build config — performance improvements:
 *
 *  manualChunks: Three.js (~600KB), Framer Motion (~130KB), and React Router
 *  were previously all bundled into one monolithic chunk. This means the browser
 *  had to parse ALL of them before rendering anything.
 *  Now they are split into separate async chunks:
 *    - vendor-react:    react + react-dom (critical, loaded first)
 *    - vendor-router:   react-router-dom (needed for navigation only)
 *    - vendor-motion:   framer-motion (animations, deferred)
 *    - vendor-three:    three.js (WebGL, heaviest — deferred furthest)
 *  The main bundle only contains app code. Three.js and Framer are loaded in
 *  parallel by the browser rather than blocking the critical rendering path.
 *
 *  cssCodeSplit: true  — each async route gets only the CSS it needs.
 *  sourcemap: false    — production builds skip sourcemaps (saves ~2× bundle size).
 *  minify: esbuild     — SWC plugin already uses esbuild for JS; consistent.
 *  target: esnext      — no legacy polyfills for a portfolio site.
 */
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: { overlay: false },
  },
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
  },
  build: {
    target: "esnext",
    minify: "esbuild",
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react":  ["react", "react-dom"],
          "vendor-router": ["react-router-dom"],
          "vendor-motion": ["framer-motion"],
          "vendor-three":  ["three"],
        },
      },
    },
  },
}));
