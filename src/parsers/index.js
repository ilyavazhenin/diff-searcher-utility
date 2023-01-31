import { parseJson, parseYaml } from './parser-utils.js';

const erorrExtensionMsg = 'Wrong file formats, both should be "yaml/yml" or "json".';

const parseFile = (content, type) => {
  switch (type) {
    case 'json':
      return parseJson(content);

    case 'yml':
    case 'yaml':
      return parseYaml(content);
    default:
      throw new Error(erorrExtensionMsg);
  }
};

export default parseFile;
