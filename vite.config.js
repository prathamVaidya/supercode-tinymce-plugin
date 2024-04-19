import { defineConfig } from 'vite'
import { resolve } from 'path'
import terser from '@rollup/plugin-terser';

const outputDir = 'supercode';

const SupercodeHotReload = () => {
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
};

export default defineConfig({
    build: {
      minify: 'terser',
      lib: {
        entry: resolve(__dirname, 'src/plugin.js'),
        formats: ['es'],
        fileName: 'plugin.min',
      },
      rollupOptions: { 
        plugins: [terser({
          format: {
            comments: false,          
          },
          mangle: {
              keep_classnames: false, 
              reserved: [],
          },
        })],
      },
      copyPublicDir: false,
      outDir: outputDir,
      emptyOutDir: false,
    },
    plugins: [
        SupercodeHotReload()
      ]
});