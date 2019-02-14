# [**@toojs/vuex-loading**](https://github.com/toojs/vuex-loading)

[![build status](https://img.shields.io/travis/vincent1993/vuex-loading.svg)](https://travis-ci.com/@toojs/vuex-loading)
[![code coverage](https://img.shields.io/codecov/c/github/vincent1993/vuex-loading.svg)](https://codecov.io/gh/@toojs/vuex-loading)
[![code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![made with lass](https://img.shields.io/badge/made_with-lass-95CC28.svg)](https://lass.js.org)
[![license](https://img.shields.io/github/license/vincent1993/vuex-loading.svg)](LICENSE)
[![npm downloads](https://img.shields.io/npm/dt/@toojs/vuex-loading.svg)](https://npm.im/@toojs/vuex-loading)

> A loading plugin for vuex


## Table of Contents

* [Install](#install)
* [Usage](#usage)
* [API](#api)
* [Contributors](#contributors)
* [License](#license)


## Install

[npm][]:

```sh
npm install @toojs/vuex-loading
```

[yarn][]:

```sh
yarn add @toojs/vuex-loading
```


## Usage

```js
import createLoadingPlugin from '@toojs/vuex-loading';

// default usage
const store = new Vuex.Store({
  plugins: [createLoadingPlugin()]
});
```


## API

| name      | type      | default                                       | description |
| :-------- | :-------- | :-------------------------------------------- | :---------- |
| namespace | string    | '@[**@loading**](https://github.com/loading)' | module name |
| includes  | string\[] | \[]                                           | -           |
| excludes  | string\[] | \[]                                           | -           |


## Contributors

| Name               |
| ------------------ |
| **Evergreen Wang** |


## License

[MIT](LICENSE) © Evergreen Wang


## 

[npm]: https://www.npmjs.com/

[yarn]: https://yarnpkg.com/
