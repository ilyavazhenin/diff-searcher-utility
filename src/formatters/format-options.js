import makeStylishOutput from './stylish.js';
import makePlainOutput from './plain.js';
import makeJSONOutput from './json.js';

const formatTree = (tree, format) => {
  if (format === 'stylish') return makeStylishOutput(tree);
  if (format === 'plain') return makePlainOutput(tree);
  if (format === 'json') return makeJSONOutput(tree);
  throw new Error('\nUnknown formatter, available formatters: stylish (default), plain, json.\n');
};

export default formatTree;
