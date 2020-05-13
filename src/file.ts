import { promises } from 'fs';

export function addDirectory(path: string): Promise<string> {
  return promises.mkdir(path, { recursive: true });
}
