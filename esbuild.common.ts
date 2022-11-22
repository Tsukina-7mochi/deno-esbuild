import * as esbuild from 'https://deno.land/x/esbuild@v0.15.10/mod.js';
import { posix } from 'https://deno.land/std/path/mod.ts';
import { sassPlugin } from 'npm:esbuild-sass-plugin'

const dirName = new URL('.', import.meta.url).pathname;
const srcPath = posix.join(dirName, 'src')
const destPath = posix.join(dirName, 'dist')

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
  plugins: [sassPlugin({
    type: 'style'
  })]
}

export default config