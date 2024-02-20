declare namespace Chai {
  interface PromisedAssertion extends Eventually, PromiseLike<any> {
  }

  // For BDD API
  interface Assertion extends LanguageChains, NumericComparison, TypeComparison {
    eventually: PromisedAssertion;
    become(expected: any, message?: string): PromisedAssertion;
    fulfilled: PromisedAssertion;
    rejected: PromisedAssertion;
    rejectedWith: PromisedThrow;
    notify(fn: Function): PromisedAssertion;
  }

  export interface AssertStatic extends Assert {
    eventually: PromisedAssert;
  }

  // Eventually does not have .then(), but PromisedAssertion have.
  interface Eventually extends PromisedLanguageChains, PromisedNumericComparison, PromisedTypeComparison {
    // From chai-as-promised
    become(expected: any): PromisedAssertion;
    fulfilled: PromisedAssertion;
    rejected: PromisedAssertion;
    rejectedWith: PromisedThrow;
    notify(fn: Function): PromisedAssertion;

    // From chai
    not: PromisedAssertion;
    deep: PromisedDeep;
    ordered: PromisedOrdered;
    nested: PromisedNested;
    any: PromisedKeyFilter;
    all: PromisedKeyFilter;
    a: PromisedTypeComparison;
    an: PromisedTypeComparison;
    include: PromisedInclude;
    contain: PromisedInclude;
    ok: PromisedAssertion;
    true: PromisedAssertion;
    false: PromisedAssertion;
    null: PromisedAssertion;
    undefined: PromisedAssertion;
    NaN: PromisedAssertion;
    exist: PromisedAssertion;
    empty: PromisedAssertion;
    arguments: PromisedAssertion;
    Arguments: PromisedAssertion;
    equal: PromisedEqual;
    equals: PromisedEqual;
    eq: PromisedEqual;
    eql: PromisedEqual;
    eqls: PromisedEqual;
    property: PromisedProperty;
    ownProperty: PromisedOwnProperty;
    haveOwnProperty: PromisedOwnProperty;
    ownPropertyDescriptor: PromisedOwnPropertyDescriptor;
    haveOwnPropertyDescriptor: PromisedOwnPropertyDescriptor;
    length: PromisedLength;
    lengthOf: PromisedLength;
    match: PromisedMatch;
    matches: PromisedMatch;
    string(string: string, message?: string): PromisedAssertion;
    keys: PromisedKeys;
    key(string: string): PromisedAssertion;
    throw: PromisedThrow;
    throws: PromisedThrow;
    Throw: PromisedThrow;
    respondTo: PromisedRespondTo;
    respondsTo: PromisedRespondTo;
    itself: PromisedAssertion;
    satisfy: PromisedSatisfy;
    satisfies: PromisedSatisfy;
    closeTo: PromisedCloseTo;
    approximately: PromisedCloseTo;
    members: PromisedMembers;
    increase: PromisedPropertyChange;
    increases: PromisedPropertyChange;
    decrease: PromisedPropertyChange;
    decreases: PromisedPropertyChange;
    change: PromisedPropertyChange;
    changes: PromisedPropertyChange;
    extensible: PromisedAssertion;
    sealed: PromisedAssertion;
    frozen: PromisedAssertion;
    oneOf(list: any[], message?: string): PromisedAssertion;
  }

  interface ChaiPromise<T> extends PromiseLike<T> {
    notify(fn: Function): PromisedAssertion;
  }

  interface PromisedLanguageChains {
    eventually: Eventually;

    // From chai
    to: PromisedAssertion;
    be: PromisedAssertion;
    been: PromisedAssertion;
    is: PromisedAssertion;
    that: PromisedAssertion;
    which: PromisedAssertion;
    and: PromisedAssertion;
    has: PromisedAssertion;
    have: PromisedAssertion;
    with: PromisedAssertion;
    at: PromisedAssertion;
    of: PromisedAssertion;
    same: PromisedAssertion;
    but: PromisedAssertion;
    does: PromisedAssertion;
  }

  interface PromisedNumericComparison {
    above: PromisedNumberComparer;
    gt: PromisedNumberComparer;
    greaterThan: PromisedNumberComparer;
    least: PromisedNumberComparer;
    gte: PromisedNumberComparer;
    below: PromisedNumberComparer;
    lt: PromisedNumberComparer;
    lessThan: PromisedNumberComparer;
    most: PromisedNumberComparer;
    lte: PromisedNumberComparer;
    within(start: any, finish: any, message?: string): PromisedAssertion;
  }

  interface PromisedNumberComparer {
    (value: number, message?: string): PromisedAssertion;
  }

  interface PromisedTypeComparison {
    (type: string, message?: string): PromisedAssertion;
    instanceof: PromisedInstanceOf;
    instanceOf: PromisedInstanceOf;
  }

  interface PromisedInstanceOf {
    (constructor: Object, message?: string): PromisedAssertion;
  }

  interface PromisedCloseTo {
    (expected: number, delta: number, message?: string): PromisedAssertion;
  }

  interface PromisedNested {
    include: PromisedInclude;
    property: PromisedProperty;
    members: PromisedMembers;
  }

  interface PromisedDeep {
    equal: PromisedEqual;
    equals: PromisedEqual;
    eq: PromisedEqual;
    include: PromisedInclude;
    property: PromisedProperty;
    members: PromisedMembers;
    ordered: PromisedOrdered;
  }

  interface PromisedOrdered {
    members: PromisedMembers;
  }

  interface PromisedKeyFilter {
    keys: PromisedKeys;
  }

  interface PromisedEqual {
    (value: any, message?: string): PromisedAssertion;
  }

  interface PromisedProperty {
    (name: string | symbol, value?: any, message?: string): PromisedAssertion;
  }

  interface PromisedOwnProperty {
    (name: string | symbol, message?: string): PromisedAssertion;
  }

  interface PromisedOwnPropertyDescriptor {
    (name: string | symbol, descriptor: PropertyDescriptor, message?: string): PromisedAssertion;
    (name: string | symbol, message?: string): PromisedAssertion;
  }

  interface PromisedLength extends PromisedLanguageChains, PromisedNumericComparison {
    (length: number, message?: string): PromisedAssertion;
  }

  interface PromisedInclude {
    (value: Object, message?: string): PromisedAssertion;
    (value: string, message?: string): PromisedAssertion;
    (value: number, message?: string): PromisedAssertion;
    keys: PromisedKeys;
    deep: PromisedDeep;
    ordered: PromisedOrdered;
    members: PromisedMembers;
    any: PromisedKeyFilter;
    all: PromisedKeyFilter;
  }

  interface PromisedMatch {
    (regexp: RegExp | string, message?: string): PromisedAssertion;
  }

  interface PromisedKeys {
    (...keys: string[]): PromisedAssertion;
    (keys: any[]): PromisedAssertion;
    (keys: Object): PromisedAssertion;
  }

  interface PromisedThrow {
    (): PromisedAssertion;
    (expected: number): PromisedAssertion;
    (expected?: string | RegExp, message?: string): PromisedAssertion;
    (constructor: Error | Function, expected?: string | RegExp, message?: string): PromisedAssertion;
  }

  interface PromisedRespondTo {
    (method: string, message?: string): PromisedAssertion;
  }

  interface PromisedSatisfy {
    (matcher: Function, message?: string): PromisedAssertion;
  }

  interface PromisedMembers {
    (set: any[], message?: string): PromisedAssertion;
  }

  interface PromisedPropertyChange {
    (object: Object, property: string, message?: string): PromisedAssertion;
  }

  // For Assert API
  interface Assert {
    eventually: PromisedAssert;
    isFulfilled(promise: PromiseLike<any>, message?: string): PromiseLike<void>;
    becomes(promise: PromiseLike<any>, expected: any, message?: string): PromiseLike<void>;
    doesNotBecome(promise: PromiseLike<any>, expected: any, message?: string): PromiseLike<void>;
    isRejected(promise: PromiseLike<any>, message?: string): PromiseLike<void>;
    isRejected(promise: PromiseLike<any>, expected: any, message?: string): PromiseLike<void>;
    isRejected(promise: PromiseLike<any>, expected: any, errMsgMatcher: RegExp | string | undefined, message?: string): PromiseLike<void>;
    isRejected(promise: PromiseLike<any>, match: RegExp, message?: string): PromiseLike<void>;
    notify(fn: Function): PromiseLike<void>;
  }

  export interface PromisedAssert {
    fail(actual?: PromiseLike<any>, expected?: any, msg?: string, operator?: string): PromiseLike<void>;

    isOk(val: PromiseLike<any>, msg?: string): ChaiPromise<void>;
    ok(val: PromiseLike<any>, msg?: string): ChaiPromise<void>;
    isNotOk(val: PromiseLike<any>, msg?: string): ChaiPromise<void>;
    notOk(val: PromiseLike<any>, msg?: string): ChaiPromise<void>;

    equal(act: PromiseLike<any>, exp: any, msg?: string): ChaiPromise<void>;
    notEqual(act: PromiseLike<any>, exp: any, msg?: string): ChaiPromise<void>;

    strictEqual(act: PromiseLike<any>, exp: any, msg?: string): ChaiPromise<void>;
    notStrictEqual(act: PromiseLike<any>, exp: any, msg?: string): ChaiPromise<void>;

    deepEqual(act: PromiseLike<any>, exp: any, msg?: string): ChaiPromise<void>;
    notDeepEqual(act: PromiseLike<any>, exp: any, msg?: string): ChaiPromise<void>;

    isAbove(val: PromiseLike<number>, above: number, msg?: string): ChaiPromise<void>;
    isAtLeast(val: PromiseLike<number>, atLeast: number, msg?: string): ChaiPromise<void>;
    isAtBelow(val: PromiseLike<number>, below: number, msg?: string): ChaiPromise<void>;
    isAtMost(val: PromiseLike<number>, atMost: number, msg?: string): ChaiPromise<void>;

    isTrue(val: PromiseLike<any>, msg?: string): ChaiPromise<void>;
    isFalse(val: PromiseLike<any>, msg?: string): ChaiPromise<void>;

    isNotTrue(val: PromiseLike<any>, msg?: string): ChaiPromise<void>;
    isNotFalse(val: PromiseLike<any>, msg?: string): ChaiPromise<void>;

    isNull(val: PromiseLike<any>, msg?: string): ChaiPromise<void>;
    isNotNull(val: PromiseLike<any>, msg?: string): ChaiPromise<void>;

    isNaN(val: PromiseLike<any>, msg?: string): ChaiPromise<void>;
    isNotNaN(val: PromiseLike<any>, msg?: string): ChaiPromise<void>;

    exists(val: PromiseLike<any>, msg?: string): ChaiPromise<void>;
    notExists(val: PromiseLike<any>, msg?: string): ChaiPromise<void>;

    isUndefined(val: PromiseLike<any>, msg?: string): ChaiPromise<void>;
    isDefined(val: PromiseLike<any>, msg?: string): ChaiPromise<void>;

    isFunction(val: PromiseLike<any>, msg?: string): ChaiPromise<void>;
    isNotFunction(val: PromiseLike<any>, msg?: string): ChaiPromise<void>;

    isObject(val: PromiseLike<any>, msg?: string): ChaiPromise<void>;
    isNotObject(val: PromiseLike<any>, msg?: string): ChaiPromise<void>;

    isArray(val: PromiseLike<any>, msg?: string): ChaiPromise<void>;
    isNotArray(val: PromiseLike<any>, msg?: string): ChaiPromise<void>;

    isString(val: PromiseLike<any>, msg?: string): ChaiPromise<void>;
    isNotString(val: PromiseLike<any>, msg?: string): ChaiPromise<void>;

    isNumber(val: PromiseLike<any>, msg?: string): ChaiPromise<void>;
    isNotNumber(val: PromiseLike<any>, msg?: string): ChaiPromise<void>;
    isFinite(val: PromiseLike<number>, msg?: string): ChaiPromise<void>;

    isBoolean(val: PromiseLike<any>, msg?: string): ChaiPromise<void>;
    isNotBoolean(val: PromiseLike<any>, msg?: string): ChaiPromise<void>;

    typeOf(val: PromiseLike<any>, type: string, msg?: string): ChaiPromise<void>;
    notTypeOf(val: PromiseLike<any>, type: string, msg?: string): ChaiPromise<void>;

    instanceOf(val: PromiseLike<any>, type: Function, msg?: string): ChaiPromise<void>;
    notInstanceOf(val: PromiseLike<any>, type: Function, msg?: string): ChaiPromise<void>;

    include(exp: PromiseLike<string>, inc: any, msg?: string): ChaiPromise<void>;
    include(exp: PromiseLike<any[]>, inc: any, msg?: string): ChaiPromise<void>;

    notInclude(exp: PromiseLike<string>, inc: any, msg?: string): ChaiPromise<void>;
    notInclude(exp: PromiseLike<any[]>, inc: any, msg?: string): ChaiPromise<void>;

    deepInclude(exp: PromiseLike<string>, inc: any, msg?: string): ChaiPromise<void>;
    deepInclude(exp: PromiseLike<any[]>, inc: any, msg?: string): ChaiPromise<void>;

    notDeepInclude(exp: PromiseLike<string>, inc: any, msg?: string): ChaiPromise<void>;
    notDeepInclude(exp: PromiseLike<any[]>, inc: any, msg?: string): ChaiPromise<void>;

    nestedInclude(exp: PromiseLike<Object>, inc: Object, msg?: string): ChaiPromise<void>;
    notNestedInclude(exp: PromiseLike<Object>, inc: Object, msg?: string): ChaiPromise<void>;

    deepNestedInclude(exp: PromiseLike<Object>, inc: Object, msg?: string): ChaiPromise<void>;
    notDeepNestedInclude(exp: PromiseLike<Object>, inc: Object, msg?: string): ChaiPromise<void>;

    ownInclude(exp: PromiseLike<Object>, inc: Object, msg?: string): ChaiPromise<void>;
    notOwnInclude(exp: PromiseLike<Object>, inc: Object, msg?: string): ChaiPromise<void>;

    deepOwnInclude(exp: PromiseLike<Object>, inc: Object, msg?: string): ChaiPromise<void>;
    notDeepOwnInclude(exp: PromiseLike<Object>, inc: Object, msg?: string): ChaiPromise<void>;

    match(exp: PromiseLike<any>, re: RegExp, msg?: string): ChaiPromise<void>;
    notMatch(exp: PromiseLike<any>, re: RegExp, msg?: string): ChaiPromise<void>;

    property(obj: PromiseLike<Object>, prop: string, msg?: string): ChaiPromise<void>;
    notProperty(obj: PromiseLike<Object>, prop: string, msg?: string): ChaiPromise<void>;
    deepProperty(obj: PromiseLike<Object>, prop: string, msg?: string): ChaiPromise<void>;
    notDeepProperty(obj: PromiseLike<Object>, prop: string, msg?: string): ChaiPromise<void>;

    propertyVal(obj: PromiseLike<Object>, prop: string, val: any, msg?: string): ChaiPromise<void>;
    propertyNotVal(obj: PromiseLike<Object>, prop: string, val: any, msg?: string): ChaiPromise<void>;

    deepPropertyVal(obj: PromiseLike<Object>, prop: string, val: any, msg?: string): ChaiPromise<void>;
    deepPropertyNotVal(obj: PromiseLike<Object>, prop: string, val: any, msg?: string): ChaiPromise<void>;

    nestedProperty(obj: PromiseLike<object>, prop: string, msg?: string): ChaiPromise<void>;
    notNestedProperty(obj: PromiseLike<object>, prop: string, msg?: string): ChaiPromise<void>;
    nestedPropertyVal(obj: PromiseLike<object>, prop: string, val: any, msg?: string): ChaiPromise<void>;
    notNestedPropertyVal(obj: PromiseLike<object>, prop: string, val: any, msg?: string): ChaiPromise<void>;

    deepNestedPropertyVal(obj: PromiseLike<object>, prop: string, val: any, msg?: string): ChaiPromise<void>;
    notDeepNestedPropertyVal(obj: PromiseLike<object>, prop: string, val: any, msg?: string): ChaiPromise<void>;

    lengthOf(exp: PromiseLike<any>, len: number, msg?: string): ChaiPromise<void>;

    hasAnyKeys(obj: PromiseLike<any>, keys: any[], msg?: string): ChaiPromise<void>;
    hasAnyKeys(obj: PromiseLike<any>, keys: object, msg?: string): ChaiPromise<void>;

    hasAllKeys(obj: PromiseLike<any>, keys: any[], msg?: string): ChaiPromise<void>;
    hasAllKeys(obj: PromiseLike<any>, keys: object, msg?: string): ChaiPromise<void>;

    containsAllKeys(obj: PromiseLike<any>, keys: any[], msg?: string): ChaiPromise<void>;
    containsAllKeys(obj: PromiseLike<any>, keys: object, msg?: string): ChaiPromise<void>;

    doesNotHaveAnyKeys(obj: PromiseLike<any>, keys: any[], msg?: string): ChaiPromise<void>;
    doesNotHaveAnyKeys(obj: PromiseLike<any>, keys: object, msg?: string): ChaiPromise<void>;

    doesNotHaveAllKeys(obj: PromiseLike<any>, keys: any[], msg?: string): ChaiPromise<void>;
    doesNotHaveAllKeys(obj: PromiseLike<any>, keys: object, msg?: string): ChaiPromise<void>;

    hasAnyDeepKeys(obj: PromiseLike<any>, keys: any[], msg?: string): ChaiPromise<void>;
    hasAnyDeepKeys(obj: PromiseLike<any>, keys: object, msg?: string): ChaiPromise<void>;

    hasAllDeepKeys(obj: PromiseLike<any>, keys: any[], msg?: string): ChaiPromise<void>;
    hasAllDeepKeys(obj: PromiseLike<any>, keys: object, msg?: string): ChaiPromise<void>;

    containsAllDeepKeys(obj: PromiseLike<any>, keys: any[], msg?: string): ChaiPromise<void>;
    containsAllDeepKeys(obj: PromiseLike<any>, keys: object, msg?: string): ChaiPromise<void>;

    doesNotHaveAnyDeepKeys(obj: PromiseLike<any>, keys: any[], msg?: string): ChaiPromise<void>;
    doesNotHaveAnyDeepKeys(obj: PromiseLike<any>, keys: object, msg?: string): ChaiPromise<void>;

    doesNotHaveAllDeepKeys(obj: PromiseLike<any>, keys: any[], msg?: string): ChaiPromise<void>;
    doesNotHaveAllDeepKeys(obj: PromiseLike<any>, keys: object, msg?: string): ChaiPromise<void>;

    // alias frenzy
    throw(fn: Function, msg?: string): ChaiPromise<void>;
    throw(fn: Function, regExp: RegExp): ChaiPromise<void>;
    throw(fn: Function, errType: Function, msg?: string): ChaiPromise<void>;
    throw(fn: Function, errType: Function, regExp: RegExp): ChaiPromise<void>;

    throws(fn: Function, msg?: string): ChaiPromise<void>;
    throws(fn: Function, regExp: RegExp): ChaiPromise<void>;
    throws(fn: Function, errType: Function, msg?: string): ChaiPromise<void>;
    throws(fn: Function, errType: Function, regExp: RegExp): ChaiPromise<void>;

    Throw(fn: Function, msg?: string): ChaiPromise<void>;
    Throw(fn: Function, regExp: RegExp): ChaiPromise<void>;
    Throw(fn: Function, errType: Function, msg?: string): ChaiPromise<void>;
    Throw(fn: Function, errType: Function, regExp: RegExp): ChaiPromise<void>;

    doesNotThrow(fn: Function, msg?: string): ChaiPromise<void>;
    doesNotThrow(fn: Function, regExp: RegExp): ChaiPromise<void>;
    doesNotThrow(fn: Function, errType: Function, msg?: string): ChaiPromise<void>;
    doesNotThrow(fn: Function, errType: Function, regExp: RegExp): ChaiPromise<void>;

    operator(val: PromiseLike<any>, operator: string, val2: any, msg?: string): ChaiPromise<void>;
    closeTo(act: PromiseLike<number>, exp: number, delta: number, msg?: string): ChaiPromise<void>;
    approximately(act: PromiseLike<number>, exp: number, delta: number, msg?: string): ChaiPromise<void>;

    sameMembers(set1: PromiseLike<any[]>, set2: any[], msg?: string): ChaiPromise<void>;
    sameDeepMembers(set1: PromiseLike<any[]>, set2: any[], msg?: string): ChaiPromise<void>;
    sameOrderedMembers(set1: PromiseLike<any[]>, set2: any[], msg?: string): ChaiPromise<void>;
    notSameOrderedMembers(set1: PromiseLike<any[]>, set2: any[], msg?: string): ChaiPromise<void>;
    sameDeepOrderedMembers(set1: PromiseLike<any[]>, set2: any[], msg?: string): ChaiPromise<void>;
    notSameDeepOrderedMembers(set1: PromiseLike<any[]>, set2: any[], msg?: string): ChaiPromise<void>;
    includeOrderedMembers(set1: PromiseLike<any[]>, set2: any[], msg?: string): ChaiPromise<void>;
    notIncludeOrderedMembers(set1: PromiseLike<any[]>, set2: any[], msg?: string): ChaiPromise<void>;
    includeDeepOrderedMembers(set1: PromiseLike<any[]>, set2: any[], msg?: string): ChaiPromise<void>;
    notIncludeDeepOrderedMembers(set1: PromiseLike<any[]>, set2: any[], msg?: string): ChaiPromise<void>;
    includeMembers(set1: PromiseLike<any[]>, set2: any[], msg?: string): ChaiPromise<void>;
    includeDeepMembers(set1: PromiseLike<any[]>, set2: any[], msg?: string): ChaiPromise<void>;

    oneOf(val: PromiseLike<any>, list: any[], msg?: string): ChaiPromise<void>;

    changes(modifier: Function, obj: Object, property: string, msg?: string): ChaiPromise<void>;
    changesBy(modifier: Function, obj: object, property: string, change: number, msg?: string): ChaiPromise<void>;
    doesNotChange(modifier: Function, obj: Object, property: string, msg?: string): ChaiPromise<void>;
    changesButNotBy(
      modifier: Function,
      obj: object,
      property: string,
      change: number,
      msg?: string,
    ): ChaiPromise<void>;
    increases(modifier: Function, obj: Object, property: string, msg?: string): ChaiPromise<void>;
    increasesBy(modifier: Function, obj: Object, property: string, change: number, msg?: string): ChaiPromise<void>;
    doesNotIncrease(modifier: Function, obj: Object, property: string, msg?: string): ChaiPromise<void>;
    increasesButNotBy(
      modifier: Function,
      obj: Object,
      property: string,
      change: number,
      msg?: string,
    ): ChaiPromise<void>;
    decreases(modifier: Function, obj: Object, property: string, msg?: string): ChaiPromise<void>;
    decreasesBy(modifier: Function, obj: Object, property: string, change: number, msg?: string): ChaiPromise<void>;
    doesNotDecrease(modifier: Function, obj: Object, property: string, msg?: string): ChaiPromise<void>;
    decreasesButNotBy(
      modifier: Function,
      obj: Object,
      property: string,
      change: number,
      msg?: string,
    ): ChaiPromise<void>;

    ifError(val: PromiseLike<any>, msg?: string): ChaiPromise<void>;

    isExtensible(obj: PromiseLike<Object>, msg?: string): ChaiPromise<void>;
    isNotExtensible(obj: PromiseLike<Object>, msg?: string): ChaiPromise<void>;

    isSealed(obj: PromiseLike<Object>, msg?: string): ChaiPromise<void>;
    sealed(obj: PromiseLike<Object>, msg?: string): ChaiPromise<void>;
    isNotSealed(obj: PromiseLike<Object>, msg?: string): ChaiPromise<void>;
    notSealed(obj: PromiseLike<Object>, msg?: string): ChaiPromise<void>;

    isFrozen(obj: PromiseLike<Object>, msg?: string): ChaiPromise<void>;
    frozen(obj: PromiseLike<Object>, msg?: string): ChaiPromise<void>;
    isNotFrozen(obj: PromiseLike<Object>, msg?: string): ChaiPromise<void>;
    notFrozen(obj: PromiseLike<Object>, msg?: string): ChaiPromise<void>;

    isEmpty(val: PromiseLike<any>, msg?: string): ChaiPromise<void>;
    isNotEmpty(val: PromiseLike<any>, msg?: string): ChaiPromise<void>;
  }
}
