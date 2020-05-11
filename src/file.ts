import * as path from 'path';
import { Arguments, Config } from './types';
import { readFileSync } from 'fs';

const relativeToAbsolute = (filePath: string): string =>
  path.resolve(process.cwd(), filePath);

export function getConfigLocation(args: Arguments): string {
  if (args.config) {
    return relativeToAbsolute(args.config ?? args.c);
  }

  throw new Error(
    'No config file specified. Please include a config file with "--config ./path/to/config.json"'
  );
}

export function readConfig(configPath: string): Config {
  const contentsBuffer = readFileSync(configPath);
  const { templateDir, outputDir, site } = JSON.parse(
    contentsBuffer.toString()
  );

  if (!templateDir || !outputDir || !site) {
    throw new Error('Invalid config file.');
  }

  return {
    templateDir,
    outputDir,
    site,
  };
}
