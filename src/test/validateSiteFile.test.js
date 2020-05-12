import { isString } from '../validateSiteFile';

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
