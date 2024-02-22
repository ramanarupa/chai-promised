<a href="http://promisesaplus.com/">
    <img src="https://promises-aplus.github.io/promises-spec/assets/logo-small.png"
         align="right" valign="top" alt="Promises/A+ logo" />
</a>

# Chai Assertions for Promises

[![TypeScript](https://img.shields.io/npm/v/chai?label=chai)](https://www.npmjs.com/package/chai)
[![TypeScript](https://img.shields.io/npm/v/typescript?label=typescript)](https://www.npmjs.com/package/typescript)
[![TypeScript](https://img.shields.io/npm/v/rollup?label=rollup)](https://www.npmjs.com/package/rollup)

It is a fork of **Chai as Promised** for supporting Chai >= 5.x  
Please see documentation at [chai-as-promised](https://www.chaijs.com/plugins/chai-as-promised/)  

## Installation

`npm uninstall @types/chai-as-promised chai-as-promised --save-dev --force`  
`npm install chai-promised --save-dev`  

## Usage

``` javascript
import { chaiAsPromised } from 'chai-promised';
import * as chai from 'chai';

chai.use(chaiAsPromised);
```
