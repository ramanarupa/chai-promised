﻿describe "Fulfillment value assertions:", ->
    promise = null

    describe "Direct tests of fulfilled promises", ->
        it ".eventually.equal(42)", (done) ->
            Q.resolve(42).should.eventually.equal(42).notify(done)
        it ".eventually.be.arguments", (done) ->
            Q.resolve(arguments).should.eventually.be.arguments.notify(done)
        it ".eventually.be.empty", (done) ->
            Q.resolve([]).should.eventually.be.empty.notify(done)
        it ".eventually.exist", (done) ->
            Q.resolve(true).should.eventually.exist.notify(done)
        it ".eventually.be.false", (done) ->
            Q.resolve(false).should.eventually.be.false.notify(done)
        it ".eventually.be.ok", (done) ->
            Q.resolve({}).should.eventually.be.ok.notify(done)
        it ".eventually.be.true", (done) ->
            Q.resolve(true).should.eventually.be.true.notify(done)
        it ".become(true)", (done) ->
            Q.resolve(true).should.become(true).notify(done)

    describe "Chaining", ->
        it ".eventually.be.ok.and.equal(42)", (done) ->
            Q.resolve(42).should.eventually.be.ok.and.equal(42).notify(done)
        it ".rejected.and.notify(done)", (done) ->
            Q.reject().should.be.rejected.and.notify(done)
        it ".fulfilled.and.notify(done)", (done) ->
            Q.resolve().should.be.fulfilled.and.notify(done)

    describe "On a promise fulfilled with the number 42", ->
        beforeEach ->
            promise = Q.resolve(42)

        describe ".eventually.equal(42)", ->
            shouldPass -> promise.should.eventually.equal(42)
        describe ".eventually.eql(42)", ->
            shouldPass -> promise.should.eventually.eql(42)
        describe ".eventually.be.below(9000)", ->
            shouldPass -> promise.should.eventually.be.below(9000)

        describe ".eventually.be.an.instanceOf(String)", ->
            shouldFail -> promise.should.eventually.be.an.instanceOf(String)
        describe ".eventually.be.false", ->
            shouldFail -> promise.should.eventually.be.false


        describe ".eventually.not.equal(52)", ->
            shouldPass -> promise.should.eventually.not.equal(52)
        describe ".not.eventually.equal(52)", ->
            shouldPass -> promise.should.not.eventually.equal(52)

        describe ".eventually.not.equal(42)", ->
            shouldFail -> promise.should.eventually.not.equal(42)
        describe ".not.eventually.equal(42)", ->
            shouldFail -> promise.should.not.eventually.equal(42)

        describe ".become(42)", ->
            shouldPass -> promise.should.become(42)
        describe ".become(52)", ->
            shouldFail -> promise.should.become(52)

        describe ".not.become(42)", ->
            shouldFail -> promise.should.not.become(42)
        describe ".not.become(52)", ->
            shouldPass -> promise.should.not.become(52)

    describe "On a promise fulfilled with { foo: 'bar' }", ->
        beforeEach ->
            promise = Q.resolve(foo: "bar")

        describe ".eventually.equal({ foo: 'bar' })", ->
            shouldFail -> promise.should.eventually.equal(foo: "bar")
        describe ".eventually.eql({ foo: 'bar' })", ->
            shouldPass -> promise.should.eventually.eql(foo: "bar")
        describe ".become({ foo: 'bar' })", ->
            shouldPass -> promise.should.become(foo: "bar")
        describe ".not.become({ foo: 'bar' })", ->
            shouldFail -> promise.should.not.become(foo: "bar")