/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
import parseFiles from './parser.js';
import makeDiffTree from './diff-tree.js';
import formatTree from './formatters/format-options.js';

const showDiff = (filePath1, filePath2, format = 'stylish') => {
  const object1 = parseFiles(filePath1);
  const object2 = parseFiles(filePath2);
  const diffTree = makeDiffTree(object1, object2);
  return formatTree(diffTree, format);
};

export default showDiff;
