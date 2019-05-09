import * as fs from 'fs-extra';
import * as globby from 'globby';
import { Encoding, Pattern } from '../constants';
import { readTextFiles } from '../util';
import { Dictionary } from './types';

export * from './types';

export function const2Var(content: string, const2VarMap: Dictionary): string {
  const matches = content.match(Pattern.STYLE);
  if (!matches || !matches[0]) {
    return content;
  }
  const styleContent: string = matches[0];
  const formatStyleContent: string = styleContent.replace(Pattern.COLOR, (substring: string) => {
    return const2VarMap[substring] || const2VarMap[substring.toUpperCase()] || const2VarMap[substring.toUpperCase()] || substring;
  });
  return content.replace(Pattern.STYLE, formatStyleContent);
}

export function resolveConst2VarMap(content: string) {
  const matches = content.match(Pattern.VAR_2_CONSTS);
  if (!matches || matches.length <= 0) {
    return false;
  }
  const map: Dictionary = Object.create(null);
  matches.forEach((line: string) => {
    line = line.replace(/[\s;]/g, '');
    const kv: string[] = line.split(':');
    map[kv[1]] = kv[0];
  });
  return map;
}

/**
 * Format the source code files. Try to replace the color constants with variables defined in scss 's constant files.
 * @param {string | string[]} varFilePatterns
 * @param {string[]} sourceCodePatterns
 * @param {globby.GlobbyOptions} varFileOptions
 * @param {globby.GlobbyOptions} sourceCodeOptions
 * @returns {Promise<void>}
 */
export async function formatFileConst2Var(
  varFilePatterns: string | string[],
  sourceCodePatterns: string[],
  varFileOptions?: globby.GlobbyOptions,
  sourceCodeOptions?: globby.GlobbyOptions,
): Promise<void> {
  const varFilePromise: Promise<string[]> = globby.default(varFilePatterns, varFileOptions);
  const sourceCodePromise: Promise<string[]> = globby.default(sourceCodePatterns, sourceCodeOptions);
  const [varFilePaths, sourceCodePaths]: [string[], string[]] = await Promise.all([varFilePromise, sourceCodePromise]);

  const contentList: string[] = await readTextFiles(varFilePaths);
  const mapList = contentList.map(content => resolveConst2VarMap(content));
  const const2VarMap = Object.assign({}, ...mapList);
  const sourceCodes: string[] = await readTextFiles(sourceCodePaths);

  const promises: Promise<void>[] = [];
  for (let i = 0; i < sourceCodePaths.length; i++) {
    const sourceCodePath: string = sourceCodePaths[i];
    const sourceCode: string = sourceCodes[i];
    const formatCode: string = const2VarMap(sourceCode, const2VarMap);
    const promise: Promise<void> = fs.writeFile(sourceCodePath, formatCode, {
      encoding: Encoding.UTF8,
      flag: 'w',
    });
    promises.push(promise);
  }
  await Promise.all(promises);
  console.log('success...');
}


