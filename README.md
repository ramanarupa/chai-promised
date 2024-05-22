<a href="http://promisesaplus.com/">
    <img src="https://promises-aplus.github.io/promises-spec/assets/logo-small.png" width="70px"
         align="right" valign="top" alt="Promises/A+ logo" />
</a>

# Chai Assertions for Promises

![Dynamic JSON Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Framanarupa%2Fchai-promised%2Fmaster%2Fpackage.json&query=%24.dependencies.chai&label=chai)
![Dynamic JSON Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Framanarupa%2Fchai-promised%2Fmaster%2Fpackage.json&query=%24.devDependencies.typescript&label=typescript)
![Dynamic JSON Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Framanarupa%2Fchai-promised%2Fmaster%2Fpackage.json&query=%24.devDependencies.rollup&label=rollup)
[![pnpm](https://img.shields.io/npm/v/pnpm?label=pnpm)](https://www.npmjs.com/package/pnpm)

It is a fork of **Chai as Promised** for supporting Chai >= 5.x and typescript.  
Please see documentation at [chai-as-promised](https://www.chaijs.com/plugins/chai-as-promised/)  

## Installation

`npm uninstall @types/chai-as-promised chai-as-promised --save-dev --force`  
`npm install chai-promised --save-dev`  

## Usage

This library was developed primarily to support the development of unit tests using typescript.  

``` javascript
import { chaiAsPromised } from 'chai-promised';
import * as chai from 'chai';

chai.use(chaiAsPromised);
```
