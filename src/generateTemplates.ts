import * as ejs from 'ejs';
import { access, mkdir, constants, promises } from 'fs';

import { SiteNodeWithPath, TemplateMap, SiteNode } from './types';
import logger from './logger';
import path from 'path';
import findTemplates from './findTemplates';

interface GenerateTemplates {
  rootNode: SiteNodeWithPath;
  templateDir: string;
  outputDir: string;
  contentDir: string;
}

interface CompilePage {
  siteNode: SiteNodeWithPath;
  rootNode: SiteNodeWithPath;
  templateMap: TemplateMap;
  outputDir: string;
  contentDir: string;
}

function safeMkDir(path: string): Promise<void> {
  return new Promise((resolve) => {
    access(path, constants.F_OK, (err) => {
      if (err) {
        mkdir(path, { recursive: true }, (err) => {
          if (err) throw err;
          resolve();
        });
      } else {
        resolve();
      }
    });
  });
}

function findNode(siteNode: SiteNode, slug: string): SiteNode | undefined {
  if (siteNode.slug === slug) {
    return siteNode;
  }
  for (let i = 0; i < siteNode.children.length; i++) {
    const result = findNode(siteNode.children[i], slug);
    if (result) {
      return result;
    }
  }
  return undefined;
}

function processTemplate(
  templatePath: string,
  siteNode: SiteNodeWithPath,
  root: SiteNodeWithPath
): Promise<string> {
  return new Promise((resolve, reject) => {
    const data = { ...siteNode, root };
    ejs.renderFile(
      templatePath,
      data,
      {
        context: {
          find: (slug: string): SiteNode | undefined => findNode(root, slug),
        },
      },
      function (err, str) {
        if (err) {
          reject(
            `Could not render template for "${siteNode.slug}".\n\n${err.message}\n`
          );
        }
        resolve(str);
      }
    );
  });
}

async function compilePage({
  siteNode,
  rootNode,
  templateMap,
  outputDir,
  contentDir,
}: CompilePage): Promise<void> {
  const templatePath = templateMap[siteNode.template];
  if (typeof templatePath === 'undefined') {
    return Promise.reject(
      `No .ejs file found for template "${siteNode.template}"`
    );
  }

  const renderedHtml = await processTemplate(templatePath, siteNode, rootNode);
  await safeMkDir(path.join(outputDir, siteNode.path));
  await promises.writeFile(
    path.join(outputDir, siteNode.path, 'index.html'),
    renderedHtml,
    'utf8'
  );
  logger.verbose(`Generated ${siteNode.path}index.html`);
  const subCompileJobs = siteNode.children.map((child) =>
    compilePage({
      siteNode: child,
      rootNode,
      templateMap,
      outputDir,
      contentDir,
    })
  );
  await Promise.all(subCompileJobs);
}

export default function generateTemplates({
  rootNode,
  templateDir,
  outputDir,
  contentDir,
}: GenerateTemplates): Promise<void> {
  const templateMap = findTemplates(templateDir);
  logger.debug('Found templates:\n' + JSON.stringify(templateMap, null, 2));
  return compilePage({
    rootNode,
    siteNode: rootNode,
    templateMap,
    outputDir,
    contentDir,
  });
}
