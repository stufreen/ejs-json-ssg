"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validateSiteFile_1 = require("../validateSiteFile");
var mockField = {
    type: 'text',
    value: 'bookTitle',
};
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
    it('returns false if you pass in null', function () {
        expect(validateSiteFile_1.isFieldObject(null)).toBe(false);
    });
    it('returns false if you pass in undefined', function () {
        expect(validateSiteFile_1.isFieldObject(undefined)).toBe(false);
    });
    it('returns true if you pass in an empty object', function () {
        expect(validateSiteFile_1.isFieldObject({})).toBe(true);
    });
    it('returns false if you pass in an object with a string property', function () {
        expect(validateSiteFile_1.isFieldObject({
            foo: 'bar',
        })).toBe(false);
    });
    it('returns false if you pass in an object with an empty object property', function () {
        expect(validateSiteFile_1.isFieldObject({
            foo: {},
        })).toBe(false);
    });
    it('returns true if you pass in an object with an valid field property', function () {
        expect(validateSiteFile_1.isFieldObject({
            someField: mockField,
        })).toBe(true);
    });
});
