
export const shouldPass = (promiseProducer: () => any) => {
    it("should return a fulfilled promise", done => {
        promiseProducer().then(
            () => done(),
          (reason: any) => done(new Error(`Expected promise to be fulfilled but it was rejected with ${reason.stack}`))
        );
    });
};

export const shouldFail = (options: { op: Function; message?: string; notMessage?: any; }) => {
    const promiseProducer = options.op;
    const desiredMessageSubstring = options.message;
    const nonDesiredMessageSubstring = options.notMessage;

    it("should return a promise rejected with an assertion error", done => {
        promiseProducer().then(
            () => {
                throw new Error("Expected promise to be rejected with an assertion error, but it was fulfilled");
            },
            (reason: { constructor: { name: string; }; message: string | any[]; }) => {
                if (Object(reason) !== reason || reason.constructor.name !== "AssertionError") {
                    throw new Error(`Expected promise to be rejected with an AssertionError but it was rejected ` +
                                    `with ${reason}`);
                }

                if (desiredMessageSubstring && !reason.message.includes(desiredMessageSubstring)) {
                    throw new Error(`Expected promise to be rejected with an AssertionError containing ` +
                                    `"${desiredMessageSubstring}" but it was rejected with ${reason}`);
                }

                if (nonDesiredMessageSubstring && reason.message.includes(nonDesiredMessageSubstring)) {
                    throw new Error(`Expected promise to be rejected with an AssertionError not containing ` +
                                    `"${nonDesiredMessageSubstring}" but it was rejected with ${reason}`);
                }
            }
        ).then(done, done);
    });
};
