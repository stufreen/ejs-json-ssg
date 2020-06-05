import path from 'path';
import { readdirSync, statSync } from 'fs';
import { FileMap } from './types';

export default function findLocales(contentDir: string): FileMap {
  const stringsDir = path.join(contentDir, 'strings');
  return readdirSync(stringsDir).reduce((accumulator, f) => {
    const filePath = path.join(stringsDir, f);
    const isDirectory = statSync(filePath).isDirectory();
    if (isDirectory) {
      return {
        ...accumulator,
        ...findLocales(filePath),
      };
    }
    if (path.extname(f).toLowerCase() === '.json') {
      const fileName = path.basename(f, '.json');
      return {
        ...accumulator,
        [fileName]: path.join(stringsDir, f),
      };
    }
    return accumulator;
  }, {});
}
