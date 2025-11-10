import { setTransferPromiseness, chaiPromised } from '../src/chai-promised';

describe("Configuring the way in which promise-ness is transferred", () => {
    it("should return a promise with the custom modifications applied", () => {
        setTransferPromiseness( (assertion: { then: any; isCustomized: boolean; }, promise: Promise<any>) => {
            assertion.then = promise.then.bind(promise);
            assertion.isCustomized = true;
        });

        const promise = Promise.resolve("1234");
        const assertion = promise.should.become("1234");

        assertion.should.have.property("isCustomized", true);
        setTransferPromiseness(null);
    });
});
