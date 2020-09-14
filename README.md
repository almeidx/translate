# @almeidx/translate

Use this package to easily translate text into another language using Google Translate.

## Install
```
yarn add @almeidx/translate
```
or
```
npm i @almeidx/translate
```

## Examples

```js
const Translate = require('@almeidx/translate');

const translation = await Translate.translate({
  text: 'Hello',
  targetLang: 'es',
});

console.log(translation);
```
