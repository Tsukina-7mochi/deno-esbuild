import * as esbuild from 'esbuild';
import { posix } from 'posix';
import { sassPlugin } from 'esbuild-sass-plugin';
import { esbuildCachePlugin } from 'esbuild-cache-plugin';
import importMap from './import_map.browser.json' assert {type: 'json'};

const srcPath = 'src';
const destPath = 'dist';
const cachePath = 'cache';

const config: Partial<esbuild.BuildOptions> = {
  entryPoints: [
    posix.join(srcPath, 'main.ts'),
    posix.join(srcPath, 'index.html'),
  ],
  bundle: true,
  outdir: destPath,
  platform: 'browser',
  loader: {
    '.html': 'copy'
  },
  plugins: [
    esbuildCachePlugin({
      directory: cachePath
    }),
    sassPlugin({
      type: 'style'
    })
  ]
}

export default config