import yargs from 'yargs';
import { getConfigLocation, readConfig } from './file';

const argv = yargs.options({
  c: { type: 'string', alias: 'config' },
}).argv;

const configPath = getConfigLocation(argv);
console.log(readConfig(configPath));
