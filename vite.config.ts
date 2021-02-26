import { defineConfig } from 'vite'
import { VitePluginNode } from 'vite-plugin-node'

import dotenv from 'dotenv'
dotenv.config()

export default defineConfig({
  plugins: [
    VitePluginNode({
      server: 'express',
      appPath: './play/app.ts',
      port: 3000,
    }),
  ],
})
