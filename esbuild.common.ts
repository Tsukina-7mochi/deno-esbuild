import * as esbuild from 'https://deno.land/x/esbuild@v0.15.10/mod.js';
import { posix } from 'https://deno.land/std/path/mod.ts';
import { sassPlugin } from 'npm:esbuild-sass-plugin';
import { cache } from 'https://deno.land/x/esbuild_plugin_cache/mod.ts';
import importmap from './import_map.json' assert {type: 'json'};

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
    }
  )]
}

export default config