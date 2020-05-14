import { SiteNode, SiteNodeWithPath } from './types';

function attachPath(node: SiteNode, parentPath: string): SiteNodeWithPath {
  const nodeWithPath = {
    ...node,
    path: `${parentPath}${node.slug}/`,
  };

  if (nodeWithPath.children) {
    nodeWithPath.children = nodeWithPath.children.map((childNode) => {
      return attachPath(childNode, nodeWithPath.path);
    });
  }

  return nodeWithPath;
}

export default function attachPaths(siteNode: SiteNode): SiteNodeWithPath {
  return attachPath(siteNode, '');
}
