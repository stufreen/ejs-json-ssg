import yargs from 'yargs';
import { getConfigLocation, readConfig } from './file';
import parseSite from './parseSite';

const argv = yargs.options({
  c: { type: 'string', alias: 'config' },
}).argv;

// Read the config file
const configPath = getConfigLocation(argv);
const {templateDir, outputDir, sitePath} = readConfig(configPath);

// Read and parse the site.json file
const root = parseSite(sitePath);

// Validate the site.json file
// 1. Nodes have required fields
// 2. No duplicate slugs
// 3. There's a template ejs file for each type
validateSiteFile(root, templateDir)

// Attach output paths to each node

// Generate HTML files from EJS tempaltes