import { readFileSync } from 'fs';
import path from 'path';

import parseFile from './parsers/index.js';
import makeDiffTree from './diff-tree.js';
import formatTree from './formatters/index.js';
import { getExtension } from './parsers/parser-utils.js';

const showDiff = (filePath1, filePath2, format = 'stylish') => {
  const file1Data = readFileSync(path.resolve(process.cwd(), filePath1), 'utf-8');
  const file2Data = readFileSync(path.resolve(process.cwd(), filePath2), 'utf-8');
  const extension1 = getExtension(filePath1);
  const extension2 = getExtension(filePath2);
  const object1 = parseFile(file1Data, extension1);
  const object2 = parseFile(file2Data, extension2);
  const diffTree = makeDiffTree(object1, object2);
  return formatTree(diffTree, format);
};

export default showDiff;
