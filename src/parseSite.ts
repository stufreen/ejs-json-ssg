import { promises } from 'fs';
import path from 'path';

export default function parseSite(contentDir: string): Promise<any> {
  const siteFile = path.resolve(contentDir, 'site.json');
  return promises.readFile(siteFile, 'utf8').then(JSON.parse);
}
