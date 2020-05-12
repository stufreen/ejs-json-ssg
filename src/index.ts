import yargs from 'yargs';
import { getConfig } from './config';
// import parseSite from './parseSite';
// import validateSiteFile from './validateSiteFile';

const argv = yargs.options({
  c: { type: 'string', alias: 'config' },
}).argv;

// Cet configuration
const config = getConfig(argv); 

console.log(config);

// TO DO: Check for write access to outputDir

// TO DO: Read and parse the site.json file
// const root = parseSite(contentDir);

// TO DO: Validate the site.json file
// 1. Nodes have required fields
// 2. No duplicate slugs
// 3. There's a template ejs file for each type
// validateSiteFile(root, templateDir)

// Attach output paths to each node

// Generate HTML files from EJS tempaltes