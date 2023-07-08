---
title: Start a TypeScript Node Project
---

Minimal selection of tools and libraries for a TypeScript Node project.

## Prerequisites

This setup has been tested with node v18.16.0 and npm 9.7.1. Basic knowledge of
npm is assumed. Reading reference documentation for corresponding tools is
recommended.

Some options are not standard and disabled by default. I consider those options
to be useful and enable them in my projects.

## Create a new project

We will use a minimal `package.json` with ESM modules.

```sh
mkdir my-project
cd my-project
```

`package.json`:

```json
{
  "private": true,
  "type": "module"
}
```

Check JSON syntax:

```sh
npm install
```

## Add and configure TypeScript

[`@tsconfig/node18`](https://www.npmjs.com/package/@tsconfig/node18) is a tiny
package which provides some default values for tsconfig to extend from. It's
[recommended](https://www.typescriptlang.org/tsconfig#target) by typescript
documentation. Alternatively we can just copy its contents into `tsconfig.json`
to avoid extra dependency.

[`@types/node`](https://www.npmjs.com/package/@types/node) provides type
definitions for Node.js API.

We added the `exactOptionalPropertyTypes` option to make TypeScript more strict
about optional properties. It is a recommended option that is not enabled by
default.

```sh
npm install --save-dev 'typescript' '@tsconfig/node18' '@types/node'
```

`tsconfig.json`:

```json
{
  "extends": "@tsconfig/node18/tsconfig.json",
  "include": ["src"],
  "compilerOptions": {
    "exactOptionalPropertyTypes": true,
    "rootDir": "src",
    "outDir": "dist"
  }
}
```

Now we can add two files in order to test our setup.

Please note that we're using `.js` file extension in `import` statement in the
`.ts` file. This is not a typo or error. That's how TypeScript works with ESM.

`src/concat.ts`:

```ts
export function concat(a: string, b: string): string {
  return a + " " + b;
}
```

`src/index.ts`:

```ts
import { concat } from "./concat.js";
console.log(concat("Hello", "world!"));
```

Now we will compile, inspect results and run the code. Notice that JavaScript
output is pretty much identical to the TypeScript minus types.

```sh
npx tsc
cat dist/concat.js
```

```js
export function concat(a, b) {
  return a + " " + b;
}
```

```sh
cat dist/index.js
```

```js
import { concat } from "./concat.js";
console.log(concat("Hello", "world!"));
```

```sh
node dist/index.js
```

```
Hello world!
```

## Add and configure ESLint

The default ESLint configuration is a good starting point. However, there are
[plenty](https://eslint.org/docs/latest/rules/) of additional checks that are
not enabled by default. For instance, the
[`eqeqeq`](https://eslint.org/docs/latest/rules/eqeqeq) check has been added.

```sh
npm install --save-dev 'eslint' '@typescript-eslint/eslint-plugin' '@typescript-eslint/parser'
```

`.eslintignore`:

```
/dist/
```

`.eslintrc.json`:

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "es2022",
    "project": "tsconfig.json"
  },
  "plugins": ["@typescript-eslint"],
  "root": true,
  "rules": {
    "eqeqeq": "error"
  }
}
```

Check that it works:

```sh
npx eslint .
```

## Add and configure Prettier

Prettier provides good defaults out of the box and even maintains a
[philosophy](https://prettier.io/docs/en/option-philosophy.html) regarding its
options. In this guide, we will change the `trailingComma` option.

```sh
npm install --save-dev 'prettier'
```

`.prettierignore`:

```
/dist/
```

`.prettierrc.json`:

```
{
  "trailingComma": "all"
}
```

Now we can check if our sources are properly formatted:

```sh
npx prettier -c .
```

```
Checking formatting...
All matched files use Prettier code style!
```

## Unit testing

Node.js has a built-in test runner. We will add a unit test for our `concat`
function.

`src/concat.test.ts`:

```ts
import { test } from "node:test";
import { strict as assert } from "node:assert";
import { concat } from "./concat.js";

await test("concat works", () => {
  assert.equal(concat("a", "b"), "a b");
});
```

Now we can compile and run this unit test. `node --test dist` will find all
JavaScript files with names matching
[some rules](https://nodejs.org/docs/latest-v18.x/api/test.html#test-runner-execution-model)
inside `dist` directory and will execute every one of them.

```sh
npx tsc
node --test dist
```

```
✔ concat works (0.48175ms)
ℹ tests 1
ℹ pass 1
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 45.819834
```

## Configure npm scripts

It's a good idea to add a few npm scripts so we won't have to memorize all the
commands and their options.

`package.json`:

```json
{
  "private": true,
  "type": "module",
  "scripts": {
    "build": "tsc",
    "build:watch": "tsc --watch",
    "check": "eslint --max-warnings 0 . && prettier --check .",
    "start": "node dist/index.js",
    "start:watch": "node --watch dist/index.js",
    "test": "node --test dist",
    "test:watch": "node --watch --test dist"
  },
  ...
}
```

Now we can execute `npm run build:watch` in the background terminal and our
TypeScript code will be constantly compiled as it changes. `npm start` will
start our application and `npm run start:watch` will restart it on any code
change. Similarly we can use `npm test` to run tests once or
`npm run test:watch` to run tests on every code change.

## IDE remarks

I'm using VSCode with the following extensions: ESLint, Prettier. It supports
TypeScript out of the box. Here're some settings which configure Prettier to be
a default formatter and to run it on save:

```json
{
  ...,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "prettier.proseWrap": "always",
  ...
}
```

It's possible to configure WebStorm or Idea with ESLint and Prettier as well.

Using `--watch` options allows for very fast feedback loops.
