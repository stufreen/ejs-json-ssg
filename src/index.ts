import yargs from 'yargs';

import logger, { setLoggerLevel } from './logger';
import { getConfig } from './config';
import { addDirectory } from './file';
// import parseSite from './parseSite';
// import validateSiteFile from './validateSiteFile';

const argv = yargs.options({
  c: { type: 'string', alias: 'config' },
  l: { type: 'string', alias: 'logs' },
}).argv;

setLoggerLevel(argv.l ?? 'info');

// Cet configuration
const config = getConfig(argv);

// Add build directory
addDirectory(config.outputDir)
  .then(() => {
    logger.debug(`Successfully created outputDir at ${config.outputDir}.`);
  })
  .catch(() => {
    logger.error(`No permission to write to ${config.outputDir}`);
  });

// TO DO: Read and parse the site.json file
// const root = parseSite(contentDir);

// TO DO: Validate the site.json file
// 1. Nodes have required fields
// 2. No duplicate slugs
// 3. There's a template ejs file for each type
// validateSiteFile(root, templateDir)

// Attach output paths to each node

// Generate HTML files from EJS tempaltes
