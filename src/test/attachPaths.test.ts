import attachPaths, { attachPath } from '../attachPaths';

describe('attachPaths', () => {
  it('attaches a path to a single node based on slug', () => {
    const mockNode = {
      slug: 'foo',
      children: [],
    } as any;
    expect(attachPaths(mockNode).path).toStrictEqual('foo/');
  });

  it('sets a path of "/" for root level node', () => {
    const mockNode = {
      slug: '',
      children: [],
    } as any;
    expect(attachPaths(mockNode).path).toStrictEqual('/');
  });
});

describe('attachPath', () => {
  it('attaches a path to a single node based on parentPath + slug', () => {
    const mockNode = {
      slug: 'foo',
      children: [],
    } as any;
    expect(attachPath(mockNode, 'bar/').path).toStrictEqual('bar/foo/');
  });

  it('attaches a "/" to the end of a root path', () => {
    const mockNode = {
      slug: 'foo',
      children: [],
    } as any;
    expect(attachPath(mockNode, '').path).toStrictEqual('foo/');
  });

  it('handles child nodes', () => {
    const mockNode = {
      slug: '',
      children: [
        {
          slug: 'bar',
          children: [],
        },
        {
          slug: 'bam',
          children: [
            {
              slug: 'chip',
              children: [],
            },
            {
              slug: 'chop',
              children: [],
            },
          ],
        },
        {
          slug: 'bim',
          children: [],
        },
      ],
    } as any;
    const result = attachPath(mockNode, '');
    expect(result.path).toStrictEqual('/');
    expect(result.children[0].path).toStrictEqual('/bar/');
    expect(result.children[1].path).toStrictEqual('/bam/');
    expect(result.children[2].path).toStrictEqual('/bim/');
    expect(result.children[1].children[0].path).toStrictEqual('/bam/chip/');
    expect(result.children[1].children[1].path).toStrictEqual('/bam/chop/');
  });
});
