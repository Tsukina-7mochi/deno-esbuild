import * as esbuild from 'esbuild';
import * as path from 'path';
import sassPlugin from 'esbuild-plugin-sass';
import esbuildCachePlugin from 'esbuild-plugin-cache';
import copyPlugin from 'esbuild-plugin-copy';
import resultPlugin from 'esbuild-plugin-result';
import importmap from './import_map.json' assert { type: 'json' };

const srcPath = 'src';
const destPath = 'dist';

const lockMap = JSON.parse(Deno.readTextFileSync('./deno.lock'));
const cacheDir = await esbuildCachePlugin.util.getDenoDir();

const buildOptions = (dev = false): esbuild.BuildOptions => ({
  entryPoints: [
    path.join(srcPath, 'main.ts'),
    path.join(srcPath, 'index.html'),
  ],
  bundle: true,
  outdir: destPath,
  platform: 'browser',
  loader: {
    '.html': 'copy',
  },
  plugins: [
    esbuildCachePlugin({
      denoCacheDirectory: cacheDir,
      lockMap,
      importmap,
    }),
    sassPlugin(),
    copyPlugin({
      baseDir: srcPath,
      baseOutDir: destPath,
      files: [
        { from: 'imgs/*', to: 'imgs/[name][ext]' },
      ]
    }),
    resultPlugin(),
  ],
  sourcemap: dev ? 'inline' : 'linked',
  minify: !dev,
});

export default buildOptions;
