import * as path from 'path';
import { Arguments, Config } from './types';
import { readFileSync } from 'fs';
import logger from './logger';

const DEFAULT_CONFIG = {
  templateDir: './templates',
  outputDir: './build',
  contentDir: './content',
  defaultLanguage: 'en',
};

const relativeToAbsolute = (filePath: string): string =>
  path.resolve(process.cwd(), filePath);

function getConfigLocation(args: Arguments): string {
  if (args.config) {
    return relativeToAbsolute(args.config ?? args.c);
  }

  throw new Error('No config file specified.');
}

function getDefaultConfig(): Config {
  return {
    templateDir: relativeToAbsolute(DEFAULT_CONFIG.templateDir),
    outputDir: relativeToAbsolute(DEFAULT_CONFIG.outputDir),
    contentDir: relativeToAbsolute(DEFAULT_CONFIG.contentDir),
    defaultLanguage: DEFAULT_CONFIG.defaultLanguage,
  };
}

function readConfig(configPath: string): Config {
  const contentsBuffer = readFileSync(configPath);
  const { templateDir, outputDir, contentDir, defaultLanguage } = JSON.parse(
    contentsBuffer.toString()
  );

  return {
    templateDir: relativeToAbsolute(templateDir ?? DEFAULT_CONFIG.templateDir),
    outputDir: relativeToAbsolute(outputDir ?? DEFAULT_CONFIG.outputDir),
    contentDir: relativeToAbsolute(contentDir ?? DEFAULT_CONFIG.contentDir),
    defaultLanguage: defaultLanguage ?? DEFAULT_CONFIG.defaultLanguage,
  };
}

export function getConfig(args: Arguments): Config {
  try {
    const configPath = getConfigLocation(args);
    return readConfig(configPath);
  } catch (error) {
    logger.info('No config file found. Using defaults.');
    return getDefaultConfig();
  }
}
