import * as esbuild from 'esbuild';
import commonConfig from './esbuild.common.ts';

const config: esbuild.BuildOptions = {
  ...commonConfig,
  minify: true,
  sourcemap: 'linked',
}

export default config;
