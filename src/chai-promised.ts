
import PromisedAssertion = Chai.PromisedAssertion;
import Assertion = Chai.Assertion;
import PromisedAssert = Chai.PromisedAssert;

export function chaiPromised(chai: Chai.ChaiStatic, utils: Chai.ChaiUtils): void {
  const Assertion = chai.Assertion;
  const assert = chai.assert;
  const proxify = utils.proxify;

  //  if ((utils as any).checkError) {
  const checkError = (utils as any).checkError;
  //  }

  function isLegacyJQueryPromise(thenable: any) {
    return typeof thenable.catch !== 'function' &&
      typeof thenable.always === 'function' &&
      typeof thenable.done === 'function' &&
      typeof thenable.fail === 'function' &&
      typeof thenable.pipe === 'function' &&
      typeof thenable.progress === 'function' &&
      typeof thenable.state === 'function';
  }

  function assertIsAboutPromise(assertion: any) {
    if (!assertion) {
      throw new TypeError(`${assertion} is not a thenable.`);
    }
    if (typeof assertion._obj.then !== 'function') {
      throw new TypeError(utils.inspect(assertion._obj) + ' is not a thenable.');
    }
    if (isLegacyJQueryPromise(assertion._obj)) {
      throw new TypeError('Chai as Promised is incompatible with thenables of jQuery<3.0.0, sorry! Please ' +
        'upgrade jQuery or use another Promises/A+ compatible library (see ' +
        'http://promisesaplus.com/).');
    }
  }

  function proxifyIfSupported(assertion: Chai.Assertion, methodName: string) {
    return proxify === undefined ? assertion : proxify(assertion, methodName);
  }

  function method(this: Chai.Assertion, name: string, asserter: Function) {
    utils.addMethod(Assertion.prototype, name, function(this: Chai.Assertion) {
      assertIsAboutPromise(this);
      return asserter.apply(this, arguments);
    });
  }

  function property(name: string, asserter: any) {
    utils.addProperty(Assertion.prototype, name, function(this: Chai.Assertion) {
      assertIsAboutPromise(this);
      return proxifyIfSupported(asserter.apply(this, arguments), name);
    });
  }

  function doNotify(promise: Promise<any>, done: any) {
    promise.then(() => {
      done();
    }, done);
  }

  function assertIfNegated(assertion: any, message: string, extra: any) {
    assertion.assert(true, null, message, extra.expected, extra.actual);
  }

  function assertIfNotNegated(assertion: any, message: string | null, extra: any) {
    assertion.assert(false, message, null, extra.expected, extra.actual);
  }

  function getBasePromise(assertion: any) {
    return typeof assertion.then === 'function' ? assertion : assertion._obj;
  }

  function getReasonName(reason: any) {
    return reason instanceof Error ? reason.toString() : checkError.getConstructorName(reason);
  }

  const propertyNames = Object.getOwnPropertyNames(Assertion.prototype);

  const propertyDescs: any = {};
  for (const name of propertyNames) {
    propertyDescs[name] = Object.getOwnPropertyDescriptor(Assertion.prototype, name);
  }

  property('fulfilled', function(this: Chai.Assertion) {
    const derivedPromise = getBasePromise(this).then(
      (value: any) => {
        assertIfNegated(this,
          'expected promise not to be fulfilled but it was fulfilled with #{act}',
          { actual: value });
        return value;
      },
      (reason: any) => {
        assertIfNotNegated(this,
          'expected promise to be fulfilled but it was rejected with #{act}',
          { actual: getReasonName(reason) });
        return reason;
      }
    );
    transferPromiseness(this, derivedPromise);
    return this;
  });

  property('rejected', function(this: Chai.Assertion) {
    const derivedPromise = getBasePromise(this).then(
      (value: any) => {
        assertIfNotNegated(this,
          'expected promise to be rejected but it was fulfilled with #{act}',
          { actual: value });
        return value;
      },
      (reason: any) => {
        assertIfNegated(this,
          'expected promise not to be rejected but it was rejected with #{act}',
          { actual: getReasonName(reason) });

        // Return the reason, transforming this into a fulfillment, to allow further assertions, e.g.
        // `promise.should.be.rejected.and.eventually.equal("reason")`.
        return reason;
      }
    );

    transferPromiseness(this, derivedPromise);
    return this;
  });

  // @ts-ignore
  method('rejectedWith', function(this: PromiseAssertion, errorLike: any, errMsgMatcher: any, message: string) {
    let errorLikeName: any = null;
    const negate = utils.flag(this, 'negate') || false;

    // rejectedWith with that is called without arguments is
    // the same as a plain ".rejected" use.
    if (errorLike === undefined && errMsgMatcher === undefined &&
      message === undefined) {
      /* eslint-disable no-unused-expressions */
      return this.rejected;
      /* eslint-enable no-unused-expressions */
    }

    if (message !== undefined) {
      utils.flag(this, 'message', message);
    }

    if (errorLike instanceof RegExp || typeof errorLike === 'string') {
      errMsgMatcher = errorLike;
      errorLike = null;
    } else if (errorLike && errorLike instanceof Error) {
      errorLikeName = errorLike.toString();
    } else if (typeof errorLike === 'function') {
      errorLikeName = checkError.getConstructorName(errorLike);
    } else {
      errorLike = null;
    }
    const everyArgIsDefined = Boolean(errorLike && errMsgMatcher);

    let matcherRelation = 'including';
    if (errMsgMatcher instanceof RegExp) {
      matcherRelation = 'matching';
    }

    const derivedPromise = getBasePromise(this).then(
      (value: any) => {
        let assertionMessage: string | null = null;
        let expected = null;

        if (errorLike) {
          assertionMessage = 'expected promise to be rejected with #{exp} but it was fulfilled with #{act}';
          expected = errorLikeName;
        } else if (errMsgMatcher) {
          assertionMessage = `expected promise to be rejected with an error ${matcherRelation} #{exp} but ` +
            `it was fulfilled with #{act}`;
          expected = errMsgMatcher;
        }

        assertIfNotNegated(this, assertionMessage, { expected, actual: value });
        return value;
      },
      (reason: any) => {
        const errorLikeCompatible = errorLike && (errorLike instanceof Error ?
          checkError.compatibleInstance(reason, errorLike) :
          checkError.compatibleConstructor(reason, errorLike));

        const errMsgMatcherCompatible = errMsgMatcher && checkError.compatibleMessage(reason, errMsgMatcher);

        const reasonName = getReasonName(reason);

        if (negate && everyArgIsDefined) {
          if (errorLikeCompatible && errMsgMatcherCompatible) {
            this.assert(true,
              null,
              'expected promise not to be rejected with #{exp} but it was rejected ' +
              'with #{act}',
              errorLikeName,
              reasonName);
          }
        } else {
          if (errorLike) {
            this.assert(errorLikeCompatible,
              'expected promise to be rejected with #{exp} but it was rejected with #{act}',
              'expected promise not to be rejected with #{exp} but it was rejected ' +
              'with #{act}',
              errorLikeName,
              reasonName);
          }

          if (errMsgMatcher) {
            this.assert(errMsgMatcherCompatible,
              `expected promise to be rejected with an error ${matcherRelation} #{exp} but got ` +
              `#{act}`,
              `expected promise not to be rejected with an error ${matcherRelation} #{exp}`,
              errMsgMatcher,
              checkError.getMessage(reason));
          }
        }

        return reason;
      }
    );

    transferPromiseness(this, derivedPromise);
    return this;
  });

  property('eventually', function(this: PromisedAssertion) {
    utils.flag(this, 'eventually', true);
    return this;
  });

  // @ts-ignore
  method('notify', function(this: PromiseAssertion, done: Function) {
    doNotify(getBasePromise(this), done);
    return this;
  });

  // @ts-ignore
  method('become', function(this: PromiseAssertion, value, message) {
    return this.eventually.deep.equal(value, message);
  });

  // ### `eventually`

  // We need to be careful not to trigger any getters, thus `Object.getOwnPropertyDescriptor` usage.
  const methodNames = propertyNames.filter(name => {
    return name !== 'assert' && typeof propertyDescs[name].value === 'function';
  });

  methodNames.forEach(methodName => {
    Assertion.overwriteMethod(methodName, originalMethod => function(this: Assertion) {
      return doAsserterAsyncAndAddThen(originalMethod, this, arguments);
    });
  });

  const getterNames = propertyNames.filter(name => {
    return name !== '_obj' && typeof propertyDescs[name].get === 'function';
  });

  getterNames.forEach(getterName => {
    // Chainable methods are things like `an`, which can work both for `.should.be.an.instanceOf` and as
    // `should.be.an("object")`. We need to handle those specially.
    // @ts-ignore
    const isChainableMethod = Assertion.prototype.__methods.hasOwnProperty(getterName);

    if (isChainableMethod) {
      Assertion.overwriteChainableMethod(
        getterName,
        originalMethod => function(this: Assertion) {
          return doAsserterAsyncAndAddThen(originalMethod, this, arguments);
        },
        // @ts-ignore
        (originalGetter: any) => function(this: PromiseAssertion) {
          return doAsserterAsyncAndAddThen(originalGetter, this);
        }
      );
    } else {
      Assertion.overwriteProperty(getterName, originalGetter => function(this: Assertion) {
        return proxifyIfSupported(doAsserterAsyncAndAddThen(originalGetter, this), getterName);
      });
    }
  });

  function doAsserterAsyncAndAddThen(asserter: any, assertion: Assertion, args?: any) {
    // Since we're intercepting all methods/properties, we need to just pass through if they don't want
    // `eventually`, or if we've already fulfilled the promise (see below).
    if (!utils.flag(assertion, 'eventually')) {
      asserter.apply(assertion, args);
      return assertion;
    }

    const derivedPromise = getBasePromise(assertion).then((value: any) => {
      // Set up the environment for the asserter to actually run: `_obj` should be the fulfillment value, and
      // now that we have the value, we're no longer in "eventually" mode, so we won't run any of this code,
      // just the base Chai code that we get to via the short-circuit above.
      // @ts-ignore
      assertion._obj = value;
      utils.flag(assertion, 'eventually', false);

      return args ? transformAsserterArgs(args) : args;
    }).then((newArgs: any) => {
      asserter.apply(assertion, newArgs);

      // Because asserters, for example `property`, can change the value of `_obj` (i.e. change the "object"
      // flag), we need to communicate this value change to subsequent chained asserters. Since we build a
      // promise chain paralleling the asserter chain, we can use it to communicate such changes.
      // @ts-ignore
      return assertion._obj;
    });

    transferPromiseness(assertion, derivedPromise);
    return assertion;
  }

  // ### Now use the `Assertion` framework to build an `assert` interface.
  const originalAssertMethods = Object.getOwnPropertyNames(assert).filter(propName => {
    // @ts-ignore
    return typeof assert[propName] === 'function';
  });

  assert.isFulfilled = (promise, message) => (new Assertion(promise, message)).to.be.fulfilled;

  // @ts-ignore
  assert.isRejected = (promise: PromiseLike<any>, errorLike: Function | Error, errMsgMatcher: string | RegExp, message: string) => {
    const assertion = new Assertion(promise, message);
    return assertion.to.be.rejectedWith(errorLike, errMsgMatcher, message);
  };

  assert.becomes = (promise, value, message) => assert.eventually.deepEqual(promise, value, message);
  assert.doesNotBecome = (promise, value, message) => assert.eventually.notDeepEqual(promise, value, message);
  assert.eventually = {} as PromisedAssert;

  originalAssertMethods.forEach((assertMethodName: string) => {

    assert.eventually[assertMethodName] = function(promise: Promise<any>, ...otherArgs: any[]): Chai.ChaiPromise<any> {
      let customRejectionHandler;
      const message = otherArgs[assert[assertMethodName].length-2];
      if (typeof message === 'string') {
        customRejectionHandler = (reason: any) => {
          throw new chai.AssertionError(`${message}\n\nOriginal reason: ${utils.inspect(reason)}`);
        };
      }

      const returnedPromise: Record<string, any> = promise.then(
        (fulfillmentValue: any) => assert[assertMethodName](fulfillmentValue, ...otherArgs), customRejectionHandler
      );
      returnedPromise.notify = (done: any) => {
        doNotify(returnedPromise as Promise<any>, done);
      };

      return returnedPromise as Chai.ChaiPromise<any>;
    };
  });
}

export let transferPromiseness = (assertion: Assertion, promise: Promise<any>) => {
  assertion.then = promise.then.bind(promise);
};

export const chageTransferPromiseness = (newTransfer: any) => {
  const prev = transferPromiseness;
  transferPromiseness = newTransfer;
  return prev;
}

export const chaiAsPromised = chaiPromised;
export let transformAsserterArgs = (values: any) => values;
export const changeTransformAsserterArgs = (newTransform: any) => {
  const prev = transformAsserterArgs;
  transformAsserterArgs = newTransform;
  return prev;
}
