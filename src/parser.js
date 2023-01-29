import yaml from 'js-yaml';
import { readFileSync } from 'fs';
import path from 'path';

import getExtension from './utils.js';

const parseFile = (filepath) => {
  switch (getExtension(filepath)) {
    case 'yaml':
      return yaml.load(readFileSync(path.resolve(process.cwd(), filepath)), 'utf-8');

    case 'json':
      return JSON.parse(readFileSync(path.resolve(process.cwd(), filepath)), 'utf-8');

    default:
      throw console.error('Wrong file format, only "yaml/yml" or "json" allowed.');
  }
};

export default parseFile;
