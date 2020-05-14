import yargs from 'yargs';

import logger, { setLoggerLevel } from './logger';
import { getConfig } from './config';
import { addDirectory } from './file';
import parseSite from './parseSite';
import { isSiteNode } from './validateSiteFile';

const argv = yargs.options({
  c: { type: 'string', alias: 'config' },
  l: { type: 'string', alias: 'logs' },
}).argv;

setLoggerLevel(argv.l ?? 'info');

(async function main(): Promise<void> {
  // Read config
  const config = await getConfig(argv);
  logger.debug(`Config: ${JSON.stringify(config, null, 2)}`);

  // Parse the site.json file
  const root = await parseSite(config.contentDir);
  logger.debug(`Site: ${JSON.stringify(root, null, 2)}`);

  // Validate the site.json type
  try {
    if (isSiteNode(root)) {
      logger.debug('site.json is valid');
    }
  } catch (err) {
    logger.error(`${err.message} Exiting.`);
    return;
  }

  // TO DO: Attach output paths to each node

  // Check output dir
  try {
    await addDirectory(config.outputDir);
    logger.info(`Created outputDir at ${config.outputDir}.`);
  } catch (err) {
    logger.error(`No permission to write to ${config.outputDir}. Exiting.`);
    return;
  }

  // TO DO: Generate HTML files from EJS tempaltes
})();
