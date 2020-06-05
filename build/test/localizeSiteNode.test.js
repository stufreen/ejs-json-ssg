"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var localizeSiteNode_1 = require("../localizeSiteNode");
describe('localizeString', function () {
    test('converts a simple string', function () {
        var tree = { someVal: 'hello' };
        expect(localizeSiteNode_1.localizeString('someVal', tree)).toStrictEqual('hello');
    });
    test('traverses the an object tree for a value', function () {
        var tree = { top: { middle: { bottom: 'foo' } } };
        expect(localizeSiteNode_1.localizeString('top.middle.bottom', tree)).toStrictEqual('foo');
    });
    test('traverses arrays', function () {
        var tree = {
            outer: { inner: [{ someVal: 'bloop' }, { someVal: 'blop' }] },
        };
        expect(localizeSiteNode_1.localizeString('outer.inner.1.someVal', tree)).toStrictEqual('blop');
    });
});
describe('localizeArray', function () {
    test('converts an array of strings', function () {
        var input = ['foo.bar', 'foo.baz', 'foo.bam'];
        var tree = {
            foo: {
                bar: 'one',
                baz: 'two',
                bam: 'three',
            },
        };
        expect(localizeSiteNode_1.localizeArray(input, tree)).toStrictEqual(['one', 'two', 'three']);
    });
    test('converts a mixed array of strings and numbers', function () {
        var input = ['foo.bar', 2, 'foo.bam'];
        var tree = {
            foo: {
                bar: 'one',
                baz: 'two',
                bam: 'three',
            },
        };
        expect(localizeSiteNode_1.localizeArray(input, tree)).toStrictEqual(['one', 2, 'three']);
    });
});
describe('localizeObject', function () {
    test('converts an object of strings', function () {
        var input = { field1: 'foo.bar', field2: 'foo.baz' };
        var tree = {
            foo: {
                bar: 'one',
                baz: 'two',
            },
        };
        expect(localizeSiteNode_1.localizeObject(input, tree)).toStrictEqual({
            field1: 'one',
            field2: 'two',
        });
    });
    test('converts a mixed object of strings and numbers', function () {
        var input = { field1: 'foo.bar', field2: 2 };
        var tree = {
            foo: {
                bar: 'one',
            },
        };
        expect(localizeSiteNode_1.localizeObject(input, tree)).toStrictEqual({
            field1: 'one',
            field2: 2,
        });
    });
    test('handles multiple layers of objects', function () {
        var input = {
            header: {
                title: 'CoolComponent.title',
                description: 'CoolComponent.description',
            },
        };
        var tree = {
            CoolComponent: {
                title: 'My title',
                description: 'My description',
            },
        };
        expect(localizeSiteNode_1.localizeObject(input, tree)).toStrictEqual({
            header: {
                title: 'My title',
                description: 'My description',
            },
        });
    });
});
describe('localizeUnknown', function () {
    test('localizes a string', function () {
        expect(localizeSiteNode_1.localizeUnknown('theKey', { theKey: 'woop' })).toStrictEqual('woop');
    });
    test('localizes an array', function () {
        var input = ['foo.bar', 'foo.baz'];
        var tree = {
            foo: {
                bar: 'one',
                baz: 'two',
            },
        };
        expect(localizeSiteNode_1.localizeUnknown(input, tree)).toStrictEqual(['one', 'two']);
    });
    test('localizes an object', function () {
        var input = { field1: 'foo.bar', field2: 'foo.baz' };
        var tree = {
            foo: {
                bar: 'one',
                baz: 'two',
            },
        };
        expect(localizeSiteNode_1.localizeUnknown(input, tree)).toStrictEqual({
            field1: 'one',
            field2: 'two',
        });
    });
});
