import * as esbuild from 'esbuild';
import { Command } from "cliffy";
import { readLines } from "std/io/mod.ts";
import buildOptions from './buildOptions.ts';

const { options } = await new Command()
  .option('-d, --dev', 'development mode')
  .option('-w, --watch', 'watch mode')
  .option('-s, --serve', 'serve mode')
  .parse(Deno.args);

const config = buildOptions(options.dev);
const ctx = await esbuild.context(config);

if(!options.watch) {
  await ctx.rebuild().catch(() => {});
}
if(options.serve) {
  const { host, port } = await ctx.serve({
    servedir: config.outdir
  });
  console.log(`Serving on ${host}:${port}`);
}
if(options.watch || options.serve) {
  await ctx.watch();
  console.log('Watching...');

  for await(const _ of readLines(Deno.stdin)) {
    // manually rebuild
    await ctx.rebuild().catch(() => {});
  }
}

esbuild.stop();
