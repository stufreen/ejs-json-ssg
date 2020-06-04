import {
  localizeString,
  localizeArray,
  localizeObject,
  localizeUnknown,
} from '../localizeSiteNode';

describe('localizeString', () => {
  test('converts a simple string', () => {
    const tree = { someVal: 'hello' };
    expect(localizeString('someVal', tree)).toStrictEqual('hello');
  });

  test('traverses the an object tree for a value', () => {
    const tree = { top: { middle: { bottom: 'foo' } } };
    expect(localizeString('top.middle.bottom', tree)).toStrictEqual('foo');
  });

  test('traverses arrays', () => {
    const tree = {
      outer: { inner: [{ someVal: 'bloop' }, { someVal: 'blop' }] },
    };
    expect(localizeString('outer.inner.1.someVal', tree)).toStrictEqual('blop');
  });
});

describe('localizeArray', () => {
  test('converts an array of strings', () => {
    const input = ['foo.bar', 'foo.baz', 'foo.bam'];
    const tree = {
      foo: {
        bar: 'one',
        baz: 'two',
        bam: 'three',
      },
    };
    expect(localizeArray(input, tree)).toStrictEqual(['one', 'two', 'three']);
  });

  test('converts a mixed array of strings and numbers', () => {
    const input = ['foo.bar', 2, 'foo.bam'];
    const tree = {
      foo: {
        bar: 'one',
        baz: 'two',
        bam: 'three',
      },
    };
    expect(localizeArray(input, tree)).toStrictEqual(['one', 2, 'three']);
  });
});

describe('localizeObject', () => {
  test('converts an object of strings', () => {
    const input = { field1: 'foo.bar', field2: 'foo.baz' };
    const tree = {
      foo: {
        bar: 'one',
        baz: 'two',
      },
    };
    expect(localizeObject(input, tree)).toStrictEqual({
      field1: 'one',
      field2: 'two',
    });
  });

  test('converts a mixed object of strings and numbers', () => {
    const input = { field1: 'foo.bar', field2: 2 };
    const tree = {
      foo: {
        bar: 'one',
      },
    };
    expect(localizeObject(input, tree)).toStrictEqual({
      field1: 'one',
      field2: 2,
    });
  });

  test('handles multiple layers of objects', () => {
    const input = {
      header: {
        title: 'CoolComponent.title',
        description: 'CoolComponent.description',
      },
    };
    const tree = {
      CoolComponent: {
        title: 'My title',
        description: 'My description',
      },
    };
    expect(localizeObject(input, tree)).toStrictEqual({
      header: {
        title: 'My title',
        description: 'My description',
      },
    });
  });
});

describe('localizeUnknown', () => {
  test('localizes a string', () => {
    expect(localizeUnknown('theKey', { theKey: 'woop' })).toStrictEqual('woop');
  });

  test('localizes an array', () => {
    const input = ['foo.bar', 'foo.baz'];
    const tree = {
      foo: {
        bar: 'one',
        baz: 'two',
      },
    };
    expect(localizeUnknown(input, tree)).toStrictEqual(['one', 'two']);
  });

  test('localizes an object', () => {
    const input = { field1: 'foo.bar', field2: 'foo.baz' };
    const tree = {
      foo: {
        bar: 'one',
        baz: 'two',
      },
    };
    expect(localizeUnknown(input, tree)).toStrictEqual({
      field1: 'one',
      field2: 'two',
    });
  });
});
