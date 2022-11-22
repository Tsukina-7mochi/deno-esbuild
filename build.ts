import * as esbuild from 'https://deno.land/x/esbuild@v0.15.10/mod.js';
import { posix } from 'https://deno.land/std/path/mod.ts';
import { Command } from "https://deno.land/x/cliffy@v0.19.2/command/mod.ts";
import { readLines } from "https://deno.land/std/io/mod.ts";
import * as fmt from "https://deno.land/std@0.165.0/fmt/colors.ts";
import devConfig from './esbuild.dev.ts';
import prodConfig from './esbuild.prod.ts';

const getTimeString = () => {
  const date = new Date();
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

const { options, args } = await new Command()
  .option('-d, --dev', 'development mode')
  .option('-w, --watch', 'watch mode (development only)')
  .parse(Deno.args);

const config = options.dev ? devConfig : prodConfig;
if(options.dev && options.watch) {
  if(!config.watch) {
    // if watch field is undefined, set rebuild listener
    const watchOption: esbuild.BuildOptions["watch"] = {
      onRebuild(error, _) {
        if(error) {
          console.error(fmt.bold(getTimeString()) + ' Build failed.');
        } else {
          console.log(fmt.bold(getTimeString()) + ' Build succeeded.');
        }
      }
    }
    config.watch = watchOption;
  }
}

const result = await esbuild.build(config);

if(options.dev && options.watch) {
  console.log('Watching...');

  for await(const _ of readLines(Deno.stdin)) {
    // do nothing
  }
} else {
  if(result.errors.length > 0) {
    console.error(fmt.bold(getTimeString()) + ' Build failed.');
    console.error(result.errors);
  } else {
    console.log(fmt.bold(getTimeString()) + ' Build succeeded.');
  }
}

esbuild.stop();