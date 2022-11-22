# Building browser content with esbuild and Deno

## Abstract

This repository is a experiment of building browser content with [https://esbuild.github.io/](esbuild) and [https://deno.land/](Deno).

In this experiment, we build a tiny web application and build them for browser.
The specific tasks are:

- build `.ts` files into one `.js` files with source map
  - source map is linked when production build, or inline when development build
- build `.scss` file and bundle into `.js` file
- copy `.html` files
- import `React` and compile JSX

## Usage

- build
  ```sh
  $deno task build
  ```
- development build
  ```sh
  $deno task dev
  # or
  $deno task watch
  ```
