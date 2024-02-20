import * as chaiPromise from '../src/chai-promised';
import { changeTransformAsserterArgs } from '../src/chai-promised';

describe("Configuring the way in which asserter arguments are transformed", () => {
    let originalTransformAsserterArgs: Function;

    beforeEach(() => {
        originalTransformAsserterArgs = chaiPromise.changeTransformAsserterArgs( Promise.all.bind(Promise));
    });

    afterEach(() => {
        // @ts-ignore
        chaiPromise.changeTransformAsserterArgs(originalTransformAsserterArgs);
    });

    it("should override transformAsserterArgs and allow to compare promises", () => {
        const value = "test it";

        return Promise.resolve(value).should.eventually.equal(Promise.resolve(value));
    });

    it("should override transformAsserterArgs and wait until all promises are resolved", () => {
        return Promise.resolve(5).should.eventually.be.within(Promise.resolve(3), Promise.resolve(6));
    });

    it("should not invoke transformAsserterArgs for chai properties", () => {
        chaiPromise.changeTransformAsserterArgs( () => {
            throw new Error("transformAsserterArgs should not be called for chai properties");
        });

        return Promise.resolve(true).should.eventually.be.true;
    });

    it("should transform asserter args", () => {
        chaiPromise.changeTransformAsserterArgs( (args: Iterable<unknown> | ArrayLike<unknown>) => {
            return Array.from(args).map((x: any) => x + 1);
        });

        return Promise.resolve(3).should.eventually.equal(2);
    });
});
