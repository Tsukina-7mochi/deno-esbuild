import * as esbuild from 'esbuild';
import { Plugin, BuildOptions } from 'esbuild';
import { Command } from "cliffy";
import { readLines } from "std/io/mod.ts";
import * as fmt from "std/fmt/colors.ts";
import devConfig from './esbuild.dev.ts';
import prodConfig from './esbuild.prod.ts';

const getTimeString = () => {
  const date = new Date();
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

const buildResultPlugin: Plugin = (() => {
  let startTime = 0;
  let endTime = 0;
  return {
    name: 'build-result-plugin',
    setup(build) {
      build.onStart(() => {
        startTime = Date.now();
      });
      build.onEnd((result) => {
        endTime = Date.now();

        if(result.errors.length > 0) {
          console.log(`${fmt.bold(getTimeString())} Build failed with ${result.errors.length} errors.`);
        } else {
          console.log(`${fmt.bold(getTimeString())} Build succeeded in ${endTime - startTime}ms`);
        }
      });
    },
  }
})();

const { options, args } = await new Command()
  .option('-d, --dev', 'development mode')
  .option('-w, --watch', 'watch mode (development only)')
  .parse(Deno.args);

let config = options.dev ? devConfig : prodConfig;
config = {
  ...config,
  plugins: [
    buildResultPlugin,
    ...(config.plugins ?? [])
  ]
};
const ctx = await esbuild.context(config);

if(options.dev && options.watch) {
  await ctx.watch();
  console.log('Watching...');

  for await(const _ of readLines(Deno.stdin)) {
    // do nothing
  }
} else {
  // just build
  await ctx.rebuild();
}

esbuild.stop();
