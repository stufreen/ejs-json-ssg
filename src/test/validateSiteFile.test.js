import testSite from './test-site.json';
import {
  isString,
  isFieldObject,
  isMetaObject,
  isSiteNode,
} from '../validateSiteFile';

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
  it('throws if you pass in null', () => {
    expect(() => {
      isFieldObject(null);
    }).toThrow();
  });

  it('throws if you pass in undefined', () => {
    expect(() => {
      isFieldObject(undefined);
    }).toThrow();
  });

  it('returns true if you pass in an empty object', () => {
    expect(isFieldObject({})).toBe(true);
  });

  it('returns true if you pass in an object with an valid field property', () => {
    expect(
      isFieldObject({
        someField: 'a string',
        anotherField: 123,
      })
    ).toBe(true);
  });
});

describe('isMetaObject', () => {
  it('throws if you pass in an array', () => {
    expect(() => {
      isMetaObject(['foo']);
    }).toThrow();
  });

  it("throws if you pass in a property that's a number", () => {
    expect(() => {
      isMetaObject({
        title: 1234,
      });
    }).toThrow();
  });

  it('throws if you pass in a primitive', () => {
    expect(() => {
      isMetaObject(4321);
    }).toThrow();
    expect(() => {
      isMetaObject('testo');
    }).toThrow();
  });

  it('returns true if you pass in a map of strings', () => {
    expect(
      isMetaObject({
        key: 'val',
        foo: 'bar',
      })
    ).toBe(true);
  });
});

describe('isSiteNode', () => {
  it('throws if missing a slug', () => {
    expect(() => {
      isSiteNode({
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

  it('throws if slug is a number', () => {
    expect(() => {
      isSiteNode({
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

  it('throws if template is missing', () => {
    expect(() => {
      isSiteNode({
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

  it('throws if template is not a string', () => {
    expect(() => {
      isSiteNode({
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

  it('throws if visible is not a boolean', () => {
    expect(() => {
      isSiteNode({
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

  it('throws if meta is not a meta object', () => {
    expect(() => {
      isSiteNode({
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

  it('throws if fields is not a field object', () => {
    expect(() => {
      isSiteNode({
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

  it('throws if children is not an array', () => {
    expect(() => {
      isSiteNode({
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

  it('returns true if you pass in a valid file', () => {
    expect(isSiteNode(testSite)).toBe(true);
  });
});
