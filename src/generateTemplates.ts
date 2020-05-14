import * as ejs from 'ejs';
import { access, mkdir, constants, promises } from 'fs';

import { SiteNodeWithPath } from './types';
import logger from './logger';
import path from 'path';

interface GenerateTemplates {
  rootNode: SiteNodeWithPath;
  templateDir: string;
  outputDir: string;
  contentDir: string;
}

interface CompilePage {
  siteNode: SiteNodeWithPath;
  rootNode: SiteNodeWithPath;
  templateDir: string;
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

function processTemplate(
  templatePath: string,
  siteNode: SiteNodeWithPath,
  root: SiteNodeWithPath
): Promise<string> {
  return new Promise((resolve) => {
    const data = { ...siteNode, root };
    ejs.renderFile(templatePath, data, {}, function (err, str) {
      if (err) {
        logger.error(err);
        throw new Error(`Could not render template for "${siteNode.slug}"`);
      }
      resolve(str);
    });
  });
}

async function compilePage({
  siteNode,
  rootNode,
  templateDir,
  outputDir,
  contentDir,
}: CompilePage): Promise<void> {
  const templatePath = path.resolve(templateDir, `${siteNode.template}.ejs`);
  const renderedHtml = await processTemplate(templatePath, siteNode, rootNode);
  const subCompileJobs = siteNode.children.map((child) =>
    compilePage({
      siteNode: child,
      rootNode,
      templateDir,
      outputDir,
      contentDir,
    })
  );
  await safeMkDir(path.join(outputDir, siteNode.path));
  await promises.writeFile(
    path.join(outputDir, siteNode.path, 'index.html'),
    renderedHtml,
    'utf8'
  );
  logger.info(`${siteNode.path}index.html`);
  await Promise.all(subCompileJobs);
}

export default function generateTemplates({
  rootNode,
  templateDir,
  outputDir,
  contentDir,
}: GenerateTemplates): Promise<void> {
  return compilePage({
    rootNode,
    siteNode: rootNode,
    templateDir,
    outputDir,
    contentDir,
  });
}
