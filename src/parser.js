import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

const isYaml = (string1, string2) => {
  if ((string1.endsWith('yaml') || string1.endsWith('yml'))
  && (string2.endsWith('yaml') || string2.endsWith('yml'))) {
    return true;
  }
  return false;
};

const isJson = (string1, string2) => {
  if (string1.endsWith('json') && string2.endsWith('json')) {
    return true;
  }
  return false;
};

export default (path1, path2) => {
  console.log(path1);
  console.log(path2);
  // yaml parsing:
  if (isYaml(path1, path2)) {
    const fileData1 = yaml.load(fs.readFileSync(path1, 'utf8'));
    const fileData2 = yaml.load(fs.readFileSync(path2, 'utf8'));
    return [fileData1, fileData2];
  }
  // json parsing:
  if (isJson(path1, path2)) {
    const fileData1 = JSON.parse(fs.readFileSync(path.resolve(path1)));
    const fileData2 = JSON.parse(fs.readFileSync(path.resolve(path2)));
    return [fileData1, fileData2];
  }
  throw console.error('Different file formats, both should be "yaml" or "json".');
};
