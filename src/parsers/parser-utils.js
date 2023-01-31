import yaml from 'js-yaml';
import path from 'path';

const getExtension = (filepath) => path.extname(filepath).substring(1);

const parseYaml = (data) => yaml.load(data);

const parseJson = (data) => JSON.parse(data);

export { parseYaml, parseJson, getExtension };
