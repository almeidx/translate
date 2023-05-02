# @almeidx/translate

Use this package to easily translate text into another language using Google Translate.

This uses the global `fetch()`, which is available in Node.js v18.0.0 (without an experimental flag) or later.

## Install

```sh-session
yarn add @almeidx/translate
```

or

```sh-session
npm i @almeidx/translate
```

## Usage

```ts
translation(text: string, targetLang: string, sourceLang?: string)
```

## Examples

```js
import { translate } from "@almeidx/translate";
// or
const { translate } = require("@almeidx/translate");

const translation = await translate("Hello", "es");

console.log(translation);
// {
//   translation: 'Hola',
//   sourceLang: 'Hello',
//   source: 'Hello',
//   targetLang: 'es'
// }
```
