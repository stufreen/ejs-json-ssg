import { SiteNode, SiteNodeWithPath } from './types';

export function attachPath(
  node: SiteNode,
  parentPath: string
): SiteNodeWithPath {
  const nodePath = `${parentPath}${node.slug}/`;

  const childrenWithPaths = node.children.map((childNode) => {
    return attachPath(childNode, nodePath);
  });

  const nodeWithPath: SiteNodeWithPath = {
    ...node,
    path: nodePath,
    children: childrenWithPaths,
  };

  return nodeWithPath;
}

export default function attachPaths(siteNode: SiteNode): SiteNodeWithPath {
  return attachPath(siteNode, '');
}
