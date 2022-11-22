import * as esbuild from 'https://deno.land/x/esbuild@v0.15.10/mod.js';
import commonConfig from './esbuild.common.ts';

const config: esbuild.BuildOptions = {
  ...commonConfig,
  minify: true,
  sourcemap: 'linked',
}

export default config;
