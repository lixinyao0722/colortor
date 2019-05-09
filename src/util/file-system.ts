import * as fs from 'fs-extra';
import { Encoding } from '../constants/charset';

export function readTextFiles(paths: string[]): Promise<string[]> {
  const promises = paths.map((path: string) => fs.readFile(path, Encoding.UTF8));
  return Promise.all(promises);
}
