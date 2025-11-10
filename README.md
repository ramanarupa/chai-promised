<a href="http://promisesaplus.com/">
    <img src="https://promises-aplus.github.io/promises-spec/assets/logo-small.png" width="70px"
         align="right" valign="top" alt="Promises/A+ logo" />
</a>

# Chai Assertions for Promises

![Dynamic JSON Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Framanarupa%2Fchai-promised%2Fmaster%2Fpackage.json&query=%24.dependencies.chai&label=chai)
![Dynamic JSON Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Framanarupa%2Fchai-promised%2Fmaster%2Fpackage.json&query=%24.devDependencies.typescript&label=typescript)
![Dynamic JSON Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Framanarupa%2Fchai-promised%2Fmaster%2Fpackage.json&query=%24.devDependencies.rollup&label=rollup)
[![pnpm](https://img.shields.io/npm/v/pnpm?label=pnpm)](https://www.npmjs.com/package/pnpm)

**chai-promised** extends Chai with assertions about promises. It's a modern TypeScript fork of the original **Chai as Promised** library, specifically designed to support Chai >= 5.x with full TypeScript type definitions.

For comprehensive API documentation, see the [chai-as-promised documentation](https://www.chaijs.com/plugins/chai-as-promised/).

## Installation

If migrating from the original chai-as-promised:

```bash
npm uninstall @types/chai-as-promised chai-as-promised --save-dev --force
npm install chai-promised --save-dev
```

Or using pnpm (recommended):

```bash
pnpm remove @types/chai-as-promised chai-as-promised
pnpm add -D chai-promised
```

## Requirements

- Node.js >= 20.10.0
- Chai >= 5.x

## Usage

### Setup

```typescript
import { chaiAsPromised } from 'chai-promised';
import * as chai from 'chai';

chai.use(chaiAsPromised);
```

### BDD Style

```typescript
// Promise fulfillment
expect(Promise.resolve('foo')).to.eventually.equal('foo');
expect(Promise.resolve({ foo: 'bar' })).to.eventually.have.property('foo');

// Promise rejection
expect(Promise.reject(new Error('boom'))).to.be.rejected;
expect(Promise.reject(new Error('boom'))).to.be.rejectedWith(Error);
expect(Promise.reject(new Error('boom'))).to.be.rejectedWith('boom');
expect(Promise.reject(new Error('boom'))).to.be.rejectedWith(Error, /boom/);

// Shorthand for deep equality
expect(Promise.resolve({ foo: 'bar' })).to.become({ foo: 'bar' });

// Notify for Mocha done() integration
return expect(Promise.resolve('foo')).to.eventually.equal('foo').notify(done);
```

### Assert Style

```typescript
// Promise-specific assertions
assert.isFulfilled(Promise.resolve('foo'));
assert.isRejected(Promise.reject(new Error('boom')));
assert.isRejected(Promise.reject(new Error('boom')), Error);
assert.isRejected(Promise.reject(new Error('boom')), /boom/);

// assert.eventually for standard assertions
assert.eventually.equal(Promise.resolve('foo'), 'foo');
assert.eventually.property(Promise.resolve({ foo: 'bar' }), 'foo');
assert.eventually.lengthOf(Promise.resolve([1, 2, 3]), 3);

// Shorthand methods
assert.becomes(Promise.resolve({ foo: 'bar' }), { foo: 'bar' });
assert.doesNotBecome(Promise.resolve(5), 10);
```

### Chaining

All Chai assertions work with `.eventually`:

```typescript
expect(Promise.resolve([1, 2, 3]))
  .to.eventually.have.length(3)
  .and.include(2)
  .and.not.include(4);

expect(Promise.resolve({ foo: 'bar', baz: 'qux' }))
  .to.eventually.have.all.keys('foo', 'baz')
  .and.have.property('foo')
  .that.is.a('string');
```

## API Overview

### Promise-Specific Assertions

- `.fulfilled` - Assert promise is fulfilled
- `.rejected` - Assert promise is rejected
- `.rejectedWith(error, [message])` - Assert promise is rejected with specific error/message
- `.eventually` - Wait for promise and run assertion on resolved value
- `.become(value)` - Shorthand for `.eventually.deep.equal(value)`
- `.notify(done)` - Mocha integration for async testing

### Assert API

- `assert.isFulfilled(promise, [message])`
- `assert.isRejected(promise, [error], [message])`
- `assert.becomes(promise, value, [message])`
- `assert.doesNotBecome(promise, value, [message])`
- `assert.eventually.*` - All standard assert methods with promise support

## Development

### Prerequisites

This project uses **pnpm** as its package manager:

```bash
npm install -g pnpm
pnpm install
```

### Commands

```bash
# Run tests
pnpm test

# Build the library
pnpm build

# Lint code
pnpm lint
pnpm lint:fix

# Clean generated files
pnpm clean
```

## TypeScript Support

This library includes comprehensive TypeScript definitions. No `@types` package is needed.

```typescript
import { chaiAsPromised, chaiPromised } from 'chai-promised';

// Both exports are available (aliases)
chai.use(chaiAsPromised);
chai.use(chaiPromised);

// Default export is also available
import chaiPromised from 'chai-promised';
chai.use(chaiPromised);
```

## Advanced Configuration

### Customizing Promise Transfer

You can customize how promiseness is transferred to assertions using `setTransferPromiseness`:

```typescript
import { setTransferPromiseness } from 'chai-promised';

setTransferPromiseness((assertion, promise) => {
  assertion.then = promise.then.bind(promise);
  // Add custom promise methods, e.g., for Q or Bluebird
  assertion.finally = promise.finally?.bind(promise);
});

// Reset to default behavior
setTransferPromiseness(null);
```

### Transforming Asserter Arguments

You can transform arguments before assertions are evaluated using `setTransformAsserterArgs`. This is useful for comparing promises against other promises:

```typescript
import { setTransformAsserterArgs } from 'chai-promised';

// Enable promise comparison by resolving all arguments
setTransformAsserterArgs(Promise.all.bind(Promise));

// Now you can compare promises directly
await expect(Promise.resolve('foo')).to.eventually.equal(Promise.resolve('foo'));

// Reset to default behavior
setTransformAsserterArgs(null);
```

## Compatibility

This library is fully compatible with the original [chai-as-promised](https://github.com/chaijs/chai-as-promised) API (v7.1.2) and maintains the same behavior while providing full TypeScript support for Chai 5.x and 6.x.

## License

WTFPL

## Contributors

- Domenic Denicola (original chai-as-promised author)
- Rustam Gaifiev
