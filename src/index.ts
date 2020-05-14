import yargs from 'yargs';

import logger, { setLoggerLevel } from './logger';
import { getConfig } from './config';
import parseSite from './parseSite';
import { isSiteNode } from './validateSiteFile';
import attachPaths from './attachPaths';
import generateTemplates from './generateTemplates';

const argv = yargs.options({
  c: { type: 'string', alias: 'config' },
  l: { type: 'string', alias: 'logs' },
}).argv;

setLoggerLevel(argv.l ?? 'info');

(async function main(): Promise<void> {
  const startTime = process.hrtime.bigint();

  try {
    const config = await getConfig(argv);
    logger.debug(`Config: ${JSON.stringify(config, null, 2)}`);

    const rootNode = await parseSite(config.contentDir);
    logger.debug(`Site: ${JSON.stringify(rootNode, null, 2)}`);

    if (isSiteNode(rootNode)) {
      logger.debug('site.json is valid');
      const rootWithPaths = attachPaths(rootNode);
      logger.debug(
        `Root with paths: ${JSON.stringify(rootWithPaths, null, 2)}`
      );

      try {
        await generateTemplates({
          rootNode: rootWithPaths,
          templateDir: config.templateDir,
          outputDir: config.outputDir,
          contentDir: config.contentDir,
        });
      } catch (err) {
        throw new Error(err);
      }

      const endTime = process.hrtime.bigint();
      logger.info(
        `Done in ${Number(endTime - startTime) / 1000000} milliseconds.`
      );
      process.exit(0);
    }
  } catch (err) {
    logger.error(err.message);
    process.exit(1);
  }
})();
