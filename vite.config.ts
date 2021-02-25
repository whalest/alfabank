import { defineConfig } from 'vite'
import { VitePluginNode } from 'vite-plugin-node'

export default defineConfig({
  plugins: [
    VitePluginNode({
      server: 'express',
      appPath: './play/app.ts',
      port: 3000,
    }),
  ],
})
