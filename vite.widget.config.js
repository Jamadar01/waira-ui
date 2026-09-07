import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Builds the embeddable widget — a separate artifact from the standalone site.
 *
 *   npm run build:widget   →   dist-widget/waira-widget.js
 *
 * One self-contained IIFE: React, the components and every stylesheet are
 * bundled in, because the host page is a stranger's page and can be assumed to
 * provide nothing. mount.js injects the CSS into a shadow root rather than
 * letting Vite put it in <head>, so this build emits no .css file at all.
 *
 * The API URL is baked in at build time from `.env.widget`. There is no dev
 * proxy out here — the widget calls the deployed backend directly, which means
 * that backend must send CORS headers for the host origin.
 */
export default defineConfig({
  plugins: [react()],
  // Library mode does not substitute this the way an app build does, and React
  // reads it on every render. Left alone the bundle ships React's development
  // branches and then dies on `process is not defined` in the browser.
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    lib: {
      entry: 'src/mount.js',
      name: 'WairaWidget',
      // IIFE, not ESM: a plain <script src> tag on any page, no type="module"
      // and no import-map assumptions about the host.
      formats: ['iife'],
      fileName: () => 'waira-widget.js',
    },
    // Emitted into the standalone site's own output, so Vercel serves it at
     // https://waira-ui.vercel.app/waira-widget.js — that URL is what the
     // portfolio's script tag points at. `emptyOutDir: false` because the app
     // build runs first and this must not wipe it.
    outDir: 'dist',
    emptyOutDir: false,
    cssCodeSplit: false,
    // The standalone build keeps its own hashed assets; this one is a single
    // file whose URL people paste into a script tag, so it must stay stable.
    sourcemap: false,
  },
})
