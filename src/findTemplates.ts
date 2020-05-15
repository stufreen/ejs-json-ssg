import path from 'path';
import { readdirSync, statSync } from 'fs';
import { TemplateMap } from './types';

export default function findTemplates(dir: string): TemplateMap {
  return readdirSync(dir).reduce((accumulator, f) => {
    const filePath = path.join(dir, f);
    console.log(filePath);
    const isDirectory = statSync(filePath).isDirectory();
    if (isDirectory) {
      return {
        ...accumulator,
        ...findTemplates(filePath),
      };
    }
    if (path.extname(f).toLowerCase() === '.ejs') {
      const fileName = path.basename(f, '.ejs');
      return {
        ...accumulator,
        [fileName]: path.join(dir, f),
      };
    }
    return accumulator;
  }, {});
}
