import { isString, isFieldObject } from '../validateSiteFile';

const mockField = {
  type: 'text',
  value: 'bookTitle',
};

describe('isString', () => {
  it('returns false if you pass in a number', () => {
    expect(isString(1)).toBe(false);
  });

  it('returns false if you pass in null', () => {
    expect(isString(null)).toBe(false);
  });

  it('returns false if you pass in undefined', () => {
    expect(isString(undefined)).toBe(false);
  });

  it('returns true if you pass in regular string', () => {
    expect(isString('hello')).toBe(true);
  });

  it('returns true if you pass in empty string', () => {
    expect(isString('')).toBe(true);
  });
});

describe('isFieldObject', () => {
  it('returns false if you pass in null', () => {
    expect(isFieldObject(null)).toBe(false);
  });

  it('returns false if you pass in undefined', () => {
    expect(isFieldObject(undefined)).toBe(false);
  });

  it('returns true if you pass in an empty object', () => {
    expect(isFieldObject({})).toBe(true);
  });

  it('returns false if you pass in an object with a string property', () => {
    expect(
      isFieldObject({
        foo: 'bar',
      })
    ).toBe(false);
  });

  it('returns false if you pass in an object with an empty object property', () => {
    expect(
      isFieldObject({
        foo: {},
      })
    ).toBe(false);
  });

  it('returns true if you pass in an object with an valid field property', () => {
    expect(
      isFieldObject({
        someField: mockField,
      })
    ).toBe(true);
  });
});
