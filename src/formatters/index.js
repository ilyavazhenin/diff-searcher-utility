import makeStylishOutput from './stylish.js';
import makePlainOutput from './plain.js';
import makeJSONOutput from './json.js';

const formatTree = (tree, format) => {
  switch (format) {
    case 'stylish': return makeStylishOutput(tree);
    case 'plain': return makePlainOutput(tree);
    case 'json': return makeJSONOutput(tree);
    default:
      throw new Error('\nUnknown formatter, available formatters: stylish (default), plain, json.\n');
  }
};

export default formatTree;
