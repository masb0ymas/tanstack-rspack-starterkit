import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/rspack'

// Docs: https://rsbuild.rs/config/
export default defineConfig(({ env }) => ({
  plugins: [pluginReact()],
  output: {
    distPath: {
      root: 'client',
    },
  },
  server:
    env === 'development'
      ? {
          proxy: {
            '/api': {
              target: 'http://localhost:8080',
              changeOrigin: true,
            },
          },
        }
      : {},
  tools: {
    rspack: {
      plugins: [
        tanstackRouter({
          target: 'react',
          autoCodeSplitting: true,
        }),
      ],
    },
  },
}))
