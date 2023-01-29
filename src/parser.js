import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import getExtension from './utils.js';

const parseFile = (filepath) => {
  // yaml parsing:
  if (getExtension(filepath) === 'yaml') {
    const fileData = yaml.load(fs.readFileSync(path.resolve(filepath), 'utf8'));
    return fileData;
  }

  // json parsing:
  if (getExtension(filepath) === 'json') {
    const fileData = JSON.parse(fs.readFileSync(path.resolve(filepath)));
    return fileData;
  }
  throw console.error('Wrong file format, only "yaml/yml" or "json" allowed.');
};

export default parseFile;
