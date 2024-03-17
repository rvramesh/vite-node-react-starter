import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import react from '@vitejs/plugin-react'
import copy from 'rollup-plugin-copy'

import path from 'path'
import { vavite } from 'vavite'
import { defineConfig } from 'vite'

export const DEFAULT_CLIENT_ENTRY = 'src/client/main.tsx'
export const DEFAULT_SERVER_ENTRY = 'src/server/main.ts'
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/client'),
      '@server': path.resolve(__dirname, 'src/server'),
      '@shared': path.resolve(__dirname, 'src/shared')
    }
  },
  buildSteps: [
    {
      name: 'client',
      config: {
        build: {
          outDir: 'dist/client',
          manifest: true,
          rollupOptions: { input: DEFAULT_CLIENT_ENTRY }
        }
      }
    },
    {
      name: 'server',
      config: {
        build: {
          ssr: true,

          ssrEmitAssets: true,
          rollupOptions: {
            input: DEFAULT_SERVER_ENTRY,
            external: ['manifest.json'],
            plugins: [
              commonjs(), // <-- this handles some parsing of js syntax or something (necessary for `export { init } from "mathjax";`)
              nodeResolve({ modulesOnly: true }), // <-- this allows npm modules to be added to bundle ]},
              copy({
                targets: [{ src: ['src/server/package.json', 'src/server/package-lock.json'], dest: 'dist/server' }],
                hook: 'writeBundle' // called after bundle is written to disk
              })
            ]
          },
          outDir: 'dist/server'
        }
      }
    }
  ],

  plugins: [
    react(),
    vavite({
      serverEntry: DEFAULT_SERVER_ENTRY,
      serveClientAssetsInDev: true,
      // Don't reload when dynamically imported dependencies change
      reloadOn: 'static-deps-change'
    })
  ]
})
