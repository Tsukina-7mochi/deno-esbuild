import * as esbuild from 'esbuild';
import { posix } from 'posix';
import { sassPlugin } from 'esbuild-sass-plugin';
import { cache } from 'esbuild-cache-plugin';
import importmap from './browser_import_map.json' assert {type: 'json'};

const dirName = new URL('.', import.meta.url).pathname;
const srcPath = posix.join(dirName, 'src');
const destPath = posix.join(dirName, 'dist');
const cachePath = posix.join(dirName, 'cache');

const config: Partial<esbuild.BuildOptions> = {
  entryPoints: [
    posix.join('src/main.ts'),
    posix.join('src/index.html'),
  ],
  bundle: true,
  outdir: destPath,
  platform: 'browser',
  loader: {
    '.html': 'copy'
  },
  plugins: [
    cache({
      importmap,
      directory: cachePath
    }),
    sassPlugin({
      type: 'style'
    })
  ]
}

export default config