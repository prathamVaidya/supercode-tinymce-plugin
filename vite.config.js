import { defineConfig } from 'vite'
import { resolve } from 'path'

const outputDir = 'supercode';

function SupercodeHotReload() {
    return {
      name: 'custom-hmr',
      enforce: 'post',
      handleHotUpdate({ file, server }) {
        if (file.endsWith('plugin.js')) {
          console.log('Reloading Plugin...');
          server.ws.send({
            type: 'full-reload',          
            path: '*'
          });
        }
      },
    }
}

export default defineConfig({
    build: {
      lib: {
        entry: resolve(__dirname, 'src/plugin.js'),
        formats: ['cjs'],
        fileName: 'plugin.min',
      },
      copyPublicDir: false,
      outDir: outputDir,
      emptyOutDir: false
    },
    plugins: [
        SupercodeHotReload()
      ]
})