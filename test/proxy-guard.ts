import * as chai from "chai";
function shouldGuard(fn: Function, msg: string, op?: string) {
    if (op)
        fn.should.throw(`Invalid Chai property: ${op}.${msg}. See docs for proper usage of "${op}"`);
    else
        fn.should.throw(`Invalid Chai property: ${msg}`);
}

describe("Proxy guard", () => {
    const number = 42;
    const promise = Promise.resolve(42);

    before(function () {
        if (typeof Proxy === "undefined" || typeof Reflect === "undefined" || chai.util.proxify === undefined) {
            /* eslint-disable no-invalid-this */
            this.skip();
            /* eslint-enable no-invalid-this */
        }
    });

    it("should guard against invalid property following `.should`", () => {
        // @ts-ignore
        shouldGuard(() => number.should.pizza, "pizza", '');
    });

    it("should guard against invalid property following overwritten language chain", () => {
        // @ts-ignore
        shouldGuard(() => number.should.to.pizza, 'to.pizza. See docs for proper usage of "to"');
    });

    it("should guard against invalid property following overwritten property assertion", () => {
        // @ts-ignore
        shouldGuard(() => number.should.ok.pizza, 'ok.pizza. See docs for proper usage of "ok"');
    });

    it("should guard against invalid property following uncalled overwritten method assertion", () => {
        // @ts-ignore
        shouldGuard(() => number.should.equal.pizza, "equal.pizza. See docs");
    });

    it("should guard against invalid property following called overwritten method assertion", () => {
        // @ts-ignore
        shouldGuard(() => number.should.equal(number).pizza, "pizza");
    });

    it("should guard against invalid property following uncalled overwritten chainable method assertion", () => {
        // @ts-ignore
        shouldGuard(() => number.should.a.pizza, "pizza");
    });

    it("should guard against invalid property following called overwritten chainable method assertion", () => {
        // @ts-ignore
        shouldGuard(() => number.should.a("number").pizza, "pizza");
    });

    it("should guard against invalid property following `.eventually`", () => {
        // @ts-ignore
        shouldGuard(() => promise.should.eventually.pizza, "pizza", 'eventually');
    });

    it("should guard against invalid property following `.fulfilled`", () => {
        // @ts-ignore
        shouldGuard(() => promise.should.fulfilled.pizza, "pizza", 'fulfilled');
    });

    it("should guard against invalid property following `.rejected`", () => {
        // @ts-ignore
        shouldGuard(() => promise.should.rejected.pizza, "pizza", 'rejected');
    });

    it("should guard against invalid property following called `.rejectedWith`", () => {
        // @ts-ignore
        shouldGuard(() => promise.should.rejectedWith(42).pizza, "pizza");
    });

    it("should guard against invalid property following uncalled `.rejectedWith`", () => {
        // @ts-ignore
        shouldGuard(() => promise.should.rejectedWith.pizza, "rejectedWith.pizza. See docs");
    });

    it("should guard against invalid property following called `.become`", () => {
        // @ts-ignore
        shouldGuard(() => promise.should.become(42).pizza, "pizza", 'deep');
    });

    it("should guard against invalid property following uncalled `.become`", () => {
        // @ts-ignore
        shouldGuard(() => promise.should.become.pizza, "become.pizza. See docs");
    });
});
