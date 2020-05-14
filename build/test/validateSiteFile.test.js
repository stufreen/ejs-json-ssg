"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var test_site_json_1 = __importDefault(require("./test-site.json"));
var validateSiteFile_1 = require("../validateSiteFile");
describe('isString', function () {
    it('returns false if you pass in a number', function () {
        expect(validateSiteFile_1.isString(1)).toBe(false);
    });
    it('returns false if you pass in null', function () {
        expect(validateSiteFile_1.isString(null)).toBe(false);
    });
    it('returns false if you pass in undefined', function () {
        expect(validateSiteFile_1.isString(undefined)).toBe(false);
    });
    it('returns true if you pass in regular string', function () {
        expect(validateSiteFile_1.isString('hello')).toBe(true);
    });
    it('returns true if you pass in empty string', function () {
        expect(validateSiteFile_1.isString('')).toBe(true);
    });
});
describe('isFieldObject', function () {
    it('throws if you pass in null', function () {
        expect(function () {
            validateSiteFile_1.isFieldObject(null);
        }).toThrow();
    });
    it('throws if you pass in undefined', function () {
        expect(function () {
            validateSiteFile_1.isFieldObject(undefined);
        }).toThrow();
    });
    it('returns true if you pass in an empty object', function () {
        expect(validateSiteFile_1.isFieldObject({})).toBe(true);
    });
    it('returns true if you pass in an object with an valid field property', function () {
        expect(validateSiteFile_1.isFieldObject({
            someField: 'a string',
            anotherField: 123,
        })).toBe(true);
    });
});
describe('isMetaObject', function () {
    it('throws if you pass in an array', function () {
        expect(function () {
            validateSiteFile_1.isMetaObject(['foo']);
        }).toThrow();
    });
    it("throws if you pass in a property that's a number", function () {
        expect(function () {
            validateSiteFile_1.isMetaObject({
                title: 1234,
            });
        }).toThrow();
    });
    it('throws if you pass in a primitive', function () {
        expect(function () {
            validateSiteFile_1.isMetaObject(4321);
        }).toThrow();
        expect(function () {
            validateSiteFile_1.isMetaObject('testo');
        }).toThrow();
    });
    it('returns true if you pass in a map of strings', function () {
        expect(validateSiteFile_1.isMetaObject({
            key: 'val',
            foo: 'bar',
        })).toBe(true);
    });
});
describe('isSiteNode', function () {
    it('throws if missing a slug', function () {
        expect(function () {
            validateSiteFile_1.isSiteNode({
                template: 'post',
                visible: true,
                meta: {
                    title: 'Post One',
                },
                fields: {
                    header: 'Post One',
                    content: 'This is the first post',
                },
                children: [],
            });
        }).toThrow();
    });
    it('throws if slug is a number', function () {
        expect(function () {
            validateSiteFile_1.isSiteNode({
                slug: 1,
                template: 'post',
                visible: true,
                meta: {
                    title: 'Post One',
                },
                fields: {
                    header: 'Post One',
                    content: 'This is the first post',
                },
                children: [],
            });
        }).toThrow();
    });
    it('throws if template is missing', function () {
        expect(function () {
            validateSiteFile_1.isSiteNode({
                slug: 'foo',
                meta: {
                    title: 'Post One',
                },
                fields: {
                    header: 'Post One',
                    content: 'This is the first post',
                },
                children: [],
            });
        }).toThrow();
    });
    it('throws if template is not a string', function () {
        expect(function () {
            validateSiteFile_1.isSiteNode({
                slug: 'foo',
                template: 9999,
                visible: true,
                meta: {
                    title: 'Post One',
                },
                fields: {
                    header: 'Post One',
                    content: 'This is the first post',
                },
                children: [],
            });
        }).toThrow();
    });
    it('throws if visible is not a boolean', function () {
        expect(function () {
            validateSiteFile_1.isSiteNode({
                slug: 'foo',
                template: 'cool',
                visible: 'true',
                meta: {
                    title: 'Post One',
                },
                fields: {
                    header: 'Post One',
                    content: 'This is the first post',
                },
                children: [],
            });
        }).toThrow();
    });
    it('throws if meta is not a meta object', function () {
        expect(function () {
            validateSiteFile_1.isSiteNode({
                slug: 'foo',
                template: 'cool',
                visible: true,
                meta: 'not a meta',
                fields: {
                    header: 'Post One',
                    content: 'This is the first post',
                },
                children: [],
            });
        }).toThrow();
    });
    it('throws if fields is not a field object', function () {
        expect(function () {
            validateSiteFile_1.isSiteNode({
                slug: 'foo',
                template: 'cool',
                visible: true,
                meta: {
                    title: 'Post One',
                },
                fields: false,
                children: [],
            });
        }).toThrow();
    });
    it('throws if children is not an array', function () {
        expect(function () {
            validateSiteFile_1.isSiteNode({
                slug: 'foo',
                template: 'cool',
                visible: true,
                meta: {
                    title: 'Post One',
                },
                fields: false,
                children: {},
            });
        }).toThrow();
    });
    it('returns true if you pass in a valid file', function () {
        expect(validateSiteFile_1.isSiteNode(test_site_json_1.default)).toBe(true);
    });
});
