import path from 'path';
import { readdirSync, statSync } from 'fs';
import { FileMap } from './types';

export default function findTemplates(
  dir: string,
  templateExtension = '.ejs'
): FileMap {
  return readdirSync(dir).reduce((accumulator, f) => {
    const filePath = path.join(dir, f);
    const isDirectory = statSync(filePath).isDirectory();
    if (isDirectory) {
      return {
        ...accumulator,
        ...findTemplates(filePath, templateExtension),
      };
    }
    if (path.extname(f).toLowerCase() === templateExtension) {
      const fileName = path.basename(f, templateExtension);
      return {
        ...accumulator,
        [fileName]: path.join(dir, f),
      };
    }
    return accumulator;
  }, {});
}
