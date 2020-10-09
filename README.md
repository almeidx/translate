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

## Usage
```ts
translation(text: string, targetLang: string, sourceLang?: string)
```

## Examples

```js
import translate from '@almeidx/translate';
// or
const { translate } = require('@almeidx/translate');

const translation = await translate('Hello', 'es');

console.log(translation);
// {
//   translation: 'Hola',
//   sourceLang: 'Hello',
//   source: 'Hello',
//   targetLang: 'es'
// }
```
