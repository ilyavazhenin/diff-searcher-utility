/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
import parseFiles from './parser.js';
import makeStylishOutput from './formatters/stylish.js';
import makePlainOutput from './formatters/plain.js';
import makeJSONOutput from './formatters/json.js';
import recursiveCompare from './diff-tree.js';
// import defineFormat from './format-handler.js';

export const compare = (filePath1, filePath2) => {
  const [object1, object2] = parseFiles(filePath1, filePath2);
  return recursiveCompare(object1, object2);
};

const showDiff = (path1, path2, format = 'stylish') => {
  if (format === 'stylish') return makeStylishOutput(compare(path1, path2), format);
  if (format === 'plain') return makePlainOutput(compare(path1, path2), format);
  if (format === 'json') return makeJSONOutput(compare(path1, path2), format);
  throw new Error('\nUnknown format, available formats: stylish (default), plain, json.\n');
};

export default showDiff;
