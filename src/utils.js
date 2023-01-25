const erorrExtensionMsg = 'Wrong file formats, both should be "yaml/yml" or "json".';

const getExtension = (extensionStr) => {
  if (extensionStr.endsWith('yaml') || extensionStr.endsWith('yml')) return 'yaml';
  if (extensionStr.endsWith('json')) return 'json';
  throw console.error(erorrExtensionMsg);
};

export default getExtension;
