import { chaiPromised } from '../src/chai-promised';
import * as chai from 'chai';

function newMethod() {
    // Do nothing
}

function newMethodChain(this: any){
    /* eslint-disable no-invalid-this */
    return this.assert(this._obj.__property === true);
    /* eslint-enable no-invalid-this */
}

function makeFunction() {
    function fn() {
        // Do nothing
    }
    fn.__property = true;
    return fn;
}

chai.use(ctx => {
    ctx.Assertion.addChainableMethod("newMethod", newMethod, newMethodChain);
});

describe("New method `newMethod` added to chai", () => {
    describe("before executing chai.use(chaiAsPromised)", () => {
        it("should work", () => {
            // @ts-ignore
            chai.expect(makeFunction()).to.have.been.newMethod();
        });
    });

    describe("after executing chai.use(chaiAsPromised)", () => {
        before(() => {
            chai.use(chaiPromised);
        });

        it("should still work", () => {
            // @ts-ignore
            chai.expect(makeFunction()).to.have.been.newMethod();
        });
    });
});
