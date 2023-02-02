import { parseJson, parseYaml } from './parser-utils.js';

const erorrExtensionMsg = 'Wrong file formats, both should be "yaml/yml" or "json".';

const parseFile = (data, extension) => {
  switch (extension) {
    case 'json':
      return parseJson(data);

    case 'yml':
    case 'yaml':
      return parseYaml(data);
    default:
      throw new Error(erorrExtensionMsg);
  }
};

export default parseFile;
